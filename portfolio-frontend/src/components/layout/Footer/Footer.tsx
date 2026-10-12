import { Monogram } from '@/components/ui';
import { profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { Localized } from '@/types/content';
import styles from './Footer.module.css';

const copy = {
  contactNav: { en: 'Contact links', ja: '連絡先' },
} satisfies Record<string, Localized>;

const CURRENT_YEAR = new Date().getFullYear();

/** Page footer: name, credits, contacts and a back-to-top link. */
export function Footer() {
  const { t } = useLanguage();
  const links = profile.contacts.filter((c) => c.href);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Monogram size="md" />
          <div>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.role}>{t(profile.headline)}</p>
          </div>
        </div>

        <nav aria-label={t(copy.contactNav)}>
          <ul className={styles.contacts}>
            {links.map((c) => (
              <li key={c.id}>
                <a
                  className={styles.contact}
                  href={c.href}
                  {...(c.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.contactLabel}>{t(c.label)}</span>
                  <span className={styles.contactValue}>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottom}>
          <p className={styles.meta}>
            <span>© {CURRENT_YEAR} {profile.name}</span>
          </p>
          <a className={styles.top} href="#home">
            <span aria-hidden="true">↑</span> {t(ui.actions.backToTop)}
          </a>
        </div>
      </div>
    </footer>
  );
}
