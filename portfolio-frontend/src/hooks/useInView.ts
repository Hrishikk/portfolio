import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and whether the element has entered the viewport.
 * Once visible it stays visible (one-shot reveal).
 */
export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, inView };
}
