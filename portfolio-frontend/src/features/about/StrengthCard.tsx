import { Tag } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { Strength } from '@/types/content';
import styles from './About.module.css';

interface StrengthCardProps {
  strength: Strength;
}

/** One core development area: title, description and key tools, set as a column of a hairline-ruled row. */
export function StrengthCard({ strength }: StrengthCardProps) {
  const { t } = useLanguage();
  return (
    <article className={styles.strength}>
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
