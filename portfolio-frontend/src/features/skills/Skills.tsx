import { Fragment, useState, type ReactNode } from 'react';
import { skillGroups } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { useInView } from '@/hooks/useInView';
import { Reveal, Section } from '@/components/ui';
import { useMediaQuery } from '@/features/experience/useMediaQuery';
import type { SkillGroup } from '@/types/content';
import { SkillInspector } from './SkillInspector';
import { StackLayer, type Selection } from './StackLayer';
import { copy } from './copy';
import styles from './Skills.module.css';

/** The three layers a request passes through, top to bottom. Everything else runs across them. */
const LAYER_IDS = ['frontend', 'backend', 'data-cloud'];

const byIds = (ids: string[], include: boolean): SkillGroup[] =>
  skillGroups.filter((g) => ids.includes(g.id) === include);

const layers = byIds(LAYER_IDS, true);
const crossCutting = byIds(LAYER_IDS, false);

const firstSelection = (): Selection => {
  const group = layers[0] ?? skillGroups[0];
  return { groupId: group.id, name: group.items[0]?.name ?? '' };
};

/**
 * Skills as an architecture diagram of the stack: Frontend → Backend → Data & Cloud as layers joined by
 * flowing connectors, with testing, AI-assisted development and practices as one band across all of them.
 * Every technology is a block you can select; the inspector shows its hands-on time and the career roles
 * that used it. Desktop keeps the inspector beside the diagram; on narrow screens it opens under the
 * selected layer.
 */
export function Skills() {
  const { t } = useLanguage();
  const isWide = useMediaQuery('(min-width: 960px)');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [selection, setSelection] = useState<Selection>(firstSelection);

  const group = skillGroups.find((g) => g.id === selection.groupId) ?? skillGroups[0];
  const item = group.items.find((i) => i.name === selection.name) ?? group.items[0];
  const inspector = <SkillInspector key={`${group.id}:${item.name}`} group={group} item={item} />;
  const inlineAfter = (id: string): ReactNode => (!isWide && selection.groupId === id ? inspector : null);
  const crossSelected = crossCutting.some((g) => g.id === selection.groupId);

  return (
    <Section id="skills" tone="alt" title={ui.sections.skills.title} lead={copy.lead}>
      <div ref={ref} className={`${styles.board} ${inView ? styles.in : ''}`}>
        <div className={styles.diagram}>
          {layers.map((layer, index) => (
            <Fragment key={layer.id}>
              <Reveal delay={index * 120}>
                <StackLayer group={layer} tone={index} selection={selection} onSelect={setSelection} />
              </Reveal>
              {inlineAfter(layer.id)}
              {index < layers.length - 1 && <span className={styles.flow} aria-hidden="true" />}
            </Fragment>
          ))}

          <Reveal delay={360} className={styles.crossWrap}>
            <p className={styles.crossLabel}>{t(copy.acrossStack)}</p>
            <div className={styles.cross}>
              {crossCutting.map((g) => (
                <StackLayer key={g.id} group={g} compact selection={selection} onSelect={setSelection} />
              ))}
            </div>
          </Reveal>
          {!isWide && crossSelected && inspector}
        </div>

        {isWide && <div className={styles.side}>{inspector}</div>}
      </div>
    </Section>
  );
}
