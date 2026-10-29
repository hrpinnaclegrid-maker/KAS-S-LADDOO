"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", padding = "md", className = "", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-border-light shadow-sm",
      elevated: "bg-white border border-border-light shadow-lg",
      outlined: "bg-white border-2 border-border-mid shadow-none",
      interactive: "bg-white border border-border-light shadow-sm cursor-pointer hover:shadow-xl hover:border-gold-400/50 transition-all duration-200 active:scale-[0.98]",
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} rounded-2xl ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className = "", ...props }, ref) => (
    <h3 ref={ref} className={`font-serif font-bold text-xl text-ink-dark ${className}`} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className = "", ...props }, ref) => (
    <p ref={ref} className={`text-sm text-ink-muted mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mt-4 pt-4 border-t border-border-light flex items-center gap-3 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export default Card;