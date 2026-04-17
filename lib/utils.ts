import type { ListingStatus } from "@/types/property";
import { siteConfig } from "@/config/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSurface(value: number) {
  return `${value} m²`;
}

export function formatAddress(parts: string[]) {
  return parts.filter(Boolean).join(", ");
}

export function formatListingStatus(status: ListingStatus) {
  const labels: Record<ListingStatus, string> = {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    "coming-soon": "Coming soon",
  };

  return labels[status];
}
