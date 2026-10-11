import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { sendContactMessage, type ContactField, type ContactResult } from '@/services/contactApi';
import type { CopyKey } from './copy';

export interface ContactValues {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot — hidden from humans. */
  website: string;
}

export type FieldErrors = Partial<Record<ContactField, CopyKey>>;

export type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; reason: CopyKey };

/** Mirrors the server's zod rules (server/src/validation/contact.schema.ts). */
export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  company: { max: 100 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

const EMPTY: ContactValues = { name: '', email: '', company: '', message: '', website: '' };

export const FIELD_ORDER: readonly ContactField[] = ['name', 'email', 'company', 'message'];

export function validateField(field: ContactField, raw: string): CopyKey | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return 'errorRequired';
      if (value.length < LIMITS.name.min) return 'errorNameShort';
      if (value.length > LIMITS.name.max) return 'errorNameLong';
      return undefined;
    case 'email':
      if (!value) return 'errorRequired';
      if (value.length > LIMITS.email.max) return 'errorEmailLong';
      if (!EMAIL_RE.test(value)) return 'errorEmailInvalid';
      return undefined;
    case 'company':
      if (value.length > LIMITS.company.max) return 'errorCompanyLong';
      return undefined;
    case 'message':
      if (!value) return 'errorRequired';
      if (value.length < LIMITS.message.min) return 'errorMessageShort';
      if (value.length > LIMITS.message.max) return 'errorMessageLong';
      return undefined;
  }
}

export function validateAll(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

function failureReason(result: Exclude<ContactResult, { kind: 'success' }>): CopyKey {
  switch (result.kind) {
    case 'validation':
      return 'errorSummary';
    case 'rate-limited':
      return 'failRateLimited';
    case 'timeout':
      return 'failTimeout';
    case 'network':
      return 'failNetwork';
    case 'server':
      return 'failServer';
  }
}

function isContactField(name: string): name is ContactField {
  return (FIELD_ORDER as readonly string[]).includes(name);
}

export function useContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (name !== 'website' && !isContactField(name)) return;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (isContactField(name) && (touched[name] || submitAttempted)) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
      setStatus((prev) => (prev.state === 'error' ? { state: 'idle' } : prev));
    },
    [touched, submitAttempted],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (!isContactField(name)) return;
      setTouched((prev) => ({ ...prev, [name]: true }));
      // Don't nag about an empty required field the user merely tabbed through.
      if (value.trim() === '' && !submitAttempted) return;
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    [submitAttempted],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<FieldErrors> => {
      event.preventDefault();
      if (status.state === 'submitting') return {};
      setSubmitAttempted(true);

      const clientErrors = validateAll(values);
      setErrors(clientErrors);
      if (Object.keys(clientErrors).length > 0) {
        setStatus({ state: 'error', reason: 'errorSummary' });
        return clientErrors;
      }

      setStatus({ state: 'submitting' });
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const company = values.company.trim();
      const result = await sendContactMessage(
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          ...(company ? { company } : {}),
          website: values.website,
        },
        { signal: controller.signal },
      );
      if (controller.signal.aborted && result.kind !== 'success') return {};

      if (result.kind === 'success') {
        setStatus({ state: 'success' });
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
        return {};
      }

      if (result.kind === 'validation') {
        const serverErrors: FieldErrors = {};
        for (const field of FIELD_ORDER) {
          if (result.fields[field]) serverErrors[field] = validateField(field, values[field]) ?? 'errorServerField';
        }
        setErrors(serverErrors);
        setStatus({ state: 'error', reason: 'errorSummary' });
        return serverErrors;
      }

      setStatus({ state: 'error', reason: failureReason(result) });
      return {};
    },
    [status.state, values],
  );

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
    setStatus({ state: 'idle' });
  }, []);

  return { values, errors, status, handleChange, handleBlur, handleSubmit, reset };
}
