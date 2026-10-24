"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Sparkles, HeartHandshake, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();

  const tabs = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/philosophy", label: "Wellness", icon: Sparkles },
    { href: "/consult", label: "Consult", icon: HeartHandshake },
    { href: "/founder", label: "Dr. KAS", icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FCFAF6]/98 backdrop-blur-lg border-t border-[#E8DFC9] px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? "text-[#B45309] font-bold scale-105"
                  : "text-[#7C6A53] hover:text-[#27211A]"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-[#B45309]" : ""}`} />
                {tab.href === "/shop" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#1C3D2B] text-amber-300 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#B45309] mt-0.5"></span>
              )}
            </Link>
          );
        })}

        {/* Floating Quick Bag Trigger */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#1C3D2B] font-semibold relative"
          aria-label="Open Cart Bag"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-[#1C3D2B] text-amber-300 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] mt-0.5">Bag</span>
        </button>
      </div>
    </div>
  );
}
