import type { Project } from '@/types/content';
import { Tag } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { accentStyle, accentTagTone } from './accent';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={styles.check}>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One project told as a three-step story: problem → what I did → result. */
export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const { t, tl } = useLanguage();
  const headingId = `project-${project.id}`;

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      style={accentStyle(project.accent)}
      aria-labelledby={headingId}
    >
      <span className={styles.number} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <header className={styles.header}>
        <p className={styles.period}>{t(project.period)}</p>
        <h3 id={headingId} className={styles.name}>
          {project.name}
        </h3>
        <p className={styles.role}>
          <Tag tone={accentTagTone(project.accent)}>{t(project.role)}</Tag>
        </p>
      </header>

      <ol className={styles.story}>
        <li className={styles.step}>
          <span className={styles.stepNum} aria-hidden="true">1</span>
          <div className={styles.stepBody}>
            <h4 className={styles.stepLabel}>{t(ui.labels.problem)}</h4>
            <p className={styles.stepText}>{t(project.problem)}</p>
          </div>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNum} aria-hidden="true">2</span>
          <div className={styles.stepBody}>
            <h4 className={styles.stepLabel}>{t(ui.labels.solution)}</h4>
            <p className={styles.stepText}>{t(project.solution)}</p>
          </div>
        </li>
        <li className={`${styles.step} ${styles.result}`}>
          <span className={styles.stepNum} aria-hidden="true">3</span>
          <div className={styles.stepBody}>
            <h4 className={styles.stepLabel}>{t(ui.labels.outcome)}</h4>
            <ul className={styles.outcomes}>
              {tl(project.outcomes).map((outcome) => (
                <li key={outcome}>
                  <CheckIcon />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ol>

      <footer className={styles.footer}>
        <h4 className={styles.visuallyHidden}>{t(ui.labels.stack)}</h4>
        <ul className={styles.stack}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
