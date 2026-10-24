"use client";

import React, { useState } from "react";
import { ShoppingBag, Search, Sparkles, Heart, Menu, X, Calendar, ShieldCheck, Truck } from "lucide-react";
import { CartItem } from "@/types";

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  cart,
  onOpenCart,
  onOpenTrackOrder,
  onOpenConsultation,
  onOpenAdmin
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#1C3D2B] text-[#FAF5EB] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Handcrafted in Fresh Small Batches • Zero Artificial Preservatives • Mindful Nutrition by Dr. Khan Afroz Shams</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C28833] via-[#E2A748] to-[#996515] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">KAS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#2D261E] group-hover:text-[#C28833] transition-colors">
                DR. KAS’S
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7C6A53] font-semibold">
                Homemade Laddu Collection
              </span>
              <span className="text-[9px] text-[#A38A6B] italic hidden sm:inline">
                Healing Mind, Body & Soul
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#4A3E31]">
            <a
              href="#products"
              className="hover:text-[#C28833] transition-colors py-1 hover:border-b-2 hover:border-[#C28833]"
            >
              Laddus & Shop
            </a>
            <a
              href="#philosophy"
              className="hover:text-[#C28833] transition-colors py-1 hover:border-b-2 hover:border-[#C28833]"
            >
              Our Philosophy
            </a>
            <a
              href="#generational"
              className="hover:text-[#C28833] transition-colors py-1 hover:border-b-2 hover:border-[#C28833]"
            >
              Nutrition For Generations
            </a>
            <a
              href="#founder"
              className="hover:text-[#C28833] transition-colors py-1 hover:border-b-2 hover:border-[#C28833]"
            >
              Meet The Founder
            </a>
            <button
              onClick={onOpenConsultation}
              className="flex items-center space-x-1.5 text-[#1C3D2B] bg-[#E8F0EA] px-3 py-1.5 rounded-full hover:bg-[#D5E3D8] transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#1C3D2B]" />
              <span>Book Consultation</span>
            </button>
          </nav>

          {/* Actions: Track, Admin, Cart */}
          <div className="flex items-center space-x-3">
            {/* Track Order Button */}
            <button
              onClick={onOpenTrackOrder}
              className="hidden sm:flex items-center space-x-1 text-xs font-medium text-[#5A4A39] hover:text-[#C28833] bg-[#F2EDE2] hover:bg-[#EAE2D3] px-3 py-2 rounded-lg transition-colors"
              title="Track your order status"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden md:flex items-center space-x-1 text-xs font-medium text-[#7C6A53] hover:text-[#1C3D2B] bg-white border border-[#E0D5C1] px-2.5 py-2 rounded-lg hover:border-[#C28833] transition-colors"
              title="Kitchen & Order Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C28833]" />
              <span>Admin</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-[#C28833] to-[#B37825] hover:from-[#B37825] hover:to-[#996515] text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold text-sm hidden sm:inline">Bag</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1C3D2B] text-amber-300 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A3E31] hover:text-[#C28833] rounded-lg hover:bg-[#F2EDE2]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF6] border-b border-[#E8DEC8] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#3A3026] hover:bg-[#F3ECE1]"
          >
            Laddus & Shop
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#3A3026] hover:bg-[#F3ECE1]"
          >
            Our Philosophy
          </a>
          <a
            href="#generational"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#3A3026] hover:bg-[#F3ECE1]"
          >
            Nutrition For Generations
          </a>
          <a
            href="#founder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#3A3026] hover:bg-[#F3ECE1]"
          >
            Meet The Founder
          </a>
          <div className="pt-2 border-t border-[#E8DEC8] flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-[#1C3D2B] text-white text-sm font-medium"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Nutritional Consultation</span>
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackOrder();
                }}
                className="flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-[#F2EDE2] text-[#4A3E31] text-xs font-medium"
              >
                <Truck className="w-4 h-4 text-[#C28833]" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center space-x-1.5 py-2 rounded-lg border border-[#DACFBB] text-[#4A3E31] text-xs font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-[#1C3D2B]" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
