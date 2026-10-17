import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  /** Show the sliding arrow after the label. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path className={styles.arrowStem} d="M0 5h7" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', arrow = false, className = '', children, ...rest } = props;
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  const classes = `${styles.button} ${styles[variant]} ${className}`;
  if (typeof rest.href === 'string') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
