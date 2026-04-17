"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mainNavigation, routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 text-foreground backdrop-blur">
      <div className="mx-auto flex max-w-(--theme-layout-content-max) items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href={routes.home} className="z-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-foreground text-[15px] font-semibold tracking-[0.2em] uppercase">
            SI
          </span>
          <span className="flex flex-col">
            <span className="text-base font-bold tracking-tight">
              {siteConfig.name}
            </span>
            <span className="hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase lg:block">
              Luxembourg Real Estate
            </span>
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-8 md:flex">
          {mainNavigation.map((item) => {
            const isActive =
              item.href === routes.home
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative  text-sm font-medium transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-foreground after:transition-transform",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="primary"
          size="xs"
          href={routes.contact}
          className="z-10 h-[34px] w-[88px] shrink-0 px-0 text-[11px] whitespace-nowrap"
        >
          Contact
        </Button>
      </div>
    </header>
  );
}
