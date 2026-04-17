"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNavigation, routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-white/97 text-foreground backdrop-blur-md"
      style={{ boxShadow: "0 1px 0 0 var(--theme-color-border)" }}
    >
      <div className="mx-auto flex max-w-(--theme-layout-content-max) items-center justify-between px-5 py-0 sm:px-6 lg:px-8">
        <Link href={routes.home} className="z-10 flex items-center gap-3 py-4" onClick={() => setMobileOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center bg-foreground text-[13px] font-bold tracking-[0.22em] text-white uppercase">
            SI
          </span>
          <span className="flex flex-col">
            <span className="text-[15px] font-bold tracking-[-0.03em]">
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
                  "relative py-5 text-[13px] font-medium transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px] after:bg-foreground after:transition-transform after:duration-200",
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

        <div className="z-10 flex items-center gap-3">
          <Button
            variant="primary"
            size="xs"
            href={routes.contact}
            className="hidden shrink-0 px-5 text-[11px] tracking-[0.08em] uppercase md:inline-flex"
          >
            Contact us
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto max-w-(--theme-layout-content-max) px-5 py-4 sm:px-6">
            <ul className="space-y-1">
              {mainNavigation.map((item) => {
                const isActive =
                  item.href === routes.home
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-3 text-[15px] font-medium transition-colors border-b border-border last:border-b-0",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 pb-2">
              <Button href={routes.contact} fullWidth onClick={() => setMobileOpen(false)}>
                Contact us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
