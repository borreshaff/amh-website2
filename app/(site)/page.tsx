import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroHtmlLayer } from "@/components/hero/HeroHtmlLayer";
import { Section } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ServicePillars } from "@/components/services/ServicePillars";
import { MethodTimeline } from "@/components/process/MethodTimeline";
import { getFeaturedProjects } from "@/lib/cms/queries";

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <section id="hero-transform" className="relative h-screen w-full overflow-hidden bg-black">
        <HeroCanvas />
        <HeroHtmlLayer />
      </section>

      <Section eyebrow="Selected Work" title="Proof, not promises." id="work">
        <ProjectGrid projects={projects} />
      </Section>

      <Section eyebrow="Positioning" title="Ideas are only powerful when they move people.">
        <p className="max-w-2xl font-body text-white/70">
          AMH combines strategy, identity, content, and performance marketing
          to build brands that connect and campaigns designed to convert.
        </p>
      </Section>

      <Section eyebrow="Services" title="One connected system for brand, content, and growth.">
        <ServicePillars />
      </Section>

      <Section eyebrow="The AMH Method" title="Clear thinking. Connected execution.">
        <MethodTimeline />
      </Section>

      <Section eyebrow="Final CTA" title="Let's build something that creates impact.">
        <p className="max-w-xl font-body text-white/70">
          Tell us about your business, your challenge, and what you want to achieve.
        </p>
        
          href="/start-a-project"
          className="mt-8 inline-block bg-gold px-8 py-3 font-body text-xs uppercase tracking-wide2 text-black"
        >
          Start a Project
        </a>
      </Section>
    </>
  );
}
