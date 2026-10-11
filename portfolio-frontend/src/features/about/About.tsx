import { Reveal, Section } from '@/components/ui';
import { profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { BridgeDiagram } from './BridgeDiagram';
import { GlanceCard } from './GlanceCard';
import styles from './About.module.css';

/** About section: summary story, Bridge SE explainer and an at-a-glance card. */
export function About() {
  const { tl } = useLanguage();
  return (
    <Section id="about" index="01" kanji={ui.sections.about.kanji} title={ui.sections.about.title}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <Reveal className={styles.summary}>
            {tl(profile.summary).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <BridgeDiagram />
          </Reveal>
        </div>
        <Reveal delay={200} className={styles.side}>
          <GlanceCard />
        </Reveal>
      </div>
    </Section>
  );
}
