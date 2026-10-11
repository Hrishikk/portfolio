import styles from './Seal.module.css';

interface SealProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** A hanko-style vermilion seal stamp. Purely decorative. */
export function Seal({ text, size = 'md', className = '' }: SealProps) {
  return (
    <span className={`${styles.seal} ${styles[size]} ${className}`} aria-hidden="true">
      <span className={styles.text}>{text}</span>
    </span>
  );
}
