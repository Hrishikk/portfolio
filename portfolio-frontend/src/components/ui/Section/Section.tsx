import type { ReactNode } from 'react';
import type { Localized, SectionId } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { useInView } from '@/hooks/useInView';
import { Reveal } from '../Reveal/Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  title: Localized;
  lead?: Localized;
  tone?: 'default' | 'alt';
  /** Decorative layer drawn behind the section content (full-bleed). */
  backdrop?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Standard page section: title, optional lead, then content. */
export function Section({ id, title, lead, tone = 'default', backdrop, className = '', children }: SectionProps) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;
  // The header (never clipped) is what's observed; the title's mask lives on an inner span.
  const { ref: headerRef, inView } = useInView<HTMLElement>();
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${tone === 'alt' ? styles.alt : ''} ${className}`}>
      {backdrop}
      <div className={styles.inner}>
        <header ref={headerRef} className={`${styles.header} ${inView ? styles.headerIn : ''}`}>
          <h2 id={headingId} className={styles.title}>
            <span className={styles.titleMask}>
              <span className={styles.titleText}>{t(title)}</span>
            </span>
          </h2>
          {lead && (
            <Reveal delay={150}>
              <p className={styles.lead}>{t(lead)}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
