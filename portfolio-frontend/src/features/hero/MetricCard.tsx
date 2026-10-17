import { useEffect, useState, type CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/useLanguage';
import type { Metric } from '@/types/content';
import styles from './Hero.module.css';

const COUNT_MS = 1400;

/** Splits "2.5+" / "2 TB" / "98%" into prefix, number and suffix so only the number counts up. */
function parseValue(value: string) {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return { prefix, target: Number(number), decimals: number.split('.')[1]?.length ?? 0, suffix };
}

/** Counts from zero to the metric's number once it scrolls into view (instant under reduced motion). */
function useCountUp(value: string, start: boolean) {
  const parsed = parseValue(value);
  const [shown, setShown] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!start || !parsed) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - begin) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(`${parsed.prefix}${(parsed.target * eased).toFixed(parsed.decimals)}${parsed.suffix}`);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // parsed is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, value]);

  return shown;
}

interface MetricCardProps {
  metric: Metric;
  /** Position in the strip, for the staggered entrance. */
  index: number;
}

/** A headline number with its label and one-line detail. */
export function MetricCard({ metric, index }: MetricCardProps) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.3 });
  const shown = useCountUp(metric.value, inView);

  return (
    <li
      ref={ref}
      className={`${styles.metric} ${inView ? styles.metricIn : ''}`}
      style={{ '--i': index } as CSSProperties}
    >
      <span className={styles.metricValue}>
        <span aria-hidden="true">{shown}</span>
        <span className="visually-hidden">{metric.value}</span>
      </span>
      <span className={styles.metricLabel}>{t(metric.label)}</span>
      <span className={styles.metricDetail}>{t(metric.detail)}</span>
    </li>
  );
}
