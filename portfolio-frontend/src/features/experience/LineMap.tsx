import { useRef, type CSSProperties, type KeyboardEvent } from 'react';
import type { CareerStation } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { copy } from './copy';
import { formatMonth } from './formatPeriod';
import { StationBadge } from './StationBadge';
import { StationDetail } from './StationDetail';
import { StationMarker } from './StationMarker';
import { growthStyle, stationCode } from './stationUtils';
import styles from './LineMap.module.css';

interface LineMapProps {
  stations: CareerStation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const tabId = (id: string) => `station-tab-${id}`;
const PANEL_ID = 'station-panel';

/** Desktop: horizontal timeline. Stations are tabs (arrow keys move between them); details show below. */
export function LineMap({ stations, selectedId, onSelect }: LineMapProps) {
  const { t, locale } = useLanguage();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = stations.length;
  const selectedIndex = Math.max(
    0,
    stations.findIndex((s) => s.id === selectedId),
  );
  const selected = stations[selectedIndex];

  const focusAndSelect = (index: number) => {
    const next = stations[(index + total) % total];
    onSelect(next.id);
    tabRefs.current[(index + total) % total]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyMap: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: total - 1,
    };
    const target = keyMap[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusAndSelect(target);
  };

  return (
    <div className={styles.map}>
      <div
        role="tablist"
        aria-label={t(copy.stationsLabel)}
        className={styles.stations}
        style={{ '--total': total } as CSSProperties}
      >
        <span className={styles.track} aria-hidden="true" />
        {stations.map((station, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={station.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={tabId(station.id)}
              aria-selected={isSelected}
              aria-controls={PANEL_ID}
              tabIndex={isSelected ? 0 : -1}
              className={`${styles.station} ${isSelected ? styles.selected : ''}`}
              style={growthStyle(index, total)}
              onClick={() => onSelect(station.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              <span className={styles.flagSlot}>
                {station.kind === 'current' && <span className={styles.flagNow}>{t(copy.youAreHere)}</span>}
                {station.kind === 'promotion' && <span className={styles.flagPromo}>{t(copy.promoted)}</span>}
                {station.kind === 'join' && <span className={styles.flagJoin}>{t(copy.joined)}</span>}
              </span>
              <span className={styles.markerRow}>
                <StationMarker kind={station.kind} selected={isSelected} />
              </span>
              <StationBadge code={stationCode(index)} size="sm" />
              <span className={styles.name}>{t(station.title)}</span>
              <span className={styles.date}>{formatMonth(station.start, locale)}</span>
            </button>
          );
        })}
      </div>

      <div
        key={selected.id}
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={tabId(selected.id)}
        tabIndex={0}
        className={styles.panel}
        style={growthStyle(selectedIndex, total)}
      >
        <StationDetail station={selected} code={stationCode(selectedIndex)} />
      </div>
    </div>
  );
}
