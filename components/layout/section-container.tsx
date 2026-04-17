import type { ReactNode } from "react";
import {
  ContentContainer,
  type ContentContainerWidth,
} from "@/components/layout/content-container";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  narrow?: boolean;
  dark?: boolean;
  id?: string;
  spacing?: "default" | "compact" | "flush";
  width?: ContentContainerWidth;
};

export function SectionContainer({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
  headerClassName,
  narrow = false,
  dark = false,
  id,
  spacing = "default",
  width,
}: SectionContainerProps) {
  const hasHeader = Boolean(eyebrow || title || description);
  const resolvedWidth = width ?? (narrow ? "narrow" : "content");
  const spacingClassName =
    spacing === "compact"
      ? "section-space-compact"
      : spacing === "flush"
        ? ""
        : "section-space";

  return (
    <section id={id} className={cn(spacingClassName, dark && "section-dark", className)}>
      <ContentContainer width={resolvedWidth} className={contentClassName}>
        {hasHeader && (
          <header className={cn("max-w-3xl", headerClassName)}>
            {eyebrow && (
              <p
                className={cn(
                  "text-xs font-semibold tracking-[0.15em] uppercase",
                  dark ? "opacity-50" : "text-muted-foreground",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-3 text-balance text-3xl font-bold sm:text-4xl",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base leading-7 sm:text-lg",
                  dark ? "opacity-60" : "text-muted-foreground",
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children ? (
          <div className={cn(hasHeader ? "mt-6 sm:mt-10" : "", "w-full")}>
            {children}
          </div>
        ) : null}
      </ContentContainer>
    </section>
  );
}
