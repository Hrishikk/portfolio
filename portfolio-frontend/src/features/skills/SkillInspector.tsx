import type { CSSProperties } from 'react';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { formatPeriod } from '@/features/experience/formatPeriod';
import type { SkillGroup, SkillItem } from '@/types/content';
import { MAX_MONTHS } from './StackLayer';
import { copy } from './copy';
import { formatDuration } from './formatDuration';
import { stationsUsing } from './matchUsage';
import { useCountUp } from './useCountUp';
import styles from './Skills.module.css';

interface SkillInspectorProps {
  group: SkillGroup;
  item: SkillItem;
}

const YEAR_TICKS = [0, 12, 24, 36];

/**
 * Details for the selected technology: its layer, hands-on time (counted up and drawn on a
 * 3-year scale) and the career roles whose stack lists it. Remounted per selection (keyed by the
 * parent) so each selection plays its own entrance.
 */
export function SkillInspector({ group, item }: SkillInspectorProps) {
  const { t, locale } = useLanguage();
  const months = item.months;
  const counted = useCountUp(months ?? 0, { enabled: months !== undefined, duration: 900 });
  const shown = Math.round(counted);
  const usage = stationsUsing(item.name);
  const fill = { '--fill': Math.min((months ?? 0) / MAX_MONTHS, 1) } as CSSProperties;

  return (
    <aside className={styles.inspector} aria-label={t(copy.inspector)} aria-live="polite">
      <h4 className={styles.inspName}>{item.name}</h4>
      <p className={styles.inspGroup}>
        {t(group.title)} · {t(group.description)}
      </p>

      {months !== undefined && (
        <div className={styles.inspExperience}>
          <p className={styles.inspLabel}>{t(copy.experience)}</p>
          <p className={styles.inspValue}>
            <span aria-hidden="true">{shown > 0 ? formatDuration(shown, locale) : '0'}</span>
            <span className="visually-hidden">{formatDuration(months, locale)}</span>
          </p>
          <div className={styles.scale} style={fill} aria-hidden="true">
            <span className={styles.scaleFill} />
          </div>
          <ol className={styles.ticks} aria-label={t(copy.scaleLabel)}>
            {YEAR_TICKS.map((m) => (
              <li key={m}>{m === 0 ? '0' : formatDuration(m, locale)}</li>
            ))}
          </ol>
        </div>
      )}

      {usage.length > 0 && (
        <div className={styles.usage}>
          <p className={styles.inspLabel}>{t(copy.usedIn)}</p>
          <ol className={styles.usageList}>
            {usage.map((station, i) => (
              <li key={station.id} style={{ '--i': i } as CSSProperties}>
                <span className={styles.usageDot} aria-hidden="true" />
                <span className={styles.usageText}>
                  <strong>{t(station.title)}</strong>
                  <span>
                    {t(station.role)} · {formatPeriod(station.start, station.end, locale, t(ui.labels.present))}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  );
}
