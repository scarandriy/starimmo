import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ListingImage } from "@/types/property";

type GalleryCarouselProps = {
  images: ListingImage[];
  className?: string;
};

export function GalleryCarousel({ images, className }: GalleryCarouselProps) {
  return (
    <div className={cn("grid gap-2 md:grid-cols-2 lg:grid-cols-3", className)}>
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className={cn(
            "group relative overflow-hidden bg-surface-muted",
            index === 0 ? "md:col-span-2 md:row-span-2" : "",
          )}
        >
          <div
            className={cn(
              index === 0 ? "aspect-[16/10]" : "aspect-[4/3]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority={index === 0}
              sizes={
                index === 0
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              }
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
