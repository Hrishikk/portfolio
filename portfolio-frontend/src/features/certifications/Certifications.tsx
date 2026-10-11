import { certifications, education, languages } from '@/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Reveal, Seal, Section } from '@/components/ui';
import { CertificateCard } from './CertificateCard';
import { LanguageLevel } from './LanguageLevel';
import { copy } from './copy';
import styles from './Certifications.module.css';

export function Certifications() {
  const { t } = useLanguage();
  return (
    <Section
      id="certifications"
      index="06"
      tone="alt"
      kanji={ui.sections.certifications.kanji}
      title={ui.sections.certifications.title}
    >
      <h3 className={styles.groupHeading}>{t(copy.certifications)}</h3>
      <ul className={styles.certGrid}>
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.id} delay={i * 90} className={styles.cell}>
            <CertificateCard cert={cert} />
          </Reveal>
        ))}
      </ul>

      <div className={styles.lower}>
        <Reveal as="article" className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle}>{t(ui.labels.education)}</h3>
            <Seal text="学" size="sm" />
          </div>
          <p className={styles.degree}>{t(education.degree)}</p>
          <p className={styles.school}>{education.school}</p>
          <p className={styles.date}>{t(education.period)}</p>
        </Reveal>

        <Reveal as="article" delay={90} className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle}>{t(ui.labels.languages)}</h3>
            <Seal text="語" size="sm" />
          </div>
          <ul className={styles.langs}>
            {languages.map((lang) => (
              <LanguageLevel key={lang.id} language={lang} />
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
