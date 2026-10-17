import { certifications, education } from '@/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Reveal, Section } from '@/components/ui';
import { CertificateCard } from './CertificateCard';
import { copy } from './copy';
import styles from './Certifications.module.css';

export function Certifications() {
  const { t } = useLanguage();
  return (
    <Section
      id="certifications"
      tone="alt"
     
      title={ui.sections.certifications.title}
    >
      <h3 className={styles.groupHeading}>{t(copy.certifications)}</h3>
      <ul className={styles.certGrid}>
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.id} variant="flip" delay={i * 140} className={styles.cell}>
            <CertificateCard cert={cert} />
          </Reveal>
        ))}
      </ul>

      <div className={styles.lower}>
        <Reveal as="article" variant="flip" delay={200} className={styles.panel}>
          <h3 className={styles.panelTitle}>{t(ui.labels.education)}</h3>
          <p className={styles.degree}>{t(education.degree)}</p>
          <p className={styles.school}>{education.school}</p>
          <p className={styles.date}>{t(education.period)}</p>
        </Reveal>
      </div>
    </Section>
  );
}
