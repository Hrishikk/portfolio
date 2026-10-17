import { useEffect, useRef } from 'react';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Fraction of the remaining distance covered each frame: gives the tilt weight without lag. */
const FOLLOW = 0.12;
const SETTLED = 0.0005;

interface SpotlightOptions {
  /** Maximum 3D tilt toward the pointer, in degrees. 0 = light only, no tilt. */
  tilt?: number;
  /** Follow the pointer anywhere inside the closest <section>, not just over the element. */
  trackSection?: boolean;
}

/**
 * Pointer-following light and optional 3D tilt for a card.
 * Writes --spot-x / --spot-y (for the `.spotlight` light) and sets data-spot="on" while the mouse is over it;
 * with `tilt`, eases the element toward the pointer in 3D and back flat when it leaves.
 * Mouse and trackpad only; the tilt is also skipped under reduced motion.
 */
export function useSpotlight<T extends HTMLElement>({ tilt = 0, trackSection = false }: SpotlightOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(FINE_POINTER).matches) return;
    const canTilt = tilt > 0 && !matchMedia(REDUCED_MOTION).matches;
    const area: HTMLElement = (trackSection && el.closest('section')) || el;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let spot = { x: 0, y: 0 };
    let frame = 0;

    const render = () => {
      frame = 0;
      el.style.setProperty('--spot-x', `${spot.x}px`);
      el.style.setProperty('--spot-y', `${spot.y}px`);
      if (!canTilt) return;

      current.x += (target.x - current.x) * FOLLOW;
      current.y += (target.y - current.y) * FOLLOW;
      const settled = Math.abs(target.x - current.x) < SETTLED && Math.abs(target.y - current.y) < SETTLED;
      if (settled && target.x === 0 && target.y === 0) {
        el.style.transform = '';
        return;
      }
      el.style.transform = `perspective(1000px) rotateX(${(-current.y * tilt * 2).toFixed(2)}deg) rotateY(${(current.x * tilt * 2).toFixed(2)}deg)`;
      if (!settled) frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      spot = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const box = area.getBoundingClientRect();
      target.x = Math.min(Math.max((event.clientX - box.left) / box.width - 0.5, -0.5), 0.5);
      target.y = Math.min(Math.max((event.clientY - box.top) / box.height - 0.5, -0.5), 0.5);
      el.dataset.spot = 'on';
      schedule();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      delete el.dataset.spot;
      schedule();
    };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      el.style.transform = '';
      delete el.dataset.spot;
    };
  }, [tilt, trackSection]);

  return ref;
}
