import { education, languages, profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { copy } from './copy';
import styles from './About.module.css';

/** Side card summarising location, languages, education and contacts. */
export function GlanceCard() {
  const { t } = useLanguage();
  const links = profile.contacts.filter((c) => c.href);

  return (
    <aside className={styles.card} aria-labelledby="about-glance">
      <h3 id="about-glance" className={styles.cardTitle}>
        {t(copy.atAGlance)}
      </h3>
      <dl className={styles.facts}>
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
        <div className={styles.fact}>
          <dt>{t(copy.contact)}</dt>
          <dd>
            <ul className={styles.contactList}>
              {links.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    className={styles.contactLink}
                    {...(c.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.muted}>{t(c.label)}</span>
                    <span>{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
