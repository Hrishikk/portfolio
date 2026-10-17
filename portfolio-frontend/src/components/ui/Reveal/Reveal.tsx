import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import styles from './Reveal.module.css';

/**
 * How the content enters:
 * - `tilt`: rises from a plane tipped away from the viewer (default)
 * - `swingLeft` / `swingRight`: turns in on a vertical hinge from that side
 * - `flip`: flips up like a card being turned over
 */
export type RevealVariant = 'tilt' | 'swingLeft' | 'swingRight' | 'flip';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}

/** Brings its children into view in 3D the first time they scroll on screen. */
export function Reveal({ children, as: Tag = 'div', variant = 'tilt', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <Tag
      ref={ref}
      style={style}
      className={`${styles.reveal} ${styles[variant]} ${inView ? styles.visible : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
