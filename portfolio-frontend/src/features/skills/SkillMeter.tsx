import type { CSSProperties } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { formatDuration } from './formatDuration';
import styles from './Skills.module.css';

const MAX_MONTHS = 36;

interface SkillMeterProps {
  name: string;
  months: number;
  /** Whether the parent card has scrolled into view (triggers the fill animation). */
  active: boolean;
  delay: number;
}

/** One skill row with a horizontal bar scaled to MAX_MONTHS and a visible text label. */
export function SkillMeter({ name, months, active, delay }: SkillMeterProps) {
  const { locale } = useLanguage();
  const label = formatDuration(months, locale);
  const ratio = Math.min(months / MAX_MONTHS, 1);
  const style = { '--fill': ratio, '--delay': `${delay}ms` } as CSSProperties;

  return (
    <li className={styles.meterRow}>
      <span className={styles.meterName}>{name}</span>
      <span className={styles.meterValue}>{label}</span>
      <span className={styles.track} aria-hidden="true">
        <span className={`${styles.fill} ${active ? styles.fillActive : ''}`} style={style} />
      </span>
    </li>
  );
}
