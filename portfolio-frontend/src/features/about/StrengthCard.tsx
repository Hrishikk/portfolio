import { Tag } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { Strength } from '@/types/content';
import styles from './About.module.css';

const ICON_PATHS: Record<Strength['id'], string> = {
  frontend: 'M3 5h18v12H3z M3 9h18 M8 21h8 M12 17v4',
  backend: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M13.5 4l-3 16',
  cloud: 'M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5z',
};

interface StrengthCardProps {
  strength: Strength;
}

/** One core development area: icon, title, description and key tools. */
export function StrengthCard({ strength }: StrengthCardProps) {
  const { t } = useLanguage();
  return (
    <article className={styles.strength}>
      <span className={styles.strengthIcon}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path
            d={ICON_PATHS[strength.id]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className={styles.strengthTitle}>{t(strength.title)}</h3>
      <p className={styles.strengthText}>{t(strength.description)}</p>
      <ul className={styles.strengthTools}>
        {strength.tools.map((tool) => (
          <li key={tool}>
            <Tag>{tool}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
