import { projects } from '@/content';
import { Reveal, Section } from '@/components/ui';
import { ui } from '@/i18n/ui';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

const STAGGER_MS = 90;

/** Featured projects as story cards; the first one spans the full width. */
export function Projects() {
  return (
    <Section id="projects" eyebrow={ui.sections.projects.eyebrow} title={ui.sections.projects.title}>
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <Reveal
            as="li"
            key={project.id}
            delay={index * STAGGER_MS}
            className={`${styles.item} ${index === 0 ? styles.featured : ''}`}
          >
            <ProjectCard project={project} featured={index === 0} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
