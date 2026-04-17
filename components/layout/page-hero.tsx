import type { ReactNode } from "react";
import Image from "next/image";
import { ContentContainer, type ContentContainerWidth } from "@/components/layout/content-container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  frame?: "contained" | "containedDesktop" | "full";
  priority?: boolean;
  width?: ContentContainerWidth;
};

export function PageHero({
  imageSrc,
  imageAlt,
  children,
  className,
  contentClassName,
  frame = "full",
  priority = true,
  width = "content",
}: PageHeroProps) {
  const hero = (
    <div className={cn("hero-overlay relative overflow-hidden", className)}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority={priority}
      />
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );

  if (frame === "contained") {
    return (
      <ContentContainer width={width} className="hero-frame">
        {hero}
      </ContentContainer>
    );
  }

  if (frame === "containedDesktop") {
    return <div className="hero-frame-desktop">{hero}</div>;
  }

  return hero;
}
