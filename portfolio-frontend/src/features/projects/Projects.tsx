import { Section } from '@/components/ui';
import { ui } from '@/i18n/ui';
import { useMediaQuery } from './useMediaQuery';
import { ProjectShowcase } from './ProjectShowcase';
import { ProjectCarousel } from './ProjectCarousel';

const WIDE = '(min-width: 800px)';

/** Selected work as interactive case studies: tabs and a stage when wide, a swipeable row when narrow. */
export function Projects() {
  const wide = useMediaQuery(WIDE);
  return (
    <Section id="projects" title={ui.sections.projects.title}>
      {wide ? <ProjectShowcase /> : <ProjectCarousel />}
    </Section>
  );
}
