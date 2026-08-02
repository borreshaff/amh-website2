import { Section } from "@/components/ui/Section";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Speak with our team.">
      <ul className="space-y-2 font-body text-white/70">
        <li>Email: hello@amhgroup.com</li>
        <li>Phone: [Placeholder — +974]</li>
        <li>WhatsApp: [Placeholder]</li>
        <li>Office: Doha, Qatar [Placeholder — confirm full address]</li>
      </ul>
    </Section>
  );
}
