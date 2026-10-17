import { useEffect, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () => typeof window !== 'undefined' && matchMedia(REDUCED_MOTION).matches;

/**
 * Counts from 0 up to `target` (exponential ease-out) once `start` turns true.
 * Disabled, or under reduced motion, it simply returns `target`.
 */
export function useCountUp(target: number, { enabled = true, start = true, delay = 0, duration = 900 } = {}) {
  const [instant] = useState(() => !enabled || prefersReducedMotion());
  const [value, setValue] = useState(instant ? target : 0);

  useEffect(() => {
    if (instant || !start) return;
    let frame = 0;
    let begin = 0;
    const tick = (now: number) => {
      if (!begin) begin = now + delay;
      const progress = Math.min(Math.max((now - begin) / duration, 0), 1);
      setValue(target * (1 - Math.pow(2, -10 * progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [instant, start, target, delay, duration]);

  return instant ? target : value;
}
