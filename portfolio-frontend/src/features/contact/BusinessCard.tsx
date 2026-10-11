import type { ComponentType } from 'react';
import { Seal } from '@/components/ui';
import { profile } from '@/content';
import { ui } from '@/i18n/ui';
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

/** 名刺-style business card with name, role and contact details. */
export function BusinessCard() {
  const { t } = useLanguage();

  return (
    <article className={styles.card} aria-label={t(copy.cardLabel)}>
      <div className={styles.cardTop}>
        <div>
          <p className={styles.cardKana} lang="ja">
            {profile.nameKana}
          </p>
          <p className={styles.cardName}>{profile.name}</p>
          <p className={styles.cardRole}>{t(profile.headline)}</p>
        </div>
        <Seal text={profile.seal} size="md" className={styles.cardSeal} />
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
      <span className={styles.cardKanji} aria-hidden="true">
        {ui.sections.contact.kanji}
      </span>
    </article>
  );
}
