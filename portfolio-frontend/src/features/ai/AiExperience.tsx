import { aiExperience } from '@/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Reveal, Section } from '@/components/ui';
import { ToolCard } from './ToolCard';
import { Workflow } from './Workflow';
import { Principles } from './Principles';
import { copy } from './copy';
import styles from './AiExperience.module.css';

export function AiExperience() {
  const { t } = useLanguage();
  return (
    <Section
      id="ai"
      index="05"
      kanji={ui.sections.ai.kanji}
      title={ui.sections.ai.title}
      lead={aiExperience.intro}
    >
      <Reveal className={styles.band}>
        <span className={styles.bandKanji} aria-hidden="true">
          {ui.sections.ai.kanji}
        </span>
        <h3 className={styles.bandHeading}>{t(copy.tools)}</h3>
        <div className={styles.tools}>
          {aiExperience.tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Reveal>
      <Workflow steps={aiExperience.workflow} tools={aiExperience.tools} />
      <Principles principles={aiExperience.principles} />
    </Section>
  );
}
