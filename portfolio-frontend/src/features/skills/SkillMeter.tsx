import type { CSSProperties } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import styles from './Skills.module.css';

const MAX_YEARS = 2;

interface SkillMeterProps {
  name: string;
  years: number;
  /** Whether the parent card has scrolled into view (triggers the fill animation). */
  active: boolean;
  delay: number;
}

/** One skill row with a horizontal bar scaled to MAX_YEARS and a visible text label. */
export function SkillMeter({ name, years, active, delay }: SkillMeterProps) {
  const { t, locale } = useLanguage();
  const unit = t(ui.labels.years);
  const label = locale === 'ja' ? `${years}${unit}` : `${years} ${unit}`;
  const ratio = Math.min(years / MAX_YEARS, 1);
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
