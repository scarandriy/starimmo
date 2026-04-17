import { cn } from "@/lib/utils";
import type { ListingStatus } from "@/types/property";

const statusLabels: Record<ListingStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  "coming-soon": "Coming soon",
};

type StatusBadgeTone = "card" | "heroDark";

type StatusBadgeProps = {
  status?: ListingStatus;
  label?: string;
  tone?: StatusBadgeTone;
  className?: string;
};

const toneStyles: Record<StatusBadgeTone, string> = {
  card: "border-foreground bg-white text-foreground",
  heroDark: "border-white/20 bg-transparent text-white",
};

export function StatusBadge({
  status,
  label,
  tone = "card",
  className,
}: StatusBadgeProps) {
  const badgeLabel = label ?? (status ? statusLabels[status] : "");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-(--theme-radius-button) border px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase",
        toneStyles[tone],
        className,
      )}
    >
      {badgeLabel}
    </span>
  );
}
