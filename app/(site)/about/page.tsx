import { Section } from "@/components/ui/Section";

export const metadata = { title: "About" };

const FOUNDERS = [
  {
    name: "Abdulrahmane M H Al Dosari",
    role: "Founder",
    bio: "[Placeholder — bio pending approval]"
  },
  {
    name: "Selma Rebika",
    role: "Founder",
    bio: "[Placeholder — bio pending approval]"
  }
];

export default function Page() {
  return (
    <Section eyebrow="About" title="Built for brands ready to move forward.">
      <p className="max-w-2xl font-body text-white/60">
        Full company narrative pending — see /content-required in the
        foundation document. Founding leadership below.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {FOUNDERS.map((founder) => (
          <div key={founder.name} className="border border-white/10 p-6">
            <p className="font-heading text-lg text-white">{founder.name}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-wide2 text-gold">
              {founder.role}
            </p>
            <p className="mt-4 font-body text-sm text-white/50">{founder.bio}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
