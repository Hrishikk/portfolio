import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import type { Localized } from '@/types/content';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './Hero.module.css';

interface RoleCyclerProps {
  roles: Localized[];
  interval?: number;
}

/**
 * Cycles through roles one at a time. Screen readers get the full list once;
 * with reduced motion, all roles are shown statically instead.
 */
export function RoleCycler({ roles, interval = 2600 }: RoleCyclerProps) {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, roles.length, interval]);

  if (reduced) {
    return (
      <ul className={styles.roleList}>
        {roles.map((role) => (
          <li key={role.en}>{t(role)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className={styles.roles}>
      <span className="visually-hidden">{roles.map(t).join(' / ')}</span>
      <span className={styles.roleMark} aria-hidden="true">
        ⟶
      </span>
      <span className={styles.roleWindow} aria-hidden="true">
        <span key={`${index}-${t(roles[index])}`} className={styles.role}>
          {t(roles[index])}
        </span>
      </span>
    </p>
  );
}
