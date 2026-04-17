import { SectionContainer } from "@/components/layout/section-container";
import { ProjectCard } from "@/components/property/project-card";
import { routes } from "@/config/site";
import { getProjects } from "@/features/properties/catalog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Browse current residential developments across Luxembourg presented by Starimmo.",
  path: routes.projects,
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <SectionContainer
        dark
        eyebrow="Our portfolio"
        title="Residential developments"
        description="Explore our current projects across Luxembourg's most sought-after locations."
      />

      <SectionContainer>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
