import { useLanguage } from '@/i18n/useLanguage';
import type { Metric } from '@/types/content';
import styles from './Hero.module.css';

interface MetricCardProps {
  metric: Metric;
}

/** A stat: big number, short label, one-line detail. */
export function MetricCard({ metric }: MetricCardProps) {
  const { t } = useLanguage();
  return (
    <li className={styles.metric}>
      <span className={styles.metricValue}>{metric.value}</span>
      <span className={styles.metricLabel}>{t(metric.label)}</span>
      <span className={styles.metricDetail}>{t(metric.detail)}</span>
    </li>
  );
}
