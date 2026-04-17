import type { CSSProperties } from "react";

export const theme = {
  colors: {
    background: "#ffffff",
    foreground: "#111111",
    surface: "#ffffff",
    surfaceMuted: "#f5f5f5",
    border: "#e5e5e5",
    primary: "#111111",
    primaryForeground: "#ffffff",
    secondary: "#f5f5f5",
    secondaryForeground: "#111111",
    accent: "#111111",
    accentForeground: "#ffffff",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    success: "#16a34a",
    warning: "#ca8a04",
    danger: "#dc2626",
    ring: "#111111",
    dark: "#111111",
    darkForeground: "#ffffff",
  },
  radii: {
    card: "0 rem",
    button: "0 rem",
    input: "0 rem",
  },
  shadows: {
    nav: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    card: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  layout: {
    contentMaxWidth: "110rem",
    narrowMaxWidth: "68rem",
    sectionSpace: "clamp(2.5rem, 5vw, 6rem)",
    sectionSpaceCompact: "clamp(1.5rem, 3vw, 2.75rem)",
    heroFrameSpace: "clamp(1rem, 2vw, 1.5rem)",
  },
} as const;

export const themeStyleVariables = {
  "--theme-color-background": theme.colors.background,
  "--theme-color-foreground": theme.colors.foreground,
  "--theme-color-surface": theme.colors.surface,
  "--theme-color-surface-muted": theme.colors.surfaceMuted,
  "--theme-color-border": theme.colors.border,
  "--theme-color-primary": theme.colors.primary,
  "--theme-color-primary-foreground": theme.colors.primaryForeground,
  "--theme-color-secondary": theme.colors.secondary,
  "--theme-color-secondary-foreground": theme.colors.secondaryForeground,
  "--theme-color-accent": theme.colors.accent,
  "--theme-color-accent-foreground": theme.colors.accentForeground,
  "--theme-color-muted": theme.colors.muted,
  "--theme-color-muted-foreground": theme.colors.mutedForeground,
  "--theme-color-success": theme.colors.success,
  "--theme-color-warning": theme.colors.warning,
  "--theme-color-danger": theme.colors.danger,
  "--theme-color-ring": theme.colors.ring,
  "--theme-color-dark": theme.colors.dark,
  "--theme-color-dark-foreground": theme.colors.darkForeground,
  "--theme-radius-card": theme.radii.card,
  "--theme-radius-button": theme.radii.button,
  "--theme-radius-input": theme.radii.input,
  "--theme-shadow-nav": theme.shadows.nav,
  "--theme-shadow-card": theme.shadows.card,
  "--theme-layout-content-max": theme.layout.contentMaxWidth,
  "--theme-layout-narrow-max": theme.layout.narrowMaxWidth,
  "--theme-layout-section-space": theme.layout.sectionSpace,
  "--theme-layout-section-space-compact": theme.layout.sectionSpaceCompact,
  "--theme-layout-hero-frame-space": theme.layout.heroFrameSpace,
} satisfies Record<string, string>;

export function getThemeStyleVariables(): CSSProperties {
  return themeStyleVariables as CSSProperties;
}
