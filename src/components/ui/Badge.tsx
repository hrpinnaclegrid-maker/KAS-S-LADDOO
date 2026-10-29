"use client";

import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "error" | "neutral" | "outline" | "chakra";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "neutral", size = "md", dot, dotColor, className = "", ...props }, ref) => {
    const variantStyles = {
      primary: "bg-gold-50 text-gold-700 border border-gold-200",
      success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      warning: "bg-amber-50 text-amber-700 border border-amber-200",
      error: "bg-rose-50 text-rose-700 border border-rose-200",
      neutral: "bg-surface-warm text-ink-muted border border-border-mid",
      outline: "bg-transparent text-ink-muted border border-border-mid",
      chakra: "bg-purple-50 text-purple-700 border border-purple-200",
    };

    const sizeStyles = {
      sm: "px-2 py-0.5 text-[10px] gap-1",
      md: "px-2.5 py-1 text-xs gap-1.5",
      lg: "px-3 py-1.5 text-sm gap-2",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-semibold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: dotColor || "currentColor" }}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;