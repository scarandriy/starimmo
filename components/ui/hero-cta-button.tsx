import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { theme } from "@/config/theme";
import { cn } from "@/lib/utils";

type HeroCtaButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function HeroCtaButton({
  href,
  className,
  children,
  ...props
}: HeroCtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex self-start items-center justify-center rounded-none bg-primary-foreground px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-10 sm:py-4 sm:text-[12px] lg:px-13 lg:py-9 lg:text-[13px]",
        className,
      )}
      style={{ color: theme.colors.foreground }}
      {...props}
    >
      {children}
    </Link>
  );
}
