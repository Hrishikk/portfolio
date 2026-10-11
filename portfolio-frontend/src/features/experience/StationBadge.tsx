import styles from './StationBadge.module.css';

interface StationBadgeProps {
  code: string;
  size?: 'sm' | 'md';
}

/** Rounded-square station number, styled after Tokyo Metro signage (e.g. "VB 03"). */
export function StationBadge({ code, size = 'md' }: StationBadgeProps) {
  const [line, num] = code.split(' ');
  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      <span className={styles.line}>{line}</span>
      <span className={styles.num}>{num}</span>
    </span>
  );
}
