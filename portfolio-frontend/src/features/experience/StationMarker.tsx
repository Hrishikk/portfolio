import type { StationKind } from '@/types/content';
import styles from './StationMarker.module.css';

interface StationMarkerProps {
  kind: StationKind;
  selected?: boolean;
}

/** Round station dot that sits on the line. Interchange-style for promotions, pulsing for "now". */
export function StationMarker({ kind, selected = false }: StationMarkerProps) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.marker} ${styles[kind]} ${selected ? styles.selected : ''}`}
    >
      {kind === 'current' && <span className={styles.pulse} />}
    </span>
  );
}
