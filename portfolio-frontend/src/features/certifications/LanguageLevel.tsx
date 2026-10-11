import type { LanguageSkill } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './Certifications.module.css';

const MAX_LEVEL = 5;

/** Visual level (out of 5) per language id; the text level remains the source of truth. */
const LEVELS: Record<string, number> = {
  en: 5,
  ja: 3,
};

interface LanguageLevelProps {
  language: LanguageSkill;
}

/** Language name, text level and a decorative 5-dot indicator. */
export function LanguageLevel({ language }: LanguageLevelProps) {
  const { t } = useLanguage();
  const level = LEVELS[language.id] ?? 3;
  return (
    <li className={styles.lang}>
      <div className={styles.langText}>
        <span className={styles.langName}>{t(language.name)}</span>
        <span className={styles.langLevel}>{t(language.level)}</span>
      </div>
      <span className={styles.dots} aria-hidden="true">
        {Array.from({ length: MAX_LEVEL }, (_, i) => (
          <span key={i} className={`${styles.dot} ${i < level ? styles.dotOn : ''}`} />
        ))}
      </span>
    </li>
  );
}
