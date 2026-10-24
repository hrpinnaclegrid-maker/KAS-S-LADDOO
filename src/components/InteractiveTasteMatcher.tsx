"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Check, ShoppingBag, Flame, Zap } from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveTasteMatcher() {
  const { addToCart } = useCart();
  const [selectedGoal, setSelectedGoal] = useState<string>("energy");
  const [selectedSweetener, setSelectedSweetener] = useState<string>("zero-sugar");
  const [matchedProductId, setMatchedProductId] = useState<string>("kas-dryfruit-almond-date");
  const [added, setAdded] = useState(false);

  const goals = [
    { id: "energy", label: "⚡ Sustained Daily Energy", desc: "For busy workdays & active vitality", tag: "Natural Energy" },
    { id: "brain", label: "🧠 Focus & Mental Clarity", desc: "Omega-3 rich nuts for cognitive flow", tag: "Brain Fuel" },
    { id: "bones", label: "🦴 Bone & Joint Strength", desc: "Sprouted ragi & traditional babool gond", tag: "High Calcium" },
    { id: "digestion", label: "🌿 Light & Easy Digestion", desc: "Gentle spices, fiber & soothing seeds", tag: "Gentle Gut" },
    { id: "superseeds", label: "✨ Superseed Micronutrients", desc: "Zinc, magnesium & pure botanical balance", tag: "Micronutrients" }
  ];

  const sweeteners = [
    { id: "zero-sugar", label: "100% Arabian Dates / Figs (Zero White Sugar)" },
    { id: "organic-gur", label: "Traditional Kolhapuri Jaggery" },
    { id: "any", label: "Chef's Choice (Pure Natural)" }
  ];

  // Auto calculate whenever selection changes
  useEffect(() => {
    let resultId = "kas-dryfruit-almond-date";
    if (selectedGoal === "brain") {
      resultId = "kas-dryfruit-pista-walnut";
    } else if (selectedGoal === "bones") {
      resultId = "kas-millet-ragi-gond";
    } else if (selectedGoal === "digestion") {
      resultId = selectedSweetener === "zero-sugar" ? "kas-dryfruit-cashew-anjeer" : "kas-specialty-besan-methi";
    } else if (selectedGoal === "superseeds") {
      resultId = "kas-specialty-seven-seed";
    } else {
      resultId = selectedSweetener === "organic-gur" ? "kas-millet-bajra-til" : "kas-dryfruit-almond-date";
    }
    setMatchedProductId(resultId);
    setAdded(false);
  }, [selectedGoal, selectedSweetener]);

  const matchedProduct = initialProducts.find((p) => p.id === matchedProductId) || initialProducts[0];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#10B981", "#F59E0B", "#B45309"]
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleQuickAdd = () => {
    addToCart(matchedProduct);
    setAdded(true);
    triggerConfetti();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div id="taste-matcher" className="bg-gradient-to-br from-[#163625] via-[#10291C] to-[#0A1D13] text-white rounded-3xl p-6 sm:p-12 border border-[#2B573D] shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-300/30 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Interactive 30-Second Taste Matcher</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF5EB] tracking-tight">
          Find Your Perfect Wellness Laddu
        </h3>
        <p className="text-xs sm:text-sm text-[#C8DBD0] max-w-lg mx-auto">
          Tap your daily wellness priority and sweet preference. Watch your recipe pair live with 1-click ordering.
        </p>
      </div>

      {/* Interactive Selector & Instant Match Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Goal */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              1. What does your day need most?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {goals.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <motion.button
                    key={g.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedGoal(g.id);
                      triggerConfetti();
                    }}
                    className={`text-left p-3.5 rounded-2xl border text-xs transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-[#1C3D2B] font-bold border-amber-300 shadow-lg scale-[1.02]"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    }`}
                  >
                    <div className="font-bold text-xs">{g.label}</div>
                    <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? "text-[#1C3D2B]/85" : "text-[#A8C4B3]"}`}>
                      {g.desc}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sweetener */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              2. Your preferred natural sweetener:
            </span>
            <div className="flex flex-wrap gap-2">
              {sweeteners.map((s) => {
                const isSelected = selectedSweetener === s.id;
                return (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSweetener(s.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-amber-300 text-[#1C3D2B] shadow-md font-bold scale-[1.02]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-[#E0EFE6]"
                    }`}
                  >
                    {s.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Instant Match Reveal Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={matchedProduct.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-7 text-[#241E17] border-2 border-amber-400/50 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Your Perfect Match</span>
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  100% Homemade
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-xl text-[#27211A] leading-snug">
                  {matchedProduct.name}
                </h4>
                <p className="text-xs text-[#1C3D2B] font-semibold mt-0.5">
                  {matchedProduct.tagline}
                </p>
              </div>

              <p className="text-xs text-[#5C4D3D] leading-relaxed line-clamp-3">
                {matchedProduct.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {matchedProduct.badges.slice(0, 3).map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-[#FAF6EE] text-[#4A3E31] px-2 py-0.5 rounded border border-[#E9DFC8]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Macro & Sweetener strip */}
              <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#EAE0CD] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#7C6A53] uppercase block font-bold">Calories</span>
                  <span className="font-bold text-[#2D261E]">~{matchedProduct.nutrition.caloriesApprox} kcal</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#7C6A53] uppercase block font-bold">Protein</span>
                  <span className="font-bold text-[#2D261E]">{matchedProduct.nutrition.proteinG}g</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#7C6A53] uppercase block font-bold">Sweetener</span>
                  <span className="font-bold text-[#1C3D2B] truncate block text-[10px]">
                    {matchedProduct.nutrition.sweetenerType.includes("Zero") ? "Zero Sugar" : "Gur / Dates"}
                  </span>
                </div>
              </div>

              {/* Action Row */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#EFE8D8]">
                <div>
                  <span className="text-[10px] text-[#7C6A53] block font-semibold">{matchedProduct.weight}</span>
                  <div className="text-2xl font-serif font-bold text-[#B45309]">₹{matchedProduct.price}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/shop/${matchedProduct.id}`}
                    className="p-2.5 rounded-xl border border-[#DACFBB] text-[#4A3E31] text-xs font-semibold hover:bg-[#FAF6EE] transition-colors"
                    title="View recipe details"
                  >
                    Details
                  </Link>

                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={handleQuickAdd}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-all ${
                      added
                        ? "bg-[#1C3D2B] text-amber-300"
                        : "bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
