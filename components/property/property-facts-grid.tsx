import { cn } from "@/lib/utils";

type FactItem = {
  label: string;
  value: string;
};

type PropertyFactsGridProps = {
  facts: FactItem[];
  dark?: boolean;
};

export function PropertyFactsGrid({ facts, dark = false }: PropertyFactsGridProps) {
  return (
    <dl
      className={cn(
        "grid sm:grid-cols-2 lg:grid-cols-3",
        dark ? "bg-white/5" : "bg-border",
        "gap-px",
      )}
    >
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={cn(
            "p-5",
            dark ? "bg-dark" : "bg-surface",
          )}
        >
          <dt
            className={cn(
              "text-[11px] font-semibold tracking-[0.18em] uppercase",
              dark ? "text-white/50" : "text-muted-foreground",
            )}
          >
            {fact.label}
          </dt>
          <dd
            className={cn(
              "mt-2 font-bold",
              index === 0 ? "text-xl" : "text-base",
              dark ? "text-white" : "text-foreground",
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
