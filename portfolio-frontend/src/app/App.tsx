import { Footer } from '@/components/layout/Footer/Footer';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { About } from '@/features/about/About';
import { Certifications } from '@/features/certifications/Certifications';
import { Contact } from '@/features/contact/Contact';
import { Experience } from '@/features/experience/Experience';
import { Hero } from '@/features/hero/Hero';
import { Projects } from '@/features/projects/Projects';
import { Skills } from '@/features/skills/Skills';
import { useAnchorTravel } from '@/hooks/useAnchorTravel';

/** Page composition only — each section owns its own layout and data access. */
export function App() {
  useAnchorTravel();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
