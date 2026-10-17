import type { ComponentType } from 'react';
import { Monogram } from '@/components/ui';
import { profile } from '@/content';
import { useSpotlight } from '@/hooks/useSpotlight';
import { useLanguage } from '@/i18n/useLanguage';
import type { ContactLink } from '@/types/content';
import { copy } from './copy';
import { LinkedInIcon, MailIcon, PinIcon } from './icons';
import styles from './BusinessCard.module.css';

const ICONS: Record<ContactLink['id'], ComponentType> = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  location: PinIcon,
};

const isExternal = (href?: string) => Boolean(href && /^https?:/.test(href));

/** Business card with name, role and contact details. */
export function BusinessCard() {
  const { t, locale } = useLanguage();
  const spotRef = useSpotlight<HTMLElement>({ tilt: 7 });

  return (
    <article ref={spotRef} className={`${styles.card} spotlight`} aria-label={t(copy.cardLabel)}>
      <div className={styles.cardTop}>
        <div>
          {locale === 'ja' && (
            <p className={styles.cardKana} lang="ja">
              {profile.nameKana}
            </p>
          )}
          <p className={styles.cardName}>{profile.name}</p>
          <p className={styles.cardRole}>{t(profile.headline)}</p>
        </div>
        <Monogram size="md" />
      </div>

      <h3 className={styles.directHeading}>{t(copy.detailsHeading)}</h3>
      <ul className={styles.links}>
        {profile.contacts.map((contact) => {
          const Icon = ICONS[contact.id];
          const external = isExternal(contact.href);
          return (
            <li key={contact.id} className={styles.linkItem}>
              <span className={styles.linkIcon}>
                <Icon />
              </span>
              <span className={styles.linkLabel}>{t(contact.label)}</span>
              {contact.href ? (
                <a
                  className={styles.linkValue}
                  href={contact.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {contact.value}
                  {external && <span className="visually-hidden"> {t(copy.opensInNewTab)}</span>}
                </a>
              ) : (
                <span className={styles.linkValue}>{contact.value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
