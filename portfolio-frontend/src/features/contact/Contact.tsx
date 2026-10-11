import { Reveal, Section } from '@/components/ui';
import { profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { BusinessCard } from './BusinessCard';
import { ContactActions } from './ContactActions';
import { copy } from './copy';
import styles from './Contact.module.css';

/** Contact section: invitation and direct contact actions, next to a 名刺-style business card. */
export function Contact() {
  const { t } = useLanguage();

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

          <ContactActions />
        </Reveal>

        <Reveal delay={140}>
          <BusinessCard />
        </Reveal>
      </div>
    </Section>
  );
}
