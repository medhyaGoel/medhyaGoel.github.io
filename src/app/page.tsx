
import {ProfileLinks} from '@/components/profile-links';
import {ProjectShowcase} from '@/components/project-showcase';
import {Timeline} from '@/components/timeline';
import {IntroBlurb} from '@/components/intro-blurb';
import {AiBlurbRefiner} from '@/components/ai-blurb-refiner';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <section id="intro" className="mb-8">
        <IntroBlurb />
      </section>

      <section id="profile-links" className="mb-8">
        <ProfileLinks />
      </section>

      <section id="timeline" className="mb-8">
        <Timeline />
      </section>

      <section id="projects" className="mb-8">
        <ProjectShowcase />
      </section>

      <section id="ai-refiner">
        <AiBlurbRefiner />
      </section>
    </div>
  );
}
