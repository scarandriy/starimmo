import Image from "next/image";
import Link from "next/link";
import { getPropertyHref } from "@/features/properties/catalog";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn, formatCurrency, formatSurface } from "@/lib/utils";
import type { Flat, House } from "@/types/property";

type PropertyCardProps = {
  property: Flat | House;
  className?: string;
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const href = getPropertyHref(property);

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-(--theme-radius-card) border border-border bg-surface transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-16/11 overflow-hidden bg-surface-muted">
        <Image
          src={property.coverImage.src}
          alt={property.coverImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={property.availabilityStatus} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {property.city}
        </p>
        <h3 className="mt-2 text-lg font-bold text-foreground">
          {property.title}
        </h3>
        <p className="mt-3 text-xl font-bold text-foreground">
          {formatCurrency(property.price)}
        </p>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{property.rooms} rooms</span>
          <span>&middot;</span>
          <span>{property.bedrooms} bed</span>
          <span>&middot;</span>
          <span>{property.bathrooms} bath</span>
          <span>&middot;</span>
          <span>{formatSurface(property.surfaceM2)}</span>
        </div>
      </div>
    </Link>
  );
}
