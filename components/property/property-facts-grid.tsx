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
    <dl className="grid gap-px sm:grid-cols-2 xl:grid-cols-3">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className={cn(
            "border-b p-5",
            dark
              ? "border-white/10"
              : "border-border",
          )}
        >
          <dt
            className={cn(
              "text-[11px] font-semibold tracking-[0.15em] uppercase",
              dark ? "opacity-50" : "text-muted-foreground",
            )}
          >
            {fact.label}
          </dt>
          <dd
            className={cn(
              "mt-2 text-lg font-bold",
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
