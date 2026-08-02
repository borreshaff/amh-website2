import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  id
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-white/10 bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-container">
        <p className="mb-3 font-body text-xs uppercase tracking-wide2 text-gold">
          {eyebrow}
        </p>
        <h2 className="mb-10 max-w-3xl font-heading text-3xl leading-tight text-white md:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
