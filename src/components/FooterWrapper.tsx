"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldAlert, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function FooterWrapper() {
  return (
    <footer className="bg-[#1C3D2B] text-[#FAF5EB] pt-16 pb-20 lg:pb-12 border-t border-[#163324]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Promise Banner */}
        <div className="bg-[#244C37] rounded-3xl p-6 sm:p-10 border border-[#2E5E44] space-y-4">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Our Brand Promise</span>
          </div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            DR. KAS’S — HEALING MIND, BODY & SOUL
          </h3>
          <p className="text-[#D7E5DC] text-sm sm:text-base leading-relaxed max-w-4xl">
            “At Dr. KAS’S, we bring together thoughtfully selected ingredients—including dry fruits and 
            millets in selected recipes—the pleasure of satisfying taste, and a passion for holistic well-being. 
            We believe that caring for ourselves can begin with small, everyday choices, and that wholesome 
            food can make those choices more enjoyable.”
          </p>
          <div className="text-xs font-semibold text-amber-300">
            Wholesome Goodness. Mindful Nutrition. A Healthier Choice for Every Generation.
          </div>
        </div>

        {/* Multipage Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#78350F] flex items-center justify-center text-white font-serif font-bold text-lg">
                KAS
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">DR. KAS’S</span>
                <span className="text-[11px] text-[#A4BEAF] uppercase tracking-wider block">
                  Homemade Laddu Collection
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#BED2C6] leading-relaxed max-w-sm">
              Founded by <strong>Dr. Khan Afroz Shams</strong> (Ph.D. Organizational Psychology, Certified Nutritional Counsellor). 
              Crafting traditional dry fruits, sprouted millets, and ancient seeds that celebrate flavor, nourishment, and inner harmony.
            </p>
          </div>

          {/* Core Navigation */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-widest block">
              Pages
            </span>
            <ul className="space-y-2 text-[#D2E2D8]">
              <li><Link href="/" className="hover:text-amber-300 transition-colors">Home Experience</Link></li>
              <li><Link href="/shop" className="hover:text-amber-300 transition-colors">Shop Laddus</Link></li>
              <li><Link href="/philosophy" className="hover:text-amber-300 transition-colors">Mind, Body & Soul</Link></li>
              <li><Link href="/generational-guide" className="hover:text-amber-300 transition-colors">Generational Guide</Link></li>
              <li><Link href="/founder" className="hover:text-amber-300 transition-colors">Meet Dr. Shams</Link></li>
            </ul>
          </div>

          {/* Direct Services */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-widest block">
              Concierge
            </span>
            <ul className="space-y-2 text-[#D2E2D8]">
              <li><Link href="/consult" className="hover:text-amber-300 transition-colors">Book Consultation</Link></li>
              <li><Link href="/track" className="hover:text-amber-300 transition-colors">Track Your Order</Link></li>
              <li><Link href="/cart" className="hover:text-amber-300 transition-colors">Your Bag</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition-colors">Kitchen Admin Suite</Link></li>
            </ul>
          </div>

          {/* Kitchen Location */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#D2E2D8]">
            <span className="font-bold text-amber-300 uppercase tracking-widest block">
              Kitchen & Contact
            </span>
            <p className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Dr. KAS’S Kitchen, New Delhi & NCR, India</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>care@drkasladdus.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Direct WhatsApp Kitchen Hotline</span>
            </p>
          </div>
        </div>

        {/* Product and Health-Claim Note (Compliant disclosure) */}
        <div className="bg-[#163324] p-5 rounded-2xl border border-[#214733] space-y-2 text-[11px] text-[#A6C0B2] leading-relaxed">
          <div className="flex items-center space-x-2 text-amber-300 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Product and Health-Claim Note</span>
          </div>
          <p>
            The nutritional contribution of each laddu depends on the actual ingredients, recipe, portion size, 
            and preparation method. Before using this profile on packaging or in advertising, verify any use 
            of the term “organic” against applicable certification and labelling requirements, disclose allergens 
            as required, and ensure nutrition claims are supported by the product’s composition. These general 
            statements are not intended to diagnose, treat, or prevent disease. People with specific dietary 
            needs should seek appropriate advice from a qualified healthcare professional.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#265039] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BA897] gap-3">
          <div>
            © 2026 DR. KAS’S Homemade Laddu Collection. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>for Mindful Nutrition & Holistic Living.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
