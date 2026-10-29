"use client";

import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "dashed" | "gradient";
  label?: string;
  labelPosition?: "left" | "center" | "right";
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", variant = "default", label, labelPosition = "center", className = "", ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={`w-px h-full ${variant === "dashed" ? "bg-dashed" : "bg-border-light"} ${className}`}
          role="separator"
          aria-orientation="vertical"
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div className="flex items-center gap-4 ${className}" role="separator" aria-orientation="horizontal">
          <div className={`flex-1 ${variant === "dashed" ? "border-t-2 border-dashed border-border-mid" : "border-t border-border-light"}`} />
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider whitespace-nowrap">{label}</span>
          <div className={`flex-1 ${variant === "dashed" ? "border-t-2 border-dashed border-border-mid" : "border-t border-border-light"}`} />
        </div>
      );
    }

    const variantStyles = {
      default: "border-t border-border-light",
      dashed: "border-t-2 border-dashed border-border-mid",
      gradient: "border-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent",
    };

    return (
      <hr
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        aria-orientation="horizontal"
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export default Divider;