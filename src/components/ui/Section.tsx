"use client";

import React from "react";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl";
  background?: "none" | "cream" | "cream-warm" | "forest" | "gold" | "gradient-cream" | "gradient-gold";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  narrow?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, size = "lg", background = "none", containerSize, narrow = false, className = "", ...props }, ref) => {
    const sizeStyles = {
      sm: "py-12 sm:py-16",
      md: "py-16 sm:py-20",
      lg: "py-20 sm:py-24 lg:py-28",
      xl: "py-24 sm:py-32 lg:py-36",
    };

    const backgroundStyles = {
      none: "",
      cream: "bg-cream",
      "cream-warm": "bg-cream-warm",
      forest: "bg-forest text-white",
      gold: "bg-gradient-gold text-white",
      "gradient-cream": "bg-gradient-cream",
      "gradient-gold": "bg-gradient-gold",
    };

    return (
      <section
        ref={ref}
        className={`${sizeStyles[size]} ${backgroundStyles[background]} ${narrow ? "max-w-3xl mx-auto" : ""} ${className}`}
        {...props}
      >
        <Container size={containerSize || (narrow ? "sm" : "lg")}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";

export const SectionHeader = ({ 
  label, 
  title, 
  description, 
  align = "center", 
  className = "",
  icon,
}: { 
  label?: string; 
  title: string; 
  description?: string; 
  align?: "left" | "center" | "right"; 
  className?: string;
  icon?: React.ReactNode;
}) => {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const marginStyles = {
    left: "mx-0",
    center: "mx-auto",
    right: "ml-auto mr-0",
  };

  return (
    <div className={`max-w-3xl ${marginStyles[align]} ${alignStyles[align]} ${className}`}>
      {label && (
        <span className="inline-flex items-center gap-1.5 bg-gold-50 text-gold-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          {icon}
          {label}
        </span>
      )}
      <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-ink-dark leading-tight tracking-tight mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-lg sm:text-xl text-ink-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default Section;