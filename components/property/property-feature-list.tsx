import { cn } from "@/lib/utils";
import type { PropertyFeature } from "@/types/property";

type PropertyFeatureListProps = {
  features: PropertyFeature[];
  dark?: boolean;
};

export function PropertyFeatureList({
  features,
  dark = false,
}: PropertyFeatureListProps) {
  return (
    <ul className="grid gap-px sm:grid-cols-2">
      {features.map((feature) => (
        <li
          key={`${feature.key}-${feature.value}`}
          className={cn(
            "flex items-start gap-3 border-b p-4",
            dark ? "border-white/10" : "border-border",
          )}
        >
          <div className="flex-1">
            <p
              className={cn(
                "text-[11px] font-semibold tracking-[0.15em] uppercase",
                dark ? "opacity-50" : "text-muted-foreground",
              )}
            >
              {feature.label}
            </p>
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                dark ? "text-white" : "text-foreground",
              )}
            >
              {feature.value}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
