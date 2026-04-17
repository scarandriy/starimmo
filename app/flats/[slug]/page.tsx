import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ContentContainer,
} from "@/components/layout/content-container";
import {
  PageHero,
} from "@/components/layout/page-hero";
import {
  Bath,
  BedDouble,
  Building2,
  Grid2x2,
  PanelsTopLeft,
  Ruler,
  SquareParking,
  SunMedium,
  Zap,
} from "lucide-react";
import { HeroCtaButton } from "@/components/ui/hero-cta-button";
import { SectionContainer } from "@/components/layout/section-container";
import { GalleryCarousel } from "@/components/property/gallery-carousel";
import { PropertyFeatureList } from "@/components/property/property-feature-list";
import { routes } from "@/config/site";
import {
  getFlatBySlug,
  getFlats,
} from "@/features/properties/catalog";
import { buildMetadata } from "@/lib/metadata";
import { formatCurrency } from "@/lib/utils";

type FlatPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getFlats().map((flat) => ({ slug: flat.slug }));
}

export async function generateMetadata({ params }: FlatPageProps) {
  const { slug } = await params;
  const flat = getFlatBySlug(slug);

  if (!flat) {
    return buildMetadata({
      title: "Flat not found",
      path: routes.projects,
    });
  }

  return buildMetadata({
    title: flat.title,
    description: flat.seoDescription,
    path: routes.flat(flat.slug),
    image: flat.coverImage.src,
  });
}

