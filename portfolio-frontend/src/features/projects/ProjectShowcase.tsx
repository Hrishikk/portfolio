import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { projects } from '@/content';
import { Reveal } from '@/components/ui';
import { useInView } from '@/hooks/useInView';
import { useSpotlight } from '@/hooks/useSpotlight';
import { useLanguage } from '@/i18n/useLanguage';
import { CaseStudy } from './CaseStudy';
import { nextIndexForKey } from './rovingKeys';
import styles from './Projects.module.css';

/**
 * Wide screens: projects as a vertical tab list beside one large stage.
 * Switching sends the outgoing case study back and away in the direction of travel
 * while the incoming one comes forward from the other side.
 */
export function ProjectShowcase() {
  const { t } = useLanguage();
  const uid = useId();
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useSpotlight<HTMLDivElement>({ tilt: 0.8 });
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  // Park the sliding indicator on the active tab; re-measure when text reflows (resize, language).
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const tab = tabRefs.current[active];
      if (!tab) return;
      rail.style.setProperty('--ind-y', `${tab.offsetTop}px`);
      rail.style.setProperty('--ind-h', `${tab.offsetHeight}px`);
    };
    measure();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [active]);

  const onKeyDown = (event: KeyboardEvent) => {
    const next = nextIndexForKey(event, active, projects.length, 'vertical');
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={viewRef} className={styles.showcase}>
      <Reveal variant="swingLeft" className={styles.listWrap}>
        <div ref={railRef} className={styles.rail}>
          <span aria-hidden="true" className={styles.indicator} />
          <ul role="tablist" aria-orientation="vertical" aria-labelledby="projects-heading" className={styles.list}>
            {projects.map((project, index) => (
              <li key={project.id} role="presentation">
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${index}`}
                  aria-selected={index === active}
                  aria-controls={`${uid}-panel-${index}`}
                  tabIndex={index === active ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
                >
                  <span className={styles.tabPeriod}>{t(project.period)}</span>
                  <span className={styles.tabName}>{project.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal variant="swingRight" delay={120} className={styles.stageWrap}>
        <div ref={stageRef} className={`${styles.stage} spotlight`}>
          <div className={styles.panels}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                role="tabpanel"
                id={`${uid}-panel-${index}`}
                aria-labelledby={`${uid}-tab-${index}`}
                inert={index !== active}
                data-state={index === active ? 'active' : index < active ? 'before' : 'after'}
                className={styles.panel}
              >
                <CaseStudy project={project} active={inView && index === active} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
