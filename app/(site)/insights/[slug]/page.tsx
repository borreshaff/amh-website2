import { Section } from "@/components/ui/Section";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <Section eyebrow="Insight" title={params.slug.replace(/-/g, " ")}>
      <p className="max-w-2xl font-body text-white/60">
        Article template — wire to the `article` CMS document (body, author, category, related articles).
      </p>
    </Section>
  );
}
