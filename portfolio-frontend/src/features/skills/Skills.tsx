import { skillGroups } from '@/content';
import { ui } from '@/i18n/ui';
import { Reveal, Section } from '@/components/ui';
import { SkillCard, type SkillAccent } from './SkillCard';
import styles from './Skills.module.css';

const ACCENTS: SkillAccent[] = ['vermilion', 'indigo', 'matcha', 'gold'];

/** Decorative kanji per group; falls back to the section kanji. */
const GROUP_KANJI: Record<string, string> = {
  frontend: '画',
  backend: '核',
  data: '蔵',
  cloud: '雲',
  quality: '検',
  leadership: '導',
};

export function Skills() {
  return (
    <Section id="skills" index="04" tone="alt" kanji={ui.sections.skills.kanji} title={ui.sections.skills.title}>
      <ul className={styles.grid}>
        {skillGroups.map((group, i) => (
          <Reveal as="li" key={group.id} delay={(i % 3) * 80} className={styles.cell}>
            <SkillCard
              group={group}
              kanji={GROUP_KANJI[group.id] ?? ui.sections.skills.kanji}
              accent={ACCENTS[i % ACCENTS.length]}
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
