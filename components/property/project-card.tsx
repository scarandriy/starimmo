import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { routes } from "@/config/site";
import { getProjectStatusLabel } from "@/features/properties/catalog";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/property";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={routes.project(project.slug)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-(--theme-radius-card) border border-border bg-surface transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-surface-muted">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge label={getProjectStatusLabel(project)} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {project.city} &middot; {project.projectStats.deliveryLabel}
        </p>
        <h3 className="mt-2 text-xl font-bold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{project.projectStats.residences} residences</span>
          <span>&middot;</span>
          <span>{project.flats.length} flats</span>
          <span>&middot;</span>
          <span>Energy {project.energyClass}</span>
        </div>
      </div>
    </Link>
  );
}
