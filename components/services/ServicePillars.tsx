const PILLARS = [
  {
    number: "01",
    title: "Strategy",
    slug: "brand-strategy",
    items: ["Brand Strategy", "Marketing Strategy", "Campaign Planning", "Go-to-Market Planning"]
  },
  {
    number: "02",
    title: "Brand",
    slug: "branding-and-identity",
    items: ["Brand Identity", "Visual Systems", "Messaging", "Brand Guidelines"]
  },
  {
    number: "03",
    title: "Content & Production",
    slug: "content-and-video-production",
    items: ["Creative Direction", "Video Production", "Photography", "Motion Graphics"]
  },
  {
    number: "04",
    title: "Digital & Performance",
    slug: "digital-marketing",
    items: ["Digital Marketing", "Paid Advertising", "Lead Generation", "Landing Pages"]
  },
  {
    number: "05",
    title: "Analytics & Growth",
    slug: "analytics-and-growth",
    items: ["Campaign Reporting", "Performance Analysis", "Audience Insights", "Growth Optimization"]
  }
];

export function ServicePillars() {
  return (
    <div className="grid gap-px bg-white/10 md:grid-cols-5">
      {PILLARS.map((pillar) => (
        <a
          key={pillar.slug}
          href={`/services/${pillar.slug}`}
          className="group flex flex-col justify-between bg-black p-6 transition-colors hover:bg-charcoal"
        >
          <span className="font-body text-xs text-gold">{pillar.number}</span>
          <div className="mt-8">
            <h3 className="font-heading text-lg text-white">{pillar.title}</h3>
            <ul className="mt-4 space-y-1 font-body text-xs text-white/50">
              {pillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  );
}
