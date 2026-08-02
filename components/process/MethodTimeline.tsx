const STAGES = [
  { number: "01", title: "Discover", description: "Understand the business, market, audience, and opportunity." },
  { number: "02", title: "Define", description: "Establish strategy, positioning, message, and success metrics." },
  { number: "03", title: "Create", description: "Develop identity, campaign concept, and production assets." },
  { number: "04", title: "Launch", description: "Execute across selected platforms through a coordinated rollout." },
  { number: "05", title: "Measure", description: "Review performance and identify what happens next." }
];

export function MethodTimeline() {
  return (
    <ol className="grid gap-8 md:grid-cols-5">
      {STAGES.map((stage) => (
        <li key={stage.number} className="border-t-2 border-gold pt-4">
          <span className="font-body text-xs text-gold">{stage.number}</span>
          <h3 className="mt-2 font-heading text-base text-white">{stage.title}</h3>
          <p className="mt-2 font-body text-sm text-white/60">{stage.description}</p>
        </li>
      ))}
    </ol>
  );
}
