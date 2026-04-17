import { cn } from "@/lib/utils";
import type { PropertyFeature, PropertyFeatureCategory } from "@/types/property";

type PropertyFeatureListProps = {
  features: PropertyFeature[];
  dark?: boolean;
};

const categoryLabels: Record<PropertyFeatureCategory, string> = {
  layout: "Layout",
  comfort: "Comfort",
  outdoor: "Outdoor",
  mobility: "Mobility",
  building: "Building",
  efficiency: "Efficiency",
};

export function PropertyFeatureList({
  features,
  dark = false,
}: PropertyFeatureListProps) {
  const grouped = features.reduce<Record<string, PropertyFeature[]>>(
    (acc, feature) => {
      const key = feature.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(feature);
      return acc;
    },
    {},
  );

  const categories = Object.keys(grouped) as PropertyFeatureCategory[];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <p
            className={cn(
              "mb-3 text-[11px] font-semibold tracking-[0.18em] uppercase",
              dark ? "text-white/40" : "text-muted-foreground",
            )}
          >
            {categoryLabels[category]}
          </p>
          <ul
            className={cn(
              "grid gap-px sm:grid-cols-2",
              dark ? "bg-white/5" : "bg-border",
            )}
          >
            {grouped[category].map((feature, index) => (
              <li
                key={`${feature.category}-${feature.key}-${index}`}
                className={cn(
                  "flex items-start gap-3 p-4",
                  dark ? "bg-dark" : "bg-surface",
                )}
              >
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-[11px] font-semibold tracking-[0.18em] uppercase",
                      dark ? "text-white/50" : "text-muted-foreground",
                    )}
                  >
                    {feature.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      dark ? "text-white" : "text-foreground",
                      feature.highlight && "font-bold",
                    )}
                  >
                    {feature.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
