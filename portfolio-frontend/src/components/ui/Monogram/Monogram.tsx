import styles from './Monogram.module.css';

interface MonogramProps {
  size?: 'sm' | 'md';
}

/** "HK" initials badge used as the site logo. Decorative — pair it with a visible or aria label. */
export function Monogram({ size = 'sm' }: MonogramProps) {
  return (
    <span className={`${styles.monogram} ${styles[size]}`} aria-hidden="true">
      HK
    </span>
  );
}
