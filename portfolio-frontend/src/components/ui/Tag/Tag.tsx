import type { ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'indigo' | 'matcha' | 'gold';
}

/** Small pill label for technologies, phases and statuses. */
export function Tag({ children, tone = 'neutral' }: TagProps) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>;
}
