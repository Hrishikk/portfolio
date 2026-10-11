import { Reveal, Section } from '@/components/ui';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { BusinessCard } from './BusinessCard';
import { ContactActions } from './ContactActions';
import { copy } from './copy';
import styles from './Contact.module.css';

/** Contact section: invitation and direct contact actions, next to a business card. */
export function Contact() {
  const { t } = useLanguage();

  return (
    <Section
      id="contact"
      eyebrow={ui.sections.contact.eyebrow}
      title={ui.sections.contact.title}
      lead={copy.lead}
    >
      <div className={styles.layout}>
        <Reveal className={styles.aside}>
          <p className={styles.invitation}>{t(copy.invitation)}</p>

          <ContactActions />
        </Reveal>

        <Reveal delay={140}>
          <BusinessCard />
        </Reveal>
      </div>
    </Section>
  );
}
