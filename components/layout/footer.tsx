import Link from "next/link";
import {
  contactDetails,
  footerNavigation,
  routes,
  siteConfig,
} from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto max-w-(--theme-layout-content-max) px-5 pt-16 pb-10 sm:px-6 lg:px-8">
        {/* Top row — brand + columns */}
        <div className="grid gap-12 md:grid-cols-[1.6fr_0.7fr_0.9fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-white text-[13px] font-bold tracking-[0.22em] text-foreground uppercase">
                SI
              </span>
              <span className="text-[15px] font-bold tracking-[-0.03em] text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">
              Premium residential properties across Luxembourg — projects,
              apartments, and standalone homes.
            </p>
            <p className="mt-6 text-xs tracking-[0.15em] text-white/25 uppercase">
              Luxembourg Real Estate
            </p>
            <Link
              href={routes.contact}
              className="mt-6 inline-block text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Contact our team →
            </Link>
          </div>

          {/* Navigation column */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={routes.home}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
              Contact
            </p>
            <div className="mt-5 space-y-3 text-sm text-white/55">
              <p className="leading-6">{contactDetails.office}</p>
              <p>
                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.email}
                </a>
              </p>
              <p className="pt-1 text-white/35">{contactDetails.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="divider-dark mt-14" />
        <div className="mt-7 flex flex-col items-start justify-between gap-3 text-[11px] text-white/30 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="tracking-[0.12em] uppercase">Luxembourg</p>
        </div>
      </div>
    </footer>
  );
}
