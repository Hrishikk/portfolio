import { career, education, languages, profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { copy } from './copy';
import styles from './About.module.css';

const current = career[career.length - 1];

/** Side card summarising current role, location, languages and education. */
export function GlanceCard() {
  const { t } = useLanguage();

  return (
    <aside className={styles.card} aria-labelledby="about-glance">
      <h3 id="about-glance" className={styles.cardTitle}>
        {t(copy.atAGlance)}
      </h3>
      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>{t(copy.currentRole)}</dt>
          <dd>
            <strong className={styles.block}>{t(current.role)}</strong>
            <span className={`${styles.block} ${styles.muted}`}>{current.company}</span>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>{t(copy.location)}</dt>
          <dd>{t(profile.location)}</dd>
        </div>
        <div className={styles.fact}>
          <dt>{t(ui.labels.languages)}</dt>
          <dd>
            <ul className={styles.langs}>
              {languages.map((lang) => (
                <li key={lang.id}>
                  <strong>{t(lang.name)}</strong>
                  <span className={styles.muted}>{t(lang.level)}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>{t(ui.labels.education)}</dt>
          <dd>
            <strong className={styles.block}>{t(education.degree)}</strong>
            <span className={styles.block}>{education.school}</span>
            <span className={`${styles.block} ${styles.muted}`}>{t(education.period)}</span>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
