import { AuroraCanvas, Reveal, Section } from '@/components/ui';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { BusinessCard } from './BusinessCard';
import { ContactActions } from './ContactActions';
import { copy } from './copy';
import styles from './Contact.module.css';

/** Contact section: the page's close. Invitation and contact actions next to a business card, over the living colour band. */
export function Contact() {
  const { t } = useLanguage();

  return (
    <Section
      id="contact"
      title={ui.sections.contact.title}
      lead={copy.lead}
      className={styles.section}
      backdrop={
        <div className={styles.band} aria-hidden="true">
          <AuroraCanvas className={styles.aurora} />
        </div>
      }
    >
      <div className={styles.layout}>
        <Reveal variant="swingLeft" className={styles.aside}>
          <p className={styles.invitation}>{t(copy.invitation)}</p>

          <ContactActions />
        </Reveal>

        <Reveal variant="swingRight" delay={140}>
          <BusinessCard />
        </Reveal>
      </div>
    </Section>
  );
}
