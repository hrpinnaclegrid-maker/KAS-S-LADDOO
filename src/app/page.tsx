"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Zap,
  Gift,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
  Heart
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";
import CustomerReviews from "@/components/CustomerReviews";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function HomePage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCraving, setSelectedCraving] = useState<string>("royal-nut");
  const [heroQuantity, setHeroQuantity] = useState(1);
  const [heroAdded, setHeroAdded] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [liveAlertIndex, setLiveAlertIndex] = useState(0);

  // Live order social proof ticker
  const liveAlerts = [
    { name: "Pooja M.", city: "Bengaluru", item: "Royal Nut Delight", time: "5m ago" },
    { name: "Vikram S.", city: "Mumbai", item: "Chakra Harmony Gift Box", time: "12m ago" },
    { name: "Sunita D.", city: "Delhi", item: "Sprouted Ragi & Gond", time: "28m ago" },
    { name: "Rahul V.", city: "Pune", item: "Winter Sesame Bite", time: "35m ago" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveAlertIndex((prev) => (prev + 1) % liveAlerts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#D4AF37", "#10B981", "#B45309", "#F59E0B"]
      });
    } catch (e) {}
  };

  const handleHeroAdd = () => {
    const heroProduct = initialProducts[0];
    addToCart(heroProduct, heroQuantity);
    triggerConfetti();
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 2000);
  };

  const handleProductAdd = (p: typeof initialProducts[0]) => {
    addToCart(p);
    triggerConfetti();
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

  // Cravings fast-picker
  const cravings = [
    { id: "royal-nut", emoji: "👑", name: "Royal Nut Crunch", tag: "Dates & Almonds", productId: "kas-dryfruit-almond-date" },
    { id: "anjeer", emoji: "🌰", name: "Anjeer & Walnut", tag: "Natural Plant Iron", productId: "kas-dryfruit-cashew-anjeer" },
    { id: "ragi-gond", emoji: "🌾", name: "Sprouted Ragi & Gond", tag: "Bone Calcium Power", productId: "kas-millet-ragi-gond" },
    { id: "winter", emoji: "❄️", name: "Winter Ginger & Til", tag: "Seasonal Warmth", productId: "kas-seasonal-winter-ginger-walnut" },
    { id: "summer", emoji: "🥥", name: "Coconut & Lime Bite", tag: "Tropical Refresh", productId: "kas-seasonal-summer-coconut-lime" },
    { id: "gift-trio", emoji: "🎁", name: "Luxury Gift Box", tag: "12-Piece Assorted Set", productId: "kas-gift-chakra-harmony-trio" }
  ];

  const matchedCravingProduct = initialProducts.find((p) => p.id === cravings.find((c) => c.id === selectedCraving)?.productId) || initialProducts[0];

  const displayProducts = initialProducts.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "zero-sugar") return p.badges.includes("Zero Refined Sugar") || p.badges.includes("No Refined Sugar") || p.nutrition.sweetenerType.includes("Zero");
    if (activeCategory === "millets") return p.category === "millets";
    if (activeCategory === "seasonal") return p.category === "seasonal";
    if (activeCategory === "gifts") return p.category === "gift-boxes";
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* 1. VISUAL HIGH-IMPACT HERO (Zero Theory, 100% Crave & Luxury D2C) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EB] via-[#F4EBDD] to-[#FAF5EB] py-10 sm:py-16 border-b border-[#E8DEC9]">
        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Live Order Social Proof Pill */}
          <div className="mb-6 flex justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={liveAlertIndex}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur px-3.5 py-1 rounded-full border border-amber-300/60 text-xs shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-[#1C3D2B]">{liveAlerts[liveAlertIndex].name}</span>
                <span className="text-[#655544]">bought</span>
                <span className="font-bold text-[#B45309]">{liveAlerts[liveAlertIndex].item}</span>
                <span className="text-[#8C7A65] text-[10px]">• {liveAlerts[liveAlertIndex].time}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Punchy, Crave-Inducing Hook */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300/70 px-3.5 py-1 rounded-full text-xs font-bold text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
                <span>100% Homemade • Desi Cow Ghee • Zero White Sugar</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#241E17] leading-[1.08] tracking-tight">
                  Guilt-Free Indian Luxury.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#C28833]">
                    Pure Ghee & Nuts.
                  </span>
                </h1>
                <p className="text-lg sm:text-2xl font-serif text-[#1C3D2B] font-medium">
                  Healing Mind, Body & Soul. Sweetened with Arabian Dates.
                </p>
              </div>

              <p className="text-[#554637] text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                Handcrafted from premium Mamra almonds, Turkish figs, and sprouted millets roasted slow in pure A2 cow ghee. 
                Zero refined sugar. Zero preservatives. Zero compromise.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#B45309] via-[#92400E] to-[#78350F] hover:from-[#92400E] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Fresh Batch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <a
                    href="#cravings"
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-[#FAF6EE] text-[#1C3D2B] border-2 border-[#1C3D2B]/30 px-6 py-4 rounded-2xl font-bold text-base transition-all shadow-2xs"
                  >
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Pick Your Flavor (Instant)</span>
                  </a>
                </motion.div>
              </div>

              {/* Fast Social Proof Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#4A3E31]">
                <div className="flex items-center space-x-1 text-amber-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[#2D261E]">4.9★</span>
                  <span className="text-[#7C6A53]">(1,400+ Families)</span>
                </div>
                <span>•</span>
                <span className="text-emerald-800 font-bold">100% Desi Cow Ghee</span>
                <span>•</span>
                <span className="text-emerald-800 font-bold">Pan-India Express Dispatch</span>
              </div>
            </div>

            {/* Right: The High-Converting Visual Box Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-amber-400/40 space-y-4 animate-float"
              >
                <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-[#1C3D2B] uppercase tracking-wider">
                      Rolled Fresh This Morning
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#1C3D2B] text-amber-200 px-2.5 py-0.5 rounded-full">
                    Bestseller #1
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#FAF5EB] to-[#F2E5D2] rounded-2xl overflow-hidden border border-[#E6D9C3] space-y-3">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FAF6EE]">
                    <img
                      src="/products/kas-dryfruit-almond-date.jpg"
                      alt="Royal Nut Delight Laddu"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-2xs">
                        Dry Fruits Collection
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-2">
                    <h3 className="font-serif font-bold text-xl text-[#27211A]">
                      Royal Nut Delight Laddu
                    </h3>
                    <p className="text-xs text-[#1C3D2B] font-semibold">
                      Royal Date, Mamra Almond & Iranian Pistachio
                    </p>
                    <p className="text-xs text-[#655544]">
                      Zero white sugar. Hand-roasted California Mamra almonds and Arabian dates bound in pure cow ghee.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8DCBF]">
                      <div>
                        <span className="text-[10px] text-[#7C6A53] font-bold block">Box of 10-12 (400g)</span>
                        <span className="font-serif font-bold text-2xl text-[#B45309]">₹520</span>
                      </div>

                    {/* Quantity Stepper & Instant Buy */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white border border-[#DACFBB] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setHeroQuantity(Math.max(1, heroQuantity - 1))}
                          className="px-2.5 py-1.5 text-xs font-bold text-[#4A3E31] hover:bg-[#FAF6EE]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{heroQuantity}</span>
                        <button
                          onClick={() => setHeroQuantity(heroQuantity + 1)}
                          className="px-2.5 py-1.5 text-xs font-bold text-[#4A3E31] hover:bg-[#FAF6EE]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={handleHeroAdd}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 ${
                          heroAdded
                            ? "bg-[#1C3D2B] text-amber-300"
                            : "bg-[#B45309] hover:bg-[#92400E] text-white"
                        }`}
                      >
                        {heroAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

                {/* Quick Founder Stamp */}
                <div className="flex items-center space-x-3 bg-[#FAF6EE] p-2.5 rounded-xl border border-[#E8DFC9]">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0 bg-white">
                    <img src="/dr-afroz.jpeg" alt="Dr. Khan Afroz Shams" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#27211A]">Formulated by Dr. Khan Afroz Shams</div>
                    <div className="text-[#7C6A53] text-[11px]">15+ Yrs Aviation & Luxury Hospitality • Certified Nutritionist</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT CRAVINGS PICKER (Interactive, Fun, High CTR) */}
      <section id="cravings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            Quick Flavor Selector
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
            What Are You Craving Today?
          </h2>
          <p className="text-xs text-[#7C6A53]">Tap a flavor to reveal your freshly made batch.</p>
        </div>

        {/* Craving Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cravings.map((c) => {
            const isSelected = selectedCraving === c.id;
            return (
              <motion.button
                key={c.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedCraving(c.id);
                  triggerConfetti();
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-[#1C3D2B] text-white border-[#1C3D2B] shadow-lg scale-102"
                    : "bg-white text-[#4A3E31] border-[#E8DEC9] hover:bg-[#FAF6EE]"
                }`}
              >
                <span className="text-2xl block mb-1">{c.emoji}</span>
                <span className="font-serif font-bold text-xs block leading-tight truncate">{c.name}</span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-amber-300" : "text-[#7C6A53]"}`}>
                  {c.tag}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Instant Matched Card Reveal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={matchedCravingProduct.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-400/40 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-[#E8DFC9] bg-[#FAF6EE] shadow-xs">
                <img
                  src={matchedCravingProduct.image || `/products/${matchedCravingProduct.id}.jpg`}
                  alt={matchedCravingProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    {matchedCravingProduct.categoryLabel}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Fresh Batch
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#27211A]">
                  {matchedCravingProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D3D] max-w-xl">
                  {matchedCravingProduct.description}
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                  {matchedCravingProduct.badges.slice(0, 3).map((b, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-[#FAF6EE] text-[#4A3E31] px-2 py-0.5 rounded border border-[#E9DFC8]">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <div className="text-right">
                <span className="text-xs text-[#7C6A53] block">{matchedCravingProduct.weight}</span>
                <div className="font-serif font-bold text-3xl text-[#B45309]">₹{matchedCravingProduct.price}</div>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => handleProductAdd(matchedCravingProduct)}
                className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center space-x-2 ${
                  addedIds[matchedCravingProduct.id]
                    ? "bg-[#1C3D2B] text-amber-300"
                    : "bg-[#B45309] hover:bg-[#92400E] text-white"
                }`}
              >
                {addedIds[matchedCravingProduct.id] ? (
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
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. ZERO BS INGREDIENT STRIP (Clean & Visual, NO Long Essays) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1C3D2B] to-[#122B1E] text-white rounded-3xl p-6 sm:p-8 border border-[#2B573D] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                100% Transparency
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF5EB]">
                What Goes In. What Stays Out.
              </h3>
              <p className="text-xs text-[#C8DBD0]">
                Traditional Indian taste with clean contemporary nutrition.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-2xl space-y-1.5 border border-white/10">
                <span className="text-emerald-400 font-bold block flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ALWAYS INCLUDED:</span>
                </span>
                <p className="text-white/90">Pure Desi Cow Ghee • Arabian Dates • California Almonds • Turkish Figs • Sprouted Millets</p>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl space-y-1.5 border border-white/10">
                <span className="text-rose-400 font-bold block flex items-center space-x-1">
                  <span>🚫</span>
                  <span>NEVER INCLUDED:</span>
                </span>
                <p className="text-white/90">0% Refined White Sugar • 0% Palm Oil / Dalda • 0% Chemical Preservatives • 0% Artificial Colors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATALOG GRID WITH 1-CLICK BUY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              The Homemade Menu
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#27211A]">
              Signature Laddu Collection
            </h2>
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All Items" },
              { id: "zero-sugar", label: "Zero White Sugar" },
              { id: "millets", label: "Sprouted Millets" },
              { id: "seasonal", label: "Seasonals" },
              { id: "gifts", label: "Gift Boxes" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveCategory(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === t.id
                    ? "bg-[#1C3D2B] text-white shadow-sm"
                    : "bg-white text-[#5C4D3D] border border-[#E8DEC9] hover:bg-[#FAF6EE]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((p) => {
            const isAdded = addedIds[p.id];

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-[#E8DEC9] p-5 sm:p-6 space-y-3.5 hover:shadow-xl transition-all flex flex-col justify-between group hover:border-[#B45309]/50"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                      {p.categoryLabel}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Fresh Batch
                    </span>
                  </div>

                  <div>
                    <Link href={`/shop/${p.id}`}>
                      <h3 className="font-serif font-bold text-lg text-[#27211A] group-hover:text-[#B45309] transition-colors leading-snug">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#1C3D2B] font-semibold mt-0.5">{p.tagline}</p>
                  </div>

                  <p className="text-xs text-[#655544] leading-relaxed line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.badges.slice(0, 2).map((b, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-[#FAF6EE] text-[#4A3E31] px-2 py-0.5 rounded border border-[#E9DFC8]">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFE8D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7C6A53] block">{p.weight}</span>
                    <span className="font-serif font-bold text-2xl text-[#27211A]">₹{p.price}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/shop/${p.id}`}
                      className="px-3 py-2 rounded-xl border border-[#DACFBB] text-[#4A3E31] text-xs font-semibold hover:bg-[#FAF6EE]"
                    >
                      Details
                    </Link>

                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleProductAdd(p)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 ${
                        isAdded
                          ? "bg-[#1C3D2B] text-amber-300"
                          : "bg-[#B45309] hover:bg-[#92400E] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. LUXURY GIFT BOX PROMINENT SPOTLIGHT (High Average Order Value) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF5EB] via-[#F4E8D3] to-[#EFE1C8] rounded-3xl p-6 sm:p-10 border-2 border-amber-400/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full inline-block">
              🎁 Premium Wellness Gifting
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#27211A]">
              Dr. KAS Signature Chakra Harmony Gift Box
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4D3D] leading-relaxed">
              12 assorted luxury laddus: Royal Almond Date, Sprouted Ragi Babool Gond, and Botanical Superseeds. 
              Presented in an imperial festive sleeve with Dr. Shams’s Mindful Eating bookmark.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-xs font-semibold text-[#1C3D2B]">
              <span>✓ Corporate & Festive Gifting</span>
              <span>•</span>
              <span>✓ Baby Showers & Weddings</span>
              <span>•</span>
              <span>✓ Luxury Gift Wrapping</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-300 shadow-md text-center space-y-3 shrink-0 w-full sm:w-72">
            <span className="text-xs text-[#7C6A53] font-bold block">Box of 12 Assorted (600g)</span>
            <div className="font-serif font-bold text-3xl text-[#B45309]">₹890</div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProductAdd(initialProducts.find((p) => p.id === "kas-gift-chakra-harmony-trio") || initialProducts[0])}
              className="w-full bg-[#1C3D2B] hover:bg-[#132A1E] text-white py-3.5 rounded-xl font-bold text-sm shadow transition-all flex items-center justify-center space-x-2"
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Order Gift Box</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS (Instant Credibility) */}
      <CustomerReviews />

      {/* 7. QUICK 1-CLICK BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C3D2B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#2B573D] shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EB]">
            Fresh Batches Shipped Daily Pan-India
          </h3>
          <p className="text-xs sm:text-sm text-[#C8DBD0] max-w-md mx-auto">
            Order your homemade laddus handcrafted with pure cow ghee and zero refined sugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-[#1C3D2B] font-bold px-8 py-3.5 rounded-xl text-sm shadow transition-all"
            >
              Order Homemade Laddus
            </Link>
            <Link
              href="/consult"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-sm border border-white/20 transition-all"
            >
              Book Dietary Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
