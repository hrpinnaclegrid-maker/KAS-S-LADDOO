"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";

export default function InteractiveChakraWheel() {
  const { addToCart } = useCart();
  const [selectedChakraIndex, setSelectedChakraIndex] = useState(0);

  const chakraData = [
    {
      name: "Muladhara (Root Chakra)",
      symbol: "🔴",
      color: "#DC2626",
      theme: "Grounded Strength & Bone Stability",
      element: "Earth / Bone Mineralization",
      productId: "kas-millet-ragi-gond",
      shortInsight: "Sprouted Ragi and Babool Gond provide deep structural nourishment, calcium, and physical stability."
    },
    {
      name: "Svadhisthana (Sacral Chakra)",
      symbol: "🟠",
      color: "#EA580C",
      theme: "Creative Vitality & Fluid Nourishment",
      element: "Water / Sensual Joy",
      productId: "kas-dryfruit-cashew-anjeer",
      shortInsight: "Sun-dried Anjeer and Golden Cashews awaken gut motility, natural iron, and gentle sweet contentment."
    },
    {
      name: "Manipura (Solar Plexus)",
      symbol: "🟡",
      color: "#D97706",
      theme: "Agni (Digestive Fire) & Inner Drive",
      element: "Fire / Metabolic Power",
      productId: "kas-dryfruit-almond-date",
      shortInsight: "California Mamra almonds and Arabian dates fuel steady willpower, metabolic stamina, and sustained energy."
    },
    {
      name: "Anahata (Heart Chakra)",
      symbol: "🟢",
      color: "#059669",
      theme: "Compassion, Peace & Light Balance",
      element: "Air / Emotional Center",
      productId: "kas-millet-jowar-cardamom",
      shortInsight: "Light gluten-free Jowar and Idukki green cardamom soothe the heart, digestion, and emotional equilibrium."
    },
    {
      name: "Vishuddha (Throat Chakra)",
      symbol: "🔵",
      color: "#0284C7",
      theme: "Authentic Vitality & Clear Expression",
      element: "Space / Metabolic Harmony",
      productId: "kas-specialty-seven-seed",
      shortInsight: "Seven botanical power seeds supply high zinc, magnesium, and plant lignans for pure cellular flow."
    },
    {
      name: "Ajna (Third Eye)",
      symbol: "🟣",
      color: "#6366F1",
      theme: "Clarity, Wisdom & Mindful Focus",
      element: "Light / Cognitive Insight",
      productId: "kas-dryfruit-pista-walnut",
      shortInsight: "Kashmiri walnuts packed with natural Omega-3 and green pistachios nourish cognitive memory and mental clarity."
    },
    {
      name: "Sahasrara (Crown / Wholeness)",
      symbol: "✨",
      color: "#8B5CF6",
      theme: "Universal Harmony & Holistic Integration",
      element: "Cosmic Consciousness / Mind-Body-Soul",
      productId: "kas-gift-chakra-harmony-trio",
      shortInsight: "The complete Chakra Harmony Trio brings together Mind, Body, and Soul into one balanced, beautiful celebration."
    }
  ];

  const current = chakraData[selectedChakraIndex];
  const matchedProduct = initialProducts.find((p) => p.id === current.productId) || initialProducts[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Chakra Energy & Nutritional Psychology</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
          The 7-Chakra Wellness Resonance
        </h3>
        <p className="text-xs sm:text-sm text-[#6B5A47]">
          Tap each subtle energy center to see how traditional dry fruits and millets align with physical vitality and inner harmony.
        </p>
      </div>

      {/* Chakra Interactive Selector Tabs */}
      <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 border-b border-[#EFE8D8]">
        {chakraData.map((chk, idx) => {
          const isSelected = selectedChakraIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedChakraIndex(idx)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-[#27211A] text-white border-[#27211A] shadow-md scale-105"
                  : "bg-[#FAF6EE] text-[#5C4D3D] border-[#E8DEC7] hover:bg-[#F0E6D5]"
              }`}
            >
              <span>{chk.symbol}</span>
              <span>{chk.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Chakra Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border border-[#EAE0CD]">
        {/* Left Column: Chakra & Nutritional Philosophy */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{current.symbol}</span>
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block"
                style={{ backgroundColor: `${current.color}15`, color: current.color }}
              >
                {current.element}
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#27211A] mt-1">
                {current.name}
              </h4>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DFC9] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#7C6A53] tracking-wider block">
              Core Wellness Theme:
            </span>
            <p className="text-sm font-semibold text-[#1C3D2B]">{current.theme}</p>
            <p className="text-xs text-[#5C4D3D] leading-relaxed pt-1">{current.shortInsight}</p>
          </div>

          <p className="text-xs text-[#7C6A53] italic">
            “Inspired by traditional symbolism, we invite people to see mindful food choices as a conscious pause to honor self-care.”
          </p>
        </div>

        {/* Right Column: Matched Laddu Product Card */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E5DAC6] shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                {matchedProduct.categoryLabel}
              </span>
              <h5 className="font-serif font-bold text-base text-[#27211A] mt-1">
                {matchedProduct.name}
              </h5>
              <span className="text-xs text-[#1C3D2B] font-medium block">{matchedProduct.tagline}</span>
            </div>
            <span className="text-sm font-bold text-[#B45309]">₹{matchedProduct.price}</span>
          </div>

          <p className="text-xs text-[#5C4D3D] line-clamp-2">{matchedProduct.description}</p>

          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => addToCart(matchedProduct)}
              className="flex-1 flex items-center justify-center space-x-1.5 bg-[#B45309] hover:bg-[#92400E] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
            <Link
              href={`/shop/${matchedProduct.id}`}
              className="px-3.5 py-2.5 rounded-xl border border-[#DACFBB] text-[#3D3328] hover:bg-[#FAF6EE] text-xs font-semibold"
            >
              Explore Recipe →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
