import { useEffect } from 'react';

/** Window events emitted during a trip; the navbar pill and the travel beam listen to these. */
export const TRAVEL_START = 'anchortravel:start';
export const TRAVEL_PROGRESS = 'anchortravel:progress';
export const TRAVEL_END = 'anchortravel:end';

export type TravelStartDetail = { id: string };
export type TravelProgressDetail = { progress: number };

const MIN_MS = 700;
const MAX_MS = 1300;
const LANDING_MS = 820;
/** Begin the arrival on the final approach (~4% of the distance left), so trip and landing read as one motion. */
const LANDING_AT = 0.72;
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Keys that mean the reader has taken over scrolling. */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const emit = <T,>(name: string, detail: T) => window.dispatchEvent(new CustomEvent<T>(name, { detail }));

/** Document y the target should land at: just under the fixed navbar (honours `scroll-padding-top`). */
function targetTop(el: HTMLElement): number {
  const root = document.documentElement;
  const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 68;
  const top = el.getBoundingClientRect().top + window.scrollY - padding;
  return Math.min(Math.max(0, top), root.scrollHeight - window.innerHeight);
}

/** Move focus to the destination without scrolling, like the skip link does. */
function focusTarget(el: HTMLElement) {
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1');
    el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
  }
  el.focus({ preventScroll: true });
}

/**
 * Arrival: the section's content blocks soften briefly as they come in, then focus and settle into place,
 * lightly staggered. Content stays readable throughout (opacity never below 0.72) and is crisp within ~1s.
 */
function land(section: HTMLElement) {
  const heading = section.querySelector<HTMLElement>(`#${CSS.escape(section.id)}-heading`);
  const container = heading
    ? (Array.from(section.children).find((child) => child.contains(heading)) as HTMLElement | undefined)
    : undefined;
  if (!container) return;

  const blocks = Array.from(container.children).slice(0, 4) as HTMLElement[];
  section.dataset.travel = 'landing';
  const animations = blocks.map((block, i) =>
    block.animate(
      [
        // A quick soften on the final approach, then a long exponential focus-in and settle.
        { offset: 0, easing: 'ease-out', filter: 'blur(0px)', opacity: 1, transform: 'perspective(1200px) translateY(0) rotateX(0deg)' },
        { offset: 0.16, easing: EASE_OUT, filter: 'blur(4px)', opacity: 0.72, transform: 'perspective(1200px) translateY(10px) rotateX(3deg)' },
        { offset: 1, filter: 'blur(0px)', opacity: 1, transform: 'perspective(1200px) translateY(0) rotateX(0deg)' },
      ],
      { duration: LANDING_MS, delay: i * 70 },
    ),
  );
  Promise.allSettled(animations.map((a) => a.finished)).then(() => {
    delete section.dataset.travel;
  });
}

let frame = 0;
let cancelTrip: (() => void) | null = null;

/** Eased scroll to `section`, then land, update the hash and move focus. */
function travel(section: HTMLElement, hash: string) {
  cancelTrip?.();
  const { id } = section;
  emit<TravelStartDetail>(TRAVEL_START, { id });

  const arrive = () => {
    cancelTrip = null;
    if (location.hash !== hash) history.pushState(null, '', hash);
    focusTarget(section);
    emit(TRAVEL_END, null);
  };

  if (prefersReducedMotion()) {
    window.scrollTo({ top: targetTop(section), behavior: 'instant' });
    arrive();
    return;
  }

  // Wait a frame so a closing mobile menu has released its scroll lock before measuring.
  frame = requestAnimationFrame(() => {
    const from = window.scrollY;
    const to = targetTop(section);
    const distance = Math.abs(to - from);
    const duration = Math.min(MAX_MS, Math.max(MIN_MS, 600 + Math.sqrt(distance) * 11));
    const shouldLand = id !== 'home';
    let landed = false;
    let start = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('keydown', onKey);
    };
    const interrupt = () => {
      stop();
      cancelTrip = null;
      emit(TRAVEL_END, null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) interrupt();
    };
    cancelTrip = interrupt;
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('keydown', onKey);

    const step = (now: number) => {
      if (!start) start = now;
      const t = distance < 2 ? 1 : Math.min(1, (now - start) / duration);
      window.scrollTo({ top: from + (to - from) * easeInOutQuint(t), behavior: 'instant' });
      emit<TravelProgressDetail>(TRAVEL_PROGRESS, { progress: t });
      if (shouldLand && !landed && t >= LANDING_AT) {
        landed = true;
        land(section);
      }
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else {
        stop();
        arrive();
      }
    };
    frame = requestAnimationFrame(step);
  });
  // Until the first frame runs, cancelling only needs to drop the pending frame.
  cancelTrip = () => {
    cancelAnimationFrame(frame);
    cancelTrip = null;
  };
}

function onClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
  // The skip link keeps its native instant jump.
  if (!link || link.classList.contains('skip-link') || link.target) return;
  const hash = link.getAttribute('href') ?? '';
  const id = decodeURIComponent(hash.slice(1));
  const section = id ? document.getElementById(id) : null;
  if (!section) return;
  e.preventDefault();
  travel(section, hash);
}

/**
 * Section travel for every same-page anchor: a custom eased scroll that lands just under the navbar,
 * a progress beam (via window events) and a short arrival on the destination. Install once, in App.
 */
export function useAnchorTravel() {
  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelTrip?.();
    };
  }, []);
}
