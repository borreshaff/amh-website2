import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata = { title: "Start a Project" };

export default function StartAProjectPage() {
  return (
    <Section eyebrow="Start a Project" title="Let's build something that creates impact.">
      <InquiryForm />
    </Section>
  );
}
