import { Reveal, Section } from '@/components/ui';
import { profile, strengths } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { GlanceCard } from './GlanceCard';
import { ScrollLit } from './ScrollLit';
import { StrengthCard } from './StrengthCard';
import styles from './About.module.css';

/** About section: scroll-lit opening statement, summary, at-a-glance card and core development areas. */
export function About() {
  const { tl } = useLanguage();
  const [opening, ...rest] = tl(profile.summary);
  return (
    <Section id="about" title={ui.sections.about.title}>
      <ScrollLit text={opening} />

      <div className={styles.layout}>
        <Reveal variant="swingLeft" className={styles.summary}>
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal variant="swingRight" delay={120} className={styles.side}>
          <GlanceCard />
        </Reveal>
      </div>

      <ul className={styles.strengths}>
        {strengths.map((strength, i) => (
          <Reveal as="li" key={strength.id} delay={i * 140} className={styles.strengthCell}>
            <StrengthCard strength={strength} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
