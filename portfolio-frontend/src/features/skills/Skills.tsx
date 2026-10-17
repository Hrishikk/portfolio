import { skillGroups } from '@/content';
import { ui } from '@/i18n/ui';
import { Reveal, Section } from '@/components/ui';
import { SkillCard } from './SkillCard';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills" tone="alt" title={ui.sections.skills.title}>
      <ul className={styles.grid}>
        {skillGroups.map((group, i) => (
          <Reveal as="li" key={group.id} delay={(i % 3) * 120} className={styles.cell}>
            <SkillCard group={group} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
