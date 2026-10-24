"use client";

import React from "react";
import { Sparkles, Heart, Shield, ArrowRight, Sun, Award, Coffee } from "lucide-react";

interface HeroSectionProps {
  onExploreProducts: () => void;
  onBookConsultation: () => void;
}

export default function HeroSection({ onExploreProducts, onBookConsultation }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EE] via-[#F6EFE2] to-[#FAF6EE] py-16 lg:py-24 border-b border-[#E8DFC9]">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-900 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
              <span>A Wellness-Inspired Brand by Dr. Khan Afroz Shams</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#27211A] leading-[1.15] tracking-tight">
                Healing Mind,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#C28833]">
                  Body & Soul
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-[#1C3D2B] font-medium tracking-wide">
                Nourishing the Body. Nurturing the Mind. Inspiring Inner Harmony.
              </p>
            </div>

            <p className="text-[#5C4D3D] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong className="text-[#2D261E]">Dr. KAS’S Homemade Laddu Collection</strong>. 
              We bring together the traditional goodness of premium dry fruits, nutrient-dense millets, 
              and pure cow ghee—grounded in nutritional psychology and mindful snacking habits for every generation.
            </p>

            {/* Core Values Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <span className="inline-flex items-center space-x-1.5 bg-white border border-[#E3D7C1] text-[#3D3328] px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Dry Fruits & Millet Laddus</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white border border-[#E3D7C1] text-[#3D3328] px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>Nutritional Psychology</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white border border-[#E3D7C1] text-[#3D3328] px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Chakra Harmony</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white border border-[#E3D7C1] text-[#3D3328] px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>Zero Refined Sugar Options</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-[#C28833] to-[#996515] hover:from-[#B37825] hover:to-[#7A500D] text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore Laddu Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBookConsultation}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-[#F5ECE0] text-[#1C3D2B] border-2 border-[#1C3D2B]/20 hover:border-[#1C3D2B] px-6 py-3.5 rounded-xl font-semibold text-base transition-colors"
              >
                <span>Nutritional Consultation</span>
              </button>
            </div>

            {/* Trust Quote */}
            <div className="pt-2 text-xs italic text-[#7C6A53]">
              “A Healthier Generation Begins with Better Choices.” — Dr. Khan Afroz Shams
            </div>
          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white/90 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8DEC9] space-y-6">
              {/* Top Accent Badge */}
              <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D261E] uppercase tracking-wider">
                      Handcrafted Fresh
                    </div>
                    <div className="text-[11px] text-[#7C6A53]">Made with Desi Cow Ghee</div>
                  </div>
                </div>
                <span className="bg-[#1C3D2B] text-amber-200 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  100% Homemade
                </span>
              </div>

              {/* Visual Laddu Highlight Box */}
              <div className="bg-gradient-to-br from-[#FAF5EB] to-[#F1E5D2] rounded-2xl p-5 border border-[#E6D9C3] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded">
                      Featured Specialty
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#27211A] mt-1.5">
                      Signature Chakra Harmony Trio Box
                    </h3>
                    <p className="text-xs text-[#5C4D3D] mt-1">
                      Dry Fruit Almond-Date • Sprouted Ragi Babool Gond • Seven Botanical Seeds
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8A7966] line-through">₹999</span>
                    <div className="text-xl font-bold text-[#B45309]">₹890</div>
                  </div>
                </div>

                {/* Micro Nutrients Grid */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#E8DCBF]">
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-[10px] text-[#7C6A53] uppercase font-bold">Sweetener</div>
                    <div className="text-xs font-semibold text-[#1C3D2B] mt-0.5">Dates & Gur</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-[10px] text-[#7C6A53] uppercase font-bold">Calcium</div>
                    <div className="text-xs font-semibold text-[#1C3D2B] mt-0.5">High Bio-avail</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-[10px] text-[#7C6A53] uppercase font-bold">Good Fats</div>
                    <div className="text-xs font-semibold text-[#1C3D2B] mt-0.5">Omega 3 & 6</div>
                  </div>
                </div>
              </div>

              {/* Founder Credential Micro Badge */}
              <div className="flex items-center space-x-3 bg-[#FAF6EE] p-3.5 rounded-xl border border-[#E8DFC9]">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0 shadow-sm bg-white">
                  <img
                    src="/dr-afroz.jpeg"
                    alt="Dr. Khan Afroz Shams"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#2D261E]">Dr. Khan Afroz Shams</div>
                  <div className="text-[#6B5B49] text-[11px]">
                    Organizational Psychology & Certified Nutritional Counsellor
                  </div>
                </div>
              </div>

              {/* Fast Perks */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#524436] font-medium pt-1">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>No Artificial Flavors</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Heart className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Mindful Satiety</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
