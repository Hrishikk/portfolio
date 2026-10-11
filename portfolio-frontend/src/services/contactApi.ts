/**
 * Typed client for the portfolio API's contact endpoint.
 * Every outcome (including network failures and timeouts) resolves to a `ContactResult`;
 * this function never throws, so UI code can switch exhaustively on `kind`.
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  /** Honeypot — always empty for humans. */
  website?: string;
}

export type ContactField = 'name' | 'email' | 'company' | 'message';

export type ContactResult =
  | { kind: 'success' }
  | { kind: 'validation'; message: string; fields: Partial<Record<ContactField, string>> }
  | { kind: 'rate-limited'; message: string }
  | { kind: 'server'; status: number; message: string }
  | { kind: 'timeout' }
  | { kind: 'network' };

interface ApiErrorBody {
  ok: false;
  error: { code: string; message: string; fields?: Record<string, string> };
}

const CONTACT_FIELDS: readonly ContactField[] = ['name', 'email', 'company', 'message'];
/** Generous enough to cover a free-tier host waking up from sleep. */
const DEFAULT_TIMEOUT_MS = 30_000;

function apiBase(): string {
  const base: unknown = import.meta.env.VITE_API_BASE_URL;
  return typeof base === 'string' ? base.replace(/\/+$/, '') : '';
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== 'object' || value === null) return false;
  const error = (value as { error?: unknown }).error;
  return typeof error === 'object' && error !== null && typeof (error as { code?: unknown }).code === 'string';
}

function pickFields(raw: Record<string, string> | undefined): Partial<Record<ContactField, string>> {
  const fields: Partial<Record<ContactField, string>> = {};
  if (!raw) return fields;
  for (const key of CONTACT_FIELDS) {
    const msg = raw[key];
    if (typeof msg === 'string') fields[key] = msg;
  }
  return fields;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

export interface SendOptions {
  timeoutMs?: number;
  /** Optional external signal (e.g. component unmount). */
  signal?: AbortSignal;
}

export async function sendContactMessage(
  payload: ContactPayload,
  { timeoutMs = DEFAULT_TIMEOUT_MS, signal }: SendOptions = {},
): Promise<ContactResult> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onExternalAbort = () => controller.abort();
  signal?.addEventListener('abort', onExternalAbort, { once: true });

  try {
    const response = await fetch(`${apiBase()}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.ok) return { kind: 'success' };

    const body = await readJson(response);
    const message = isApiErrorBody(body) ? body.error.message : response.statusText;

    if (response.status === 400 && isApiErrorBody(body)) {
      return { kind: 'validation', message, fields: pickFields(body.error.fields) };
    }
    if (response.status === 429) return { kind: 'rate-limited', message };
    return { kind: 'server', status: response.status, message };
  } catch {
    return timedOut ? { kind: 'timeout' } : { kind: 'network' };
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', onExternalAbort);
  }
}

/**
 * Fire-and-forget request to the health endpoint.
 * Free hosting tiers put the API to sleep when idle; calling this on page load
 * wakes it up while the visitor reads, so the contact form responds quickly.
 */
export function wakeBackend(): void {
  fetch(`${apiBase()}/api/health`, { method: 'GET' }).catch(() => {
    /* best effort — the form handles a cold or unreachable API on submit */
  });
}
