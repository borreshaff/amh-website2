import { Section } from "@/components/ui/Section";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  return (
    <Section eyebrow="Case Study" title={`Project: ${params.slug}`}>
      <p className="max-w-2xl font-body text-white/60">
        Case-study template — wire to the `project` CMS document
        (challenge, insight, approach, execution, deliverables, results, gallery).
      </p>
    </Section>
  );
}
