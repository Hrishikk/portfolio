import { Reveal, Section } from '@/components/ui';
import { profile, strengths } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { GlanceCard } from './GlanceCard';
import { StrengthCard } from './StrengthCard';
import styles from './About.module.css';

/** About section: summary, core development areas and an at-a-glance card. */
export function About() {
  const { tl } = useLanguage();
  return (
    <Section id="about" eyebrow={ui.sections.about.eyebrow} title={ui.sections.about.title}>
      <div className={styles.layout}>
        <Reveal className={styles.summary}>
          {tl(profile.summary).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal delay={120} className={styles.side}>
          <GlanceCard />
        </Reveal>
      </div>

      <ul className={styles.strengths}>
        {strengths.map((strength, i) => (
          <Reveal as="li" key={strength.id} delay={i * 100}>
            <StrengthCard strength={strength} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
