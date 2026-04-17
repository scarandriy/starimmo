import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentContainerWidth = "content" | "narrow";

type ContentContainerProps = {
  children: ReactNode;
  className?: string;
  width?: ContentContainerWidth;
};

export function ContentContainer({
  children,
  className,
  width = "content",
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        width === "narrow"
          ? "max-w-(--theme-layout-narrow-max)"
          : "max-w-(--theme-layout-content-max)",
        className,
      )}
    >
      {children}
    </div>
  );
}
