import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { aboutPageContent, companyStats, routes } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Starimmo, Luxembourg's trusted name in premium residential real estate.",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      {/* Dark hero */}
      <SectionContainer
        dark
        spacing="compact"
        eyebrow={aboutPageContent.eyebrow}
        title={aboutPageContent.title}
        description={aboutPageContent.description}
      />

      {/* Story + image grid */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-base leading-7 text-muted-foreground sm:text-lg">
            {aboutPageContent.story.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Professional real estate consultation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Modern Luxembourg architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Stats (dark section) */}
      <SectionContainer dark spacing="compact">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Pillars */}
      <SectionContainer
        eyebrow="Our approach"
        title="What sets Starimmo apart"
      >
        <div className="grid gap-px border border-border lg:grid-cols-3">
          {aboutPageContent.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="border-b border-border p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <h3 className="text-xl font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </SectionContainer>

      {/* Quote (dark section) */}
      <SectionContainer dark narrow>
        <div className="text-center">
          <blockquote className="text-3xl font-bold leading-snug text-white sm:text-4xl">
            &ldquo;{aboutPageContent.quote.text}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-white/50">
            &mdash; {aboutPageContent.quote.attribution}
          </p>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer narrow>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Ready to find your property?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Our advisors are available for a no-obligation consultation about
            any property in our portfolio.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={routes.projects}>Browse projects</Button>
            <Button variant="outline" href={routes.contact}>Contact our team</Button>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
