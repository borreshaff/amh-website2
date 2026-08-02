import { Section } from "@/components/ui/Section";

const VALID_SLUGS = ["real-estate", "hospitality", "corporate", "retail", "events", "personal-brands"];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  return (
    <Section eyebrow="Industry" title={params.slug.replace(/-/g, " ")}>
      <p className="max-w-2xl font-body text-white/60">
        Industry template — wire to the `industry` CMS document
        (challenges, related services, related projects, CTA).
      </p>
    </Section>
  );
}
