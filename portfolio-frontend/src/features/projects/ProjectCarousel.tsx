import { useEffect, useRef, useState } from 'react';
import { projects } from '@/content';
import { Reveal } from '@/components/ui';
import { useInView } from '@/hooks/useInView';
import { REDUCED_MOTION } from './useMediaQuery';
import { CaseStudy } from './CaseStudy';
import styles from './Projects.module.css';

/**
 * Narrow screens: a swipeable, snap-scrolling row of case studies.
 * The bar below tracks the card in view and jumps to any card on tap.
 */
export function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLUListElement | null>(null);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  // The card whose left edge is nearest the rail's start is the one in view.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(rail.children) as HTMLElement[];
      const origin = rail.scrollLeft + (items[0]?.offsetLeft ?? 0);
      let nearest = 0;
      items.forEach((item, index) => {
        if (Math.abs(item.offsetLeft - origin) < Math.abs(items[nearest].offsetLeft - origin)) nearest = index;
      });
      // At the far end the last card can't reach the start edge; count it as in view.
      if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) nearest = items.length - 1;
      setActive(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const item = railRef.current?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({
      behavior: matchMedia(REDUCED_MOTION).matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <div ref={viewRef} className={styles.carousel}>
      <Reveal>
        <ul ref={railRef} className={styles.track} aria-labelledby="projects-heading">
          {projects.map((project, index) => (
            <li key={project.id} className={styles.slide} data-current={index === active || undefined}>
              <article className={styles.card}>
                <CaseStudy project={project} active={inView && index === active} />
              </article>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className={styles.pager}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={styles.pip}
            aria-label={project.name}
            aria-current={index === active || undefined}
            onClick={() => goTo(index)}
          >
            <span className={styles.pipBar} />
          </button>
        ))}
      </div>
    </div>
  );
}
