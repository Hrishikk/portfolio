import { useSyncExternalStore } from 'react';

/** Live result of a CSS media query (false where matchMedia is unavailable). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => typeof window !== 'undefined' && 'matchMedia' in window && window.matchMedia(query).matches,
    () => false,
  );
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
