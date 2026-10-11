import styles from './StationBadge.module.css';

interface StationBadgeProps {
  code: string;
  size?: 'sm' | 'md';
}

/** Rounded-square step number (e.g. "03"). */
export function StationBadge({ code, size = 'md' }: StationBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      <span className={styles.num}>{code}</span>
    </span>
  );
}
