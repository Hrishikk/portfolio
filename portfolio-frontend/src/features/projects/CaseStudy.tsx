import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { Project } from '@/types/content';
import { Tag } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { nextIndexForKey } from './rovingKeys';
import styles from './CaseStudy.module.css';

const STEPS = [ui.labels.problem, ui.labels.solution, ui.labels.outcome] as const;

interface CaseStudyProps {
  project: Project;
  /** True while this case study is the one on show: replays its staggered entrance. */
  active: boolean;
}

/** Inline custom property for stagger order. */
const order = (i: number) => ({ '--i': i }) as CSSProperties;

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" className={styles.check}>
      <path
        className={styles.checkPath}
        pathLength={1}
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={styles.arrow}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * One project as a clickable story: the visitor steps through problem → what I did → result
 * with tabs (or the arrow keys). Every step stays in the DOM, stacked in one grid cell, so the
 * card keeps a steady height and the swap can crossfade in either direction.
 */
export function CaseStudy({ project, active }: CaseStudyProps) {
  const { t, tl } = useLanguage();
  const uid = useId();
  const headingId = `${uid}-name`;
  const [step, setStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = (index: number, focus = false) => {
    setStep(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const next = nextIndexForKey(event, step, STEPS.length, 'horizontal');
    if (next === null) return;
    event.preventDefault();
    goTo(next, true);
  };

  const outcomes = tl(project.outcomes);

  return (
    <div className={styles.case} data-active={active || undefined} style={{ '--step': step } as CSSProperties}>
      <header className={styles.header}>
        <p className={`${styles.period} ${styles.enter}`} style={order(0)}>
          {t(project.period)}
        </p>
        <h3 id={headingId} className={`${styles.name} ${styles.enter}`} style={order(1)}>
          {project.name}
        </h3>
        <p className={styles.enter} style={order(2)}>
          <Tag tone="accent">{t(project.role)}</Tag>
        </p>
      </header>

      <div className={`${styles.story} ${styles.enter}`} style={order(3)}>
        <div role="tablist" aria-labelledby={headingId} className={styles.steps}>
          {STEPS.map((label, index) => (
            <button
              key={label.en}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${index}`}
              aria-selected={index === step}
              aria-controls={`${uid}-panel-${index}`}
              tabIndex={index === step ? 0 : -1}
              className={styles.stepTab}
              onClick={() => goTo(index)}
              onKeyDown={onKeyDown}
            >
              {t(label)}
            </button>
          ))}
          <span className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
          </span>
        </div>

        <div className={styles.stepStage}>
          {STEPS.map((label, index) => {
            const state = index === step ? 'active' : index < step ? 'before' : 'after';
            return (
              <div
                key={label.en}
                role="tabpanel"
                id={`${uid}-panel-${index}`}
                aria-labelledby={`${uid}-tab-${index}`}
                tabIndex={index === step ? 0 : -1}
                inert={index !== step}
                data-state={state}
                className={styles.stepPanel}
              >
                {index === 0 && <p className={styles.stepText}>{t(project.problem)}</p>}
                {index === 1 && <p className={styles.stepText}>{t(project.solution)}</p>}
                {index === 2 && (
                  <ul className={styles.outcomes}>
                    {outcomes.map((outcome, i) => (
                      <li key={outcome} className={styles.outcome} style={order(i)}>
                        <CheckIcon />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {index < STEPS.length - 1 && (
                  <button type="button" className={styles.next} onClick={() => goTo(index + 1, true)}>
                    {t(STEPS[index + 1])}
                    <ArrowIcon />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <h4 className={styles.visuallyHidden}>{t(ui.labels.stack)}</h4>
        <ul className={styles.stack}>
          {project.stack.map((tech, i) => (
            <li key={tech} className={styles.chip} style={order(i)}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
