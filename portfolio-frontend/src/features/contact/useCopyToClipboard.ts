import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

const RESET_AFTER_MS = 2000;

/** Copies text to the clipboard and exposes a short-lived status for UI feedback. */
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), RESET_AFTER_MS);
  }, []);

  return { status, copy };
}
