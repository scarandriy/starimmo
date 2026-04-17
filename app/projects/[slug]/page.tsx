import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { HeroCtaButton } from "@/components/ui/hero-cta-button";
import { SectionContainer } from "@/components/layout/section-container";
import { GalleryCarousel } from "@/components/property/gallery-carousel";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyFactsGrid } from "@/components/property/property-facts-grid";
import { PropertyFeatureList } from "@/components/property/property-feature-list";
import { routes } from "@/config/site";
import {
  getFlatsByProjectId,
  getProjectBySlug,
  getProjectFacts,
  getProjects,
} from "@/features/properties/catalog";
import { buildMetadata } from "@/lib/metadata";
import { formatCurrency } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      path: routes.projects,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.seoDescription,
    path: routes.project(project.slug),
    image: project.coverImage.src,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectFlats = getFlatsByProjectId(project.id);

  return (
    <>
      {/* Hero with cover image + split info bar */}
      <PageHero
        frame="contained"
        imageSrc={project.coverImage.src}
        imageAlt={project.coverImage.alt}
        className="min-h-[85vh]"
        contentClassName="flex min-h-[85vh] flex-col justify-end pl-12"
      >
        <div>
          <h1 className="max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_3fr]">
            <div className="flex items-start border-t border-white/20 lg:border-t-0">
              <HeroCtaButton href={routes.contact}>
                Schedule a visit
              </HeroCtaButton>
            </div>
            <div className="flex items-start bg-white px-12 py-12">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Address
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {project.address}
                  <br />
                  {project.postcode} {project.city}
                </p>
              </div>
              <div className="ml-auto pr-12">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  {project.flats.length > 0 ? "Price" : "Delivery"}
                </p>
                <p className="mt-2 text-xl font-bold text-foreground">
                  {project.flats.length > 0
                    ? `From ${formatCurrency(Math.min(...project.flats.map((f) => f.price)))}`
                    : project.projectStats.deliveryLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Project info + sidebar */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {project.description}
            </p>
            <hr className="divider mt-8" />
            <div className="mt-8">
              <PropertyFactsGrid facts={getProjectFacts(project)} />
            </div>
          </div>
          <aside className="rounded-(--theme-radius-card) border border-border bg-surface-muted p-6">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Project overview
            </p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-foreground">
              <p>{project.address}, {project.postcode} {project.city}</p>
              <hr className="divider" />
              <p>{project.projectStats.availabilityLabel}</p>
              <p>{project.projectStats.deliveryLabel}</p>
              <p>Developer: {project.developer}</p>
            </div>
            <Button href={routes.contact} fullWidth className="mt-6">
              Enquire about this project
            </Button>
          </aside>
        </div>
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer className="bg-surface-muted">
        <GalleryCarousel images={project.galleryImages} />
      </SectionContainer>

      {/* Features (dark section) */}
      <SectionContainer
        dark
        eyebrow="Amenities"
        title={`${project.title} features`}
      >
        <PropertyFeatureList features={project.features} dark />
      </SectionContainer>

      {/* Available flats */}
      {projectFlats.length > 0 && (
        <SectionContainer
          eyebrow="Available apartments"
          title="Residences in this development"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {projectFlats.map((flat) => (
              <PropertyCard key={flat.id} property={flat} />
            ))}
          </div>
        </SectionContainer>
      )}
    </>
  );
}
