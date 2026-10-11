import type { ReactNode } from 'react';
import type { Localized, SectionId } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { Reveal } from '../Reveal/Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  /** Section number shown in the eyebrow, e.g. "02". */
  index: string;
  /** One decorative kanji that sums up the section. */
  kanji: string;
  title: Localized;
  lead?: Localized;
  tone?: 'default' | 'alt';
  children: ReactNode;
}

/** Standard page section: numbered eyebrow, big kanji watermark, title, optional lead. */
export function Section({ id, index, kanji, title, lead, tone = 'default', children }: SectionProps) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${tone === 'alt' ? styles.alt : ''}`}>
      <div className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <span className={styles.kanji} aria-hidden="true">
            {kanji}
          </span>
          <p className={styles.eyebrow}>
            <span className={styles.index}>{index}</span>
            <span className={styles.rule} aria-hidden="true" />
          </p>
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
