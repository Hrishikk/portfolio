import { useEffect, type ComponentType } from 'react';
import { Reveal, Section, Seal } from '@/components/ui';
import { profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { wakeBackend } from '@/services/contactApi';
import type { ContactLink } from '@/types/content';
import { ContactForm } from './ContactForm';
import { copy } from './copy';
import styles from './Contact.module.css';

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M3 6.5h18v11H3z M3 7l9 6.5L21 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10.5V16M8 7.8v.2M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<ContactLink['id'], ComponentType> = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  location: PinIcon,
};

/** Contact section: an invitation + 名刺-style business card on the left, the form on the right. */
export function Contact() {
  const { t } = useLanguage();
  const external = (href?: string) => Boolean(href && /^https?:/.test(href));

  useEffect(wakeBackend, []);

  return (
    <Section
      id="contact"
      index="07"
      kanji={ui.sections.contact.kanji}
      title={ui.sections.contact.title}
      lead={copy.lead}
    >
      <div className={styles.layout}>
        <Reveal className={styles.aside}>
          <p className={styles.invitation}>{t(copy.invitation)}</p>

          <p className={styles.availability}>
            <span className={styles.pulse} aria-hidden="true" />
            <span className="visually-hidden">{t(copy.availabilityLabel)}: </span>
            {t(profile.availability)}
          </p>

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

            <h3 className={styles.directHeading}>{t(copy.directHeading)}</h3>
            <ul className={styles.links}>
              {profile.contacts.map((contact) => {
                const Icon = ICONS[contact.id];
                const isExternal = external(contact.href);
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
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {contact.value}
                        {isExternal && <span className="visually-hidden"> {t(copy.opensInNewTab)}</span>}
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
        </Reveal>

        <Reveal delay={140} className={styles.formColumn}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
