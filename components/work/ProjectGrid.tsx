import Link from "next/link";
import { Project } from "@/lib/cms/types";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="font-body text-white/50">Projects coming soon.</p>;
  }

  const featured = projects[0] as Project;
  const rest = projects.slice(1);

  return (
    <div className="grid gap-6">
      <ProjectCard project={featured} large />
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative block overflow-hidden bg-charcoal ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-body text-xs uppercase tracking-wide2 text-gold">
          {project.client} · {project.industry}
        </p>
        <h3 className="mt-2 font-heading text-xl text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 font-body text-sm text-white/0 transition-colors group-hover:text-white/70">
          View Case Study →
        </p>
      </div>
    </Link>
  );
}
