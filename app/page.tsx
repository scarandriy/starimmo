import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { HeroCtaButton } from "@/components/ui/hero-cta-button";
import { SectionContainer } from "@/components/layout/section-container";
import { ProjectCard } from "@/components/property/project-card";
import { PropertyCard } from "@/components/property/property-card";
import { homePageContent, homePagePartners, routes } from "@/config/site";
import {
  getFeaturedProjects,
  getFeaturedProperties,
} from "@/features/properties/catalog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  path: routes.home,
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const featuredProperties = getFeaturedProperties();
  const partnerLogos = [...homePagePartners, ...homePagePartners];

  return (
    <>
      {/* Hero with cover image + split info bar */}
      <PageHero
        frame="contained"
        imageSrc="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern luxury residence interior"
        className="min-h-[85vh]"
        contentClassName="flex min-h-[85vh] flex-col justify-end pl-5 sm:pl-8 lg:pl-12"
      >
        <div>
          <h1 className="max-w-2xl whitespace-pre-line text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {homePageContent.hero.title}
          </h1>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_3fr]">
            <div className="flex items-start">
              <HeroCtaButton href={homePageContent.hero.primaryCta.href}>
                {homePageContent.hero.primaryCta.label}
              </HeroCtaButton>
            </div>
            <div className="flex items-start bg-white px-12 py-12">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Discover
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {homePageContent.hero.subtitle}
                </p>
              </div>
              <div className="ml-auto pr-12">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Get started
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  href={homePageContent.hero.secondaryCta.href}
                  className="mt-2"
                >
                  {homePageContent.hero.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Partner strip */}
      <SectionContainer spacing="flush" className="bg-surface-muted" contentClassName="py-6 sm:py-8">
        <div className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Partners
          </p>

          <div className="partners-marquee">
            <div className="partners-track">
              {partnerLogos.map((partner, index) => (
                <div
                  key={`${partner.mark}-${index}`}
                  className="flex min-w-48 items-center gap-4 bg-surface-muted px-5 py-4"
                  aria-hidden={index >= homePagePartners.length}
                >
                  <span className="text-lg font-bold tracking-[-0.03em] text-foreground">
                    {partner.mark}
                  </span>
                  <span className="h-6 w-px" />
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Featured projects */}
      <SectionContainer
        eyebrow={homePageContent.featuredProjects.eyebrow}
        title={homePageContent.featuredProjects.title}
        description={homePageContent.featuredProjects.description}
        spacing="flush"
        contentClassName="pb-[var(--theme-layout-section-space)]"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </SectionContainer>

      {/* Featured properties */}
      <SectionContainer
        eyebrow={homePageContent.featuredProperties.eyebrow}
        title={homePageContent.featuredProperties.title}
        description={homePageContent.featuredProperties.description}
        className="bg-surface-muted"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </SectionContainer>

      {/* CTA band */}
      <SectionContainer dark narrow>
        <div className="text-center">
          <h2 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            {homePageContent.ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/60">
            {homePageContent.ctaBand.description}
          </p>
          <Button variant="primaryDark" href={homePageContent.ctaBand.ctaHref} className="mt-8">
            {homePageContent.ctaBand.ctaLabel}
          </Button>
        </div>
      </SectionContainer>
    </>
  );
}
