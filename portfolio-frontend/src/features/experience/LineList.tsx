import { useState } from 'react';
import type { CareerStation } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { copy } from './copy';
import { formatPeriod } from './formatPeriod';
import { StationBadge } from './StationBadge';
import { StationDetail } from './StationDetail';
import { StationMarker } from './StationMarker';
import { growthStyle, stationCode } from './stationUtils';
import styles from './LineList.module.css';

interface LineListProps {
  stations: CareerStation[];
  initialOpenId: string;
}

/** Mobile: vertical timeline. Each station is a disclosure; details open inline beneath it. */
export function LineList({ stations, initialOpenId }: LineListProps) {
  const { t, locale } = useLanguage();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set([initialOpenId]));
  const total = stations.length;

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ol className={styles.list} aria-label={t(copy.stationsLabel)}>
      {stations.map((station, index) => {
        const open = openIds.has(station.id);
        const bodyId = `station-body-${station.id}`;
        const code = stationCode(index);
        return (
          <li key={station.id} className={styles.item} style={growthStyle(index, total)}>
            <span className={styles.rail} aria-hidden="true" />
            <span className={styles.marker}>
              <StationMarker kind={station.kind} selected={open} />
            </span>

            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={() => toggle(station.id)}
              >
                <StationBadge code={code} size="sm" />
                <span className={styles.text}>
                  {(station.kind === 'current' || station.kind === 'promotion') && (
                    <span className={station.kind === 'current' ? styles.flagNow : styles.flagPromo}>
                      {station.kind === 'current' ? t(copy.youAreHere) : t(copy.promoted)}
                    </span>
                  )}
                  <span className={styles.name}>{t(station.title)}</span>
                  <span className={styles.role}>{t(station.role)}</span>
                  <span className={styles.date}>
                    {formatPeriod(station.start, station.end, locale, t(ui.labels.present))}
                  </span>
                </span>
                <svg className={styles.chevron} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </h3>

            <div id={bodyId} className={styles.body} hidden={!open}>
              {open && <StationDetail station={station} code={code} compact />}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
