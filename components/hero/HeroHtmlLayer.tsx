import Link from "next/link";

export function HeroHtmlLayer() {
  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-end px-6 pb-20 text-center md:pb-28">
      <h1 className="font-heading text-4xl uppercase leading-tight tracking-wide2 text-white md:text-6xl">
        Strategy in Motion.
      </h1>
      <p className="mt-6 max-w-xl font-body text-base text-white/70 md:text-lg">
        We build brands that connect, content that moves people, and campaigns
        designed to create measurable growth.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/start-a-project"
          className="bg-gold px-8 py-3 font-body text-xs uppercase tracking-wide2 text-black transition-opacity hover:opacity-90"
        >
          Start a Project
        </Link>
        <Link
          href="/work"
          className="border border-white/30 px-8 py-3 font-body text-xs uppercase tracking-wide2 text-white transition-colors hover:border-gold hover:text-gold"
        >
          View Our Work
        </Link>
      </div>

      <span className="mt-14 font-body text-[11px] uppercase tracking-wide3 text-white/40">
        Scroll
      </span>
    </div>
  );
}
