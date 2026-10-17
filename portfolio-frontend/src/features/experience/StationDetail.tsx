import type { CareerStation } from '@/types/content';
import { Tag } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { copy } from './copy';
import { formatPeriod } from './formatPeriod';
import styles from './StationDetail.module.css';

interface StationDetailProps {
  station: CareerStation;
  /** Hide the header (used on mobile where the toggle already shows it). */
  compact?: boolean;
}

/** Full information for one career station: role, period, team, story, highlights and tags. */
export function StationDetail({ station, compact = false }: StationDetailProps) {
  const { t, tl, locale } = useLanguage();
  const period = formatPeriod(station.start, station.end, locale, t(ui.labels.present));

  return (
    <div className={`${styles.detail} ${compact ? styles.compact : ''}`}>
      {!compact && (
        <header className={styles.header}>
          <div className={styles.headings}>
            <h3 className={styles.title}>{t(station.title)}</h3>
            <p className={styles.role}>{t(station.role)}</p>
          </div>
          {station.kind === 'promotion' && (
            <Tag tone="accent">{t(copy.promoted)}</Tag>
          )}
          {station.kind === 'current' && <Tag tone="accent">{t(copy.youAreHere)}</Tag>}
        </header>
      )}

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>{t(copy.period)}</dt>
          <dd>{period}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>{t(copy.company)}</dt>
          <dd>{station.company}</dd>
        </div>
        {station.teamSize && (
          <div className={styles.metaItem}>
            <dt>{t(ui.labels.team)}</dt>
            <dd>{t(station.teamSize)}</dd>
          </div>
        )}
      </dl>

      <p className={styles.summary}>{t(station.summary)}</p>

      <div className={styles.columns}>
        <div>
          <h4 className={styles.subhead}>{t(copy.highlights)}</h4>
          <ul className={styles.highlights}>
            {tl(station.highlights).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.tagGroups}>
          <div>
            <h4 className={styles.subhead}>{t(ui.labels.phases)}</h4>
            <ul className={styles.tags}>
              {station.phases.map((phase) => (
                <li key={phase.en}>
                  <Tag>{t(phase)}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={styles.subhead}>{t(ui.labels.stack)}</h4>
            <ul className={styles.tags}>
              {station.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
