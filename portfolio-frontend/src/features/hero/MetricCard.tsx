import { useLanguage } from '@/i18n/useLanguage';
import type { Metric } from '@/types/content';
import styles from './Hero.module.css';

const TONES = ['vermilion', 'indigo', 'matcha', 'gold'] as const;

interface MetricCardProps {
  metric: Metric;
  index: number;
}

/** A stamp-style stat card: big number, short label, one-line detail. */
export function MetricCard({ metric, index }: MetricCardProps) {
  const { t } = useLanguage();
  const tone = TONES[index % TONES.length];
  return (
    <li className={`${styles.metric} ${styles[tone]}`}>
      <span className={styles.metricValue}>{metric.value}</span>
      <span className={styles.metricLabel}>{t(metric.label)}</span>
      <span className={styles.metricDetail}>{t(metric.detail)}</span>
    </li>
  );
}
