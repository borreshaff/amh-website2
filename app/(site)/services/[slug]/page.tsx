import { Section } from "@/components/ui/Section";

const VALID_SLUGS = [
  "brand-strategy",
  "branding-and-identity",
  "content-and-video-production",
  "digital-marketing",
  "performance-marketing",
  "social-media",
  "analytics-and-growth"
];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  return (
    <Section eyebrow="Service" title={params.slug.replace(/-/g, " ")}>
      <p className="max-w-2xl font-body text-white/60">
        Service template — wire to the `service` CMS document
        (description, problems solved, deliverables, process, FAQs).
      </p>
    </Section>
  );
}
