"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Truck,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop Laddus", highlight: true },
  { href: "/philosophy", label: "Mind, Body & Soul", highlight: false },
  { href: "/generational-guide", label: "Generational Guide", highlight: false },
  { href: "/founder", label: "Meet Dr. Shams", highlight: false },
  { href: "/consult", label: "Book Consultation", highlight: false },
] as const;

export default function GlobalHeader() {
  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Announcement Bar */}
      <div className="bg-forest text-cream text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-forest-muted z-50 relative">
        <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse shrink-0" aria-hidden="true" />
        <span className="truncate">
          Handcrafted in Small Batches with Pure Desi Cow Ghee • Zero Refined Sugar • Free Express Delivery Over ₹1,200
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-[200] bg-cream/95 backdrop-blur-md border-b border-border-light transition-all">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Emblem */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Dr. KAS'S Homepage">
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#C28833] to-[#92400E] flex items-center justify-center text-white font-serif font-bold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
                  <span className="tracking-tighter">KAS</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" aria-hidden="true"></span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-ink-dark group-hover:text-gold-600 transition-colors">
                  DR. KAS'S
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-ink-muted font-semibold">
                  Homemade Laddu Collection
                </span>
                <span className="text-[9px] text-ink-subtle italic hidden sm:inline -mt-0.5">
                  Healing Mind, Body & Soul
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink-muted" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1.5 transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-gold-600 font-bold"
                        : "hover:text-gold-600"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Order Tracking Quick Link */}
              <Link
                href="/track"
                className="hidden md:flex items-center gap-1.5 text-xs font-medium text-ink-light hover:text-gold-600 bg-surface-muted hover:bg-border-mid px-3 py-2 rounded-xl transition-all"
                title="Track order shipment"
              >
                <Truck className="w-3.5 h-3.5 text-gold-600" aria-hidden="true" />
                <span>Track Order</span>
              </Link>

              {/* Admin Console Shortcut */}
              <Link
                href="/admin"
                className="hidden xl:flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-forest-700 bg-white border border-border-mid px-2.5 py-2 rounded-xl transition-colors"
                title="Kitchen Management Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>Admin</span>
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-br from-[#D4AF37] via-[#C28833] to-[#92400E] hover:from-[#C28833] hover:to-[#78350F] text-white px-3.5 sm:px-4 py-2.5 rounded-xl shadow-md transition-all group"
                aria-label={`View shopping bag${cartCount > 0 ? ` with ${cartCount} items` : " (empty)"}`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="bg-forest text-gold-300 text-xs font-bold px-1.5 py-0.5 rounded-full border border-gold-300/40" aria-label={`${cartCount} items in bag`}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-ink-muted hover:text-gold-600 rounded-xl hover:bg-surface-muted transition-colors"
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen / Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-cream border-b border-border-light px-5 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-surface-muted text-gold-600 border-l-4 border-gold-500"
                      : "text-ink-dark hover:bg-surface-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-border-mid grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-surface-muted text-ink-muted font-semibold"
              >
                <Truck className="w-4 h-4 text-gold-600" aria-hidden="true" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-border-mid text-ink-muted font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Kitchen Admin</span>
              </Link>
            </div>

            <Link
              href="/consult"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-forest text-white text-sm font-semibold shadow"
            >
              <HeartHandshake className="w-4 h-4 text-gold-300" aria-hidden="true" />
              <span>Book Consultation with Dr. Shams</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
