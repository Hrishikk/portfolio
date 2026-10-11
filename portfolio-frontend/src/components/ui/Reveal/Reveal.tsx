import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}>
      {children}
    </Tag>
  );
}
