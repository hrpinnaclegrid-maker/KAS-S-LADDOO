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
  Compass,
  ArrowRight,
  Flame
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function GlobalHeader() {
  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/shop", label: "Shop Laddus", highlight: true },
    { href: "/philosophy", label: "Mind, Body & Soul" },
    { href: "/generational-guide", label: "Generational Guide" },
    { href: "/founder", label: "Meet Dr. Shams" },
    { href: "/consult", label: "Book Consultation" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#142E20] via-[#1C3D2B] to-[#142E20] text-[#FAF5EB] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2 border-b border-[#28523A] z-50 relative">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span className="truncate">
          Handcrafted in Small Batches with Pure Desi Cow Ghee • Zero Refined Sugar • Free Express Delivery Over ₹1,200
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#E8DFC9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Emblem */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#D97706] via-[#B45309] to-[#78350F] flex items-center justify-center text-white font-serif font-bold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
                  <span className="tracking-tighter">KAS</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#241E17] group-hover:text-[#B45309] transition-colors">
                  DR. KAS’S
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7C6A53] font-semibold">
                  Homemade Laddu Collection
                </span>
                <span className="text-[9px] text-[#9E8669] italic hidden sm:inline -mt-0.5">
                  Healing Mind, Body & Soul
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#4A3E31]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1.5 transition-colors flex items-center space-x-1.5 ${
                      isActive
                        ? "text-[#B45309] font-bold"
                        : "hover:text-[#B45309]"
                    }`}
                  >
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]"></span>
                    )}
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B45309] rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              {/* Order Tracking Quick Link */}
              <Link
                href="/track"
                className="hidden md:flex items-center space-x-1.5 text-xs font-medium text-[#5A4A39] hover:text-[#B45309] bg-[#F4EEE2] hover:bg-[#EAE1D1] px-3 py-2 rounded-xl transition-all"
                title="Track order shipment"
              >
                <Truck className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Track Order</span>
              </Link>

              {/* Admin Console Shortcut */}
              <Link
                href="/admin"
                className="hidden xl:flex items-center space-x-1 text-xs font-medium text-[#7C6A53] hover:text-[#1C3D2B] bg-white border border-[#E3D8C4] px-2.5 py-2 rounded-xl transition-colors"
                title="Kitchen Management Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Admin</span>
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center space-x-2 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white px-3.5 sm:px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all group"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="bg-[#1C3D2B] text-amber-300 text-xs font-bold px-1.5 py-0.5 rounded-full border border-amber-300/40">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#4A3E31] hover:text-[#B45309] rounded-xl hover:bg-[#F2EDE2] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen / Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FCFAF6] border-b border-[#E8DFC9] px-5 pt-3 pb-6 space-y-4 animate-fadeIn shadow-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-[#FAF2E3] text-[#B45309] border-l-4 border-[#B45309]"
                      : "text-[#3D3328] hover:bg-[#F4EEE2]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE0CD] grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-1.5 py-3 rounded-xl bg-[#F4EEE2] text-[#4A3E31] font-semibold"
              >
                <Truck className="w-4 h-4 text-[#B45309]" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-1.5 py-3 rounded-xl border border-[#E3D8C4] text-[#4A3E31] font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Kitchen Admin</span>
              </Link>
            </div>

            <Link
              href="/consult"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#1C3D2B] text-white text-sm font-semibold shadow"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Book Consultation with Dr. Shams</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
