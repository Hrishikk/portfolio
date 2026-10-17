import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { CareerStation } from '@/types/content';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/i18n/useLanguage';
import { copy } from './copy';
import { formatMonth } from './formatPeriod';
import { StationDetail } from './StationDetail';
import { StationMarker } from './StationMarker';
import { growthStyle } from './stationUtils';
import { Train } from './Train';
import styles from './LineMap.module.css';

interface LineMapProps {
  stations: CareerStation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const tabId = (id: string) => `station-tab-${id}`;
const PANEL_ID = 'station-panel';
/** Where the train waits before the line comes into view: just off the left end of the track. */
const DEPOT = -0.9;

/**
 * Desktop: horizontal career line. When it scrolls into view the track draws itself,
 * the stations flip up one by one, and a train drives in to the selected station.
 * Stations are tabs (arrow keys move between them); selecting one sends the train there
 * and swings the detail panel in from that direction.
 */
export function LineMap({ stations, selectedId, onSelect }: LineMapProps) {
  const { t, locale } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [trip, setTrip] = useState({ from: DEPOT, to: DEPOT, count: 0 });
  const total = stations.length;
  const selectedIndex = Math.max(
    0,
    stations.findIndex((s) => s.id === selectedId),
  );
  const selected = stations[selectedIndex];

  // Remember where the train is coming from, so trip length and panel direction follow the move.
  const trainAt = inView ? selectedIndex : DEPOT;
  if (trip.to !== trainAt) setTrip({ from: trip.to, to: trainAt, count: trip.count + 1 });
  const { from } = trip;
  const direction = trainAt >= from ? 1 : -1;
  const distance = Math.abs(trainAt - from);

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

  const mapStyle = {
    '--total': total,
    '--train-at': trainAt,
    // Longer trips take longer, like a real train; the first run waits for the stations to appear.
    '--train-ms': `${Math.round(450 + distance * 260)}ms`,
    '--train-delay': from === DEPOT ? '700ms' : '0ms',
    '--dir': direction,
  } as CSSProperties;

  return (
    <div ref={ref} className={`${styles.map} ${inView ? styles.in : ''}`} style={mapStyle}>
      <div role="tablist" aria-label={t(copy.stationsLabel)} className={styles.stations}>
        <span className={styles.track} aria-hidden="true" />
        <Train className={styles.train} trip={trip.count} />
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
              style={{ ...growthStyle(index, total), '--i': index } as CSSProperties}
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
              <span className={styles.name}>{t(station.title)}</span>
              <span className={styles.date}>{formatMonth(station.start, locale)}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.stage}>
        <div
          key={selected.id}
          role="tabpanel"
          id={PANEL_ID}
          aria-labelledby={tabId(selected.id)}
          tabIndex={0}
          className={styles.panel}
          style={growthStyle(selectedIndex, total)}
        >
          <StationDetail station={selected} />
        </div>
      </div>
    </div>
  );
}
