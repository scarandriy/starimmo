import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { routes } from "@/config/site";

export default function NotFound() {
  return (
    <SectionContainer narrow className="flex min-h-[60vh] items-center">
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          The property or page you are looking for may have been moved or is no
          longer available.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={routes.home}>Return home</Button>
          <Button variant="outline" href={routes.projects}>Browse projects</Button>
        </div>
      </div>
    </SectionContainer>
  );
}
