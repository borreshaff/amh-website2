import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-heading text-lg tracking-wide2 text-white">
          AMH<span className="text-gold"> GROUP</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-wide2 text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start-a-project"
          className="hidden border border-gold px-5 py-2 font-body text-xs uppercase tracking-wide2 text-gold transition-colors hover:bg-gold hover:text-black md:inline-block"
        >
          Start a Project
        </Link>

        {/* Mobile menu trigger — wire to a full-screen takeover panel */}
        <button
          className="text-white md:hidden"
          aria-label="Open menu"
          aria-expanded="false"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
