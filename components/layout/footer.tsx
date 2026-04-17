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
      <div className="mx-auto max-w-[var(--theme-layout-content-max)] px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 opacity-60">
              Premium residential properties across Luxembourg. Projects,
              apartments, and standalone homes presented with clarity and
              confidence.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase opacity-50">
              Navigation
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href={routes.home}
                  className="opacity-60 transition-opacity hover:opacity-100"
                >
                  Home
                </Link>
              </li>
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="opacity-60 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase opacity-50">
              Contact
            </p>
            <div className="mt-5 space-y-3 text-sm opacity-60">
              <p>{contactDetails.office}</p>
              <p>{contactDetails.phone}</p>
              <p>{contactDetails.email}</p>
              <p>{contactDetails.hours}</p>
            </div>
          </div>
        </div>
        <hr className="divider-dark mt-12" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs opacity-40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Luxembourg</p>
        </div>
      </div>
    </footer>
  );
}
