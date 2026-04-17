# Code Templates

## 1. API Route Template

Use this shape for future route handlers:

```ts
import { NextResponse } from "next/server";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export async function GET() {
  try {
    const data = [];

    return NextResponse.json<ApiSuccess<unknown[]>>({
      success: true,
      data,
    });
  } catch (error) {
    console.error("api.projects.list_failed", error);

    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to fetch projects.",
        },
      },
      { status: 500 },
    );
  }
}
```

## 2. Feature Query Template

Keep data lookup behind a feature-level query module:

```ts
import { projects } from "@/features/properties/data/mock-properties";

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
```

## 3. Server Page Template

```tsx
import { buildMetadata } from "@/lib/metadata";
import { SectionContainer } from "@/components/layout/section-container";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Browse current Starimmo developments.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <SectionContainer
      eyebrow="Portfolio"
      title="Projects designed for long-term confidence."
      description="Placeholder content will later be replaced by live data."
    >
      <div>Page content</div>
    </SectionContainer>
  );
}
```

## 4. Compact Band Template

Use a compact section when a block needs shared alignment but lighter vertical rhythm:

```tsx
import { SectionContainer } from "@/components/layout/section-container";

export function PartnersBand() {
  return (
    <SectionContainer spacing="compact">
      <div className="flex flex-col gap-6">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          Partners
        </p>
        <div>Band content</div>
      </div>
    </SectionContainer>
  );
}
```

## 5. Hero Template

Use shared hero primitives for image-led headers:

```tsx
import { PageHero } from "@/components/layout/page-hero";
import { ContentContainer } from "@/components/layout/content-container";

export function MarketingHero() {
  return (
    <PageHero
      frame="contained"
      imageSrc="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
      imageAlt="Modern residence interior"
      className="min-h-[85vh]"
      contentClassName="flex min-h-[85vh] flex-col justify-end"
    >
      <ContentContainer className="pb-12">
        <h1 className="max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Hero title
        </h1>
      </ContentContainer>
    </PageHero>
  );
}
```

## 6. Dynamic Route Template

```tsx
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/features/properties/catalog";

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <div>{project.title}</div>;
}
```

## 7. Reusable Component Template

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className }: CardProps) {
  return (
    <section className={cn("rounded-3xl border border-border bg-surface p-6", className)}>
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}
```

## 8. Client Component Template

Use a client component only when required:

```tsx
"use client";

import { useState } from "react";

type ToggleProps = {
  items: string[];
};

export function ToggleList({ items }: ToggleProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {items.map((item, index) => (
        <button key={item} onClick={() => setActiveIndex(index)}>
          {item}
        </button>
      ))}
      <p>{items[activeIndex]}</p>
    </div>
  );
}
```

## 9. Theme Usage Template

```tsx
import { theme } from "@/config/theme";

export function ThemeNote() {
  return (
    <div
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}
    >
      Centralized theme values should flow into CSS variables and semantic classes.
    </div>
  );
}
```
