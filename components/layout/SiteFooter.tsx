import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-container gap-10 md:grid-cols-4">
        <div>
          <p className="font-heading text-lg tracking-wide2 text-white">
            AMH<span className="text-gold"> GROUP</span>
          </p>
          <p className="mt-4 max-w-xs font-body text-sm text-white/60">
            We build brands that connect. We create impact that lasts.
          </p>
        </div>

        <div>
          <p className="mb-4 font-body text-xs uppercase tracking-wide2 text-gold">
            Navigate
          </p>
          <ul className="space-y-2 font-body text-sm text-white/70">
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/insights">Insights</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-body text-xs uppercase tracking-wide2 text-gold">
            Contact
          </p>
          <ul className="space-y-2 font-body text-sm text-white/70">
            {/* Placeholder — replace via Site Settings once confirmed */}
            <li>hello@amhgroup.com</li>
            <li>+974 [Placeholder]</li>
            <li>Doha, Qatar</li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-body text-xs uppercase tracking-wide2 text-gold">
            Legal
          </p>
          <ul className="space-y-2 font-body text-sm text-white/70">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-container font-body text-xs text-white/40">
        © {new Date().getFullYear()} AMH Group. All rights reserved.
      </p>
    </footer>
  );
}
