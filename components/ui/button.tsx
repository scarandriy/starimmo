import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";

type ButtonVariant = "primary" | "outline" | "primaryDark" | "outlineDark";
type ButtonSize = "default" | "sm" | "xs";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | "href">;

type ButtonAsButton = SharedProps & {
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<
  ButtonVariant,
  { className: string; color: string }
> = {
  primary: {
    className: "bg-primary",
    color: theme.colors.primaryForeground,
  },
  outline: {
    className: "border border-border",
    color: theme.colors.foreground,
  },
  primaryDark: {
    className: "bg-white",
    color: theme.colors.foreground,
  },
  outlineDark: {
    className: "border border-white/40",
    color: "#ffffff",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-sm font-semibold",
  sm: "px-5 py-2.5 text-sm font-medium",
  xs: "px-4 py-2 text-sm font-medium",
};

export function Button({
  variant = "primary",
  size = "default",
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const v = variantStyles[variant];

  const classes = cn(
    "inline-flex items-center justify-center rounded-[var(--theme-radius-button)] transition-opacity hover:opacity-85",
    sizeStyles[size],
    v.className,
    fullWidth && "w-full",
    className,
  );

  const inlineStyle = { color: v.color };

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} style={inlineStyle} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  return (
    <button className={classes} style={inlineStyle} {...buttonProps}>
      {children}
    </button>
  );
}
