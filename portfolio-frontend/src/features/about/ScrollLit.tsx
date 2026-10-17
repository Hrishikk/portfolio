import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './About.module.css';

/** Splits text into words (or Japanese word-like segments) so each can light up in turn. */
function segment(text: string, locale: string): string[] {
  if ('Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: 'word' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return text.split(/(\s+)/);
}

/**
 * Apple-style scroll-lit paragraph: words brighten from muted to full ink
 * as the paragraph moves up into reading position. One CSS variable (--lit)
 * is written per frame; each word compares it with its own index.
 * Fully lit under reduced motion, in print, and once read.
 */
export function ScrollLit({ text, className = '' }: { text: string; className?: string }) {
  const { locale } = useLanguage();
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => segment(text, locale), [text, locale]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const total = words.length;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--lit', String(total + 1));
      return;
    }

    let frame = 0;
    let max = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const progress = (start - rect.top) / (start - end + rect.height);
      // Never dims again once read.
      max = Math.max(max, Math.min(Math.max(progress, 0), 1));
      el.style.setProperty('--lit', (max * (total + 6)).toFixed(2));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [words]);

  return (
    <p ref={ref} className={`${styles.lit} ${className}`} data-phrase>
      {words.map((word, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {word}
        </span>
      ))}
    </p>
  );
}