export default async function FlatDetailPage({ params }: FlatPageProps) {
  const { slug } = await params;
  const flat = getFlatBySlug(slug);

  if (!flat) {
    notFound();
  }

  const galleryImages = flat.planImage
    ? [...flat.galleryImages, flat.planImage]
    : flat.galleryImages;
  const editorialImage =
    flat.planImage ?? flat.galleryImages[1] ?? flat.galleryImages[0] ?? flat.coverImage;
  const planImage = flat.planImage ?? editorialImage;
  // Derive proportional room dimensions from the flat's total surface
  const livingM2 = Math.round(flat.surfaceM2 * 0.28);
  const kitchenM2 = Math.round(flat.surfaceM2 * 0.12);
  const bathroomM2 = Math.round(flat.surfaceM2 * 0.07);
  const bedroomM2 = Math.round(
    (flat.surfaceM2 - livingM2 - kitchenM2 - flat.bathrooms * bathroomM2) /
      Math.max(flat.bedrooms, 1),
  );
  const roomDimensions: { room: string; m2: number }[] = [
    { room: "Living room", m2: livingM2 },
    { room: "Kitchen", m2: kitchenM2 },
    ...Array.from({ length: flat.bedrooms }, (_, i) => ({
      room: flat.bedrooms === 1 ? "Bedroom" : `Bedroom ${i + 1}`,
      m2: bedroomM2,
    })),
    ...Array.from({ length: flat.bathrooms }, (_, i) => ({
      room: flat.bathrooms === 1 ? "Bathroom" : `Bathroom ${i + 1}`,
      m2: bathroomM2,
    })),
  ];

  const editorialFacts = [
    { label: "Bedrooms", value: String(flat.bedrooms), icon: BedDouble },
    { label: "Bathrooms", value: String(flat.bathrooms), icon: Bath },
    { label: "Rooms", value: String(flat.rooms), icon: Grid2x2 },
    { label: "Total area", value: `${flat.surfaceM2} m²`, icon: Ruler },
    { label: "Floor", value: String(flat.floor), icon: Building2 },
    { label: "Energy", value: flat.energyClass, icon: Zap },
  ];
  const editorialAmenities = [
    { label: "Parking", value: flat.parking ? "Included" : "Not included", icon: SquareParking },
    { label: "Balcony", value: flat.balcony ? "Included" : "Not included", icon: PanelsTopLeft },
    { label: "Terrace", value: flat.terrace ? "Included" : "Not included", icon: SunMedium },
  ];

  return (
    <>
      {/* Hero with cover image + split info bar */}
      <PageHero
        frame="containedDesktop"
        imageSrc={flat.coverImage.src}
        imageAlt={flat.coverImage.alt}
        className="min-h-[72svh] lg:min-h-[85vh]"
      >
        <div className="flex min-h-[72svh] flex-col justify-end px-5 pb-6 sm:px-6 sm:pb-8 lg:hidden">
          <div className="max-w-[24ch]">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {flat.title}
            </h1>
          </div>
          <HeroCtaButton href={routes.contact} className="mt-6">
            Schedule a visit
          </HeroCtaButton>
        </div>

        <div className="hidden min-h-[85vh] flex-col justify-end pl-12 lg:flex">
          <div>
            <h1 className="max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {flat.title}
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
                    {flat.address}
                    <br />
                    {flat.postcode} {flat.city}
                  </p>
                </div>
                <div className="ml-auto pr-12">
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    Price
                  </p>
                  <p className="mt-2 text-xl font-bold text-foreground">
                    {formatCurrency(flat.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      <ContentContainer className=" bg-white py-4 lg:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                Address
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {flat.address}
                <br />
                {flat.postcode} {flat.city}
              </p>
            </div>
            <div className="min-w-26">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                Price
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                {formatCurrency(flat.price)}
              </p>
            </div>
          </div>
      </ContentContainer>

      {/* Editorial overview section */}
      <SectionContainer>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {flat.projectTitle}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-8 sm:text-base">
              {flat.description}
            </p>

            <div className="relative mt-8 aspect-4/3 w-full overflow-hidden bg-surface-muted lg:hidden">
              <Image
                src={editorialImage.src}
                alt={editorialImage.alt}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-8 flex items-start gap-4 lg:hidden">
              <div className="mt-2 h-px w-10 shrink-0 bg-foreground" />
              <p className="max-w-sm text-sm leading-7 text-foreground">
                This residence combines {flat.bedrooms} bedrooms, {flat.surfaceM2} m²,
                and an {flat.energyClass} energy rating in a calm, city-focused layout.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-1 sm:mt-10 sm:max-w-2xl sm:gap-x-8">
              {editorialFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-border py-4 sm:py-5"
                >
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    {fact.label}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-base font-bold text-foreground sm:text-lg">
                      {fact.value}
                    </p>
                    <fact.icon
                      aria-hidden="true"
                      className="h-[18px] w-[18px] shrink-0 text-foreground"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-1 sm:mt-8 sm:max-w-2xl sm:grid-cols-3 sm:gap-x-8">
              {editorialAmenities.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-border py-4 sm:py-5"
                >
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                    <item.icon
                      aria-hidden="true"
                      className="h-[18px] w-[18px] shrink-0 text-foreground"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-start gap-5">
              <div className="mt-2 h-px w-12 shrink-0 bg-foreground" />
              <p className="max-w-sm text-sm leading-7 text-foreground">
                This residence combines {flat.bedrooms} bedrooms, {flat.surfaceM2} m²,
                and an {flat.energyClass} energy rating in a calm, city-focused layout.
              </p>
            </div>

            <div className="relative mt-10 aspect-4/3 w-full overflow-hidden bg-surface-muted">
              <Image
                src={editorialImage.src}
                alt={editorialImage.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Amenities */}
      <SectionContainer dark spacing="compact">
        <div className="px-0 py-2 text-white lg:px-4">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-white/50 uppercase">
                Amenities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Apartment features
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">
                A concise overview of the comfort, outdoor extensions, and practical
                inclusions available with this residence.
              </p>
            </div>

            <div>
              <div className="flex gap-5 pb-4 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                <span className="border-b-2 border-white pb-2 text-white">
                  Interior details
                </span>
                <span className="pb-2">Exterior details</span>
                <span className="pb-2">Room dimensions</span>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-white/5">
                    <Image
                      src={editorialImage.src}
                      alt={editorialImage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4  pt-4 text-sm">
                    <div>
                      <p className="text-white/45">Surface</p>
                      <p className="mt-1 font-medium text-white">{flat.surfaceM2} m²</p>
                    </div>
                    <div>
                      <p className="text-white/45">Energy</p>
                      <p className="mt-1 font-medium text-white">{flat.energyClass}</p>
                    </div>
                    <div>
                      <p className="text-white/45">Bedrooms</p>
                      <p className="mt-1 font-medium text-white">{flat.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-white/45">Bathrooms</p>
                      <p className="mt-1 font-medium text-white">{flat.bathrooms}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 lg:border-t-0">
                  <PropertyFeatureList features={flat.features} dark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Plan and Room Dimensions */}
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Left – plan image */}
          <div className="relative hidden aspect-4/3 w-full overflow-hidden bg-surface-muted lg:block">
            <Image
              src={planImage.src}
              alt={planImage.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Right – dimensions */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Plan and Room Dimensions
            </h2>

            {/* Floor tab */}
            <div className="mt-6 flex gap-6 sm:mt-8">
              <span className="border-b-2 border-foreground pb-2 text-[11px] font-semibold tracking-[0.15em] text-foreground uppercase">
                Floor {flat.floor}
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              {flat.description}
            </p>

            <div className="relative mt-8 aspect-4/3 w-full overflow-hidden bg-surface-muted lg:hidden">
              <Image
                src={planImage.src}
                alt={planImage.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Dotted room list */}
            <ul className="mt-8 max-w-md ">
              {roomDimensions.map((item) => (
                <li
                  key={item.room}
                  className="flex items-baseline gap-2 py-4"
                >
                  <span className="text-sm text-foreground">{item.room}</span>
                  <span className="flex-1 border-b border-black border-dashed " />
                  <span className="text-sm font-bold text-foreground whitespace-nowrap">
                    {item.m2} m²
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer className="bg-surface-muted">
        <GalleryCarousel images={galleryImages} />
      </SectionContainer>
    </>
  );
}
