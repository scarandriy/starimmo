import { notFound } from "next/navigation";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { GalleryCarousel } from "@/components/property/gallery-carousel";
import { PropertyFactsGrid } from "@/components/property/property-facts-grid";
import { PropertyFeatureList } from "@/components/property/property-feature-list";
import { StatusBadge } from "@/components/ui/status-badge";
import { routes } from "@/config/site";
import {
  getHouseBySlug,
  getHouses,
  getPropertyFacts,
} from "@/features/properties/catalog";
import { buildMetadata } from "@/lib/metadata";
import { formatAddress, formatCurrency } from "@/lib/utils";

type HousePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getHouses().map((house) => ({ slug: house.slug }));
}

export async function generateMetadata({ params }: HousePageProps) {
  const { slug } = await params;
  const house = getHouseBySlug(slug);

  if (!house) {
    return buildMetadata({
      title: "House not found",
      path: routes.projects,
    });
  }

  return buildMetadata({
    title: house.title,
    description: house.seoDescription,
    path: routes.house(house.slug),
    image: house.coverImage.src,
  });
}

export default async function HouseDetailPage({ params }: HousePageProps) {
  const { slug } = await params;
  const house = getHouseBySlug(slug);

  if (!house) {
    notFound();
  }

  return (
    <>
      {/* Hero with cover image */}
      <PageHero
        imageSrc={house.coverImage.src}
        imageAlt={house.coverImage.alt}
        className="flex min-h-[55vh] items-end"
      >
        <ContentContainer className="pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60">
              House
            </p>
            <StatusBadge
              status={house.availabilityStatus}
              tone="heroDark"
            />
          </div>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            {house.title}
          </h1>
          <p className="mt-3 text-2xl font-bold text-white">
            {formatCurrency(house.price)}
          </p>
        </ContentContainer>
      </PageHero>

      {/* Content + sidebar */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {house.description}
            </p>
            <hr className="divider mt-8" />
            <div className="mt-8">
              <PropertyFactsGrid facts={getPropertyFacts(house)} />
            </div>
          </div>
          <aside className="rounded-(--theme-radius-card) border border-border bg-surface-muted p-6">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Key details
            </p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-foreground">
              <p>{formatAddress([house.address, house.postcode, house.city])}</p>
              <hr className="divider" />
              <p>Land area: {house.landSurfaceM2} m²</p>
              <p>Energy class: {house.energyClass}</p>
              <p>Garage: {house.garage ? "Yes" : "No"}</p>
              <p>Garden: {house.garden ? "Yes" : "No"}</p>
            </div>
            <Button href={routes.contact} fullWidth className="mt-6">
              Enquire about this house
            </Button>
          </aside>
        </div>
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer className="bg-surface-muted">
        <GalleryCarousel images={house.galleryImages} />
      </SectionContainer>

      {/* Features (dark section) */}
      <SectionContainer
        dark
        eyebrow="Amenities"
        title="Property features"
      >
        <PropertyFeatureList features={house.features} dark />
      </SectionContainer>
    </>
  );
}
