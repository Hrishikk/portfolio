import type { ReactNode } from 'react';
import type { Localized, SectionId } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { Reveal } from '../Reveal/Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  /** Short label above the title, e.g. "Projects". */
  eyebrow: Localized;
  title: Localized;
  lead?: Localized;
  tone?: 'default' | 'alt';
  children: ReactNode;
}

/** Standard page section: eyebrow label, title, optional lead, then content. */
export function Section({ id, eyebrow, title, lead, tone = 'default', children }: SectionProps) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${tone === 'alt' ? styles.alt : ''}`}>
      <div className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <p className={styles.eyebrow}>{t(eyebrow)}</p>
          <h2 id={headingId} className={styles.title}>
            {t(title)}
          </h2>
          {lead && <p className={styles.lead}>{t(lead)}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
