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
  Heart,
  Truck,
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";
import CustomerReviews from "@/components/CustomerReviews";
import confetti from "canvas-confetti";

const cravings = [
  { id: "royal-nut", emoji: "👑", name: "Royal Nut Crunch", tag: "Dates & Almonds", productId: "kas-dryfruit-almond-date" },
  { id: "anjeer", emoji: "🌰", name: "Anjeer & Walnut", tag: "Natural Plant Iron", productId: "kas-dryfruit-cashew-anjeer" },
  { id: "ragi-gond", emoji: "🌾", name: "Sprouted Ragi & Gond", tag: "Bone Calcium Power", productId: "kas-millet-ragi-gond" },
  { id: "winter", emoji: "❄️", name: "Winter Ginger & Til", tag: "Seasonal Warmth", productId: "kas-seasonal-winter-ginger-walnut" },
  { id: "summer", emoji: "🥥", name: "Coconut & Lime Bite", tag: "Tropical Refresh", productId: "kas-seasonal-summer-coconut-lime" },
  { id: "gift-trio", emoji: "🎁", name: "Luxury Gift Box", tag: "12-Piece Assorted Set", productId: "kas-gift-chakra-harmony-trio" },
];

const liveAlerts = [
  { name: "Pooja M.", city: "Bengaluru", item: "Royal Nut Delight", time: "5m ago" },
  { name: "Vikram S.", city: "Mumbai", item: "Chakra Harmony Gift Box", time: "12m ago" },
  { name: "Sunita D.", city: "Delhi", item: "Sprouted Ragi & Gond", time: "28m ago" },
  { name: "Rahul V.", city: "Pune", item: "Winter Sesame Bite", time: "35m ago" },
];

const categories = [
  { id: "all", label: "All Items" },
  { id: "zero-sugar", label: "Zero White Sugar" },
  { id: "millets", label: "Sprouted Millets" },
  { id: "seasonal", label: "Seasonals" },
  { id: "gifts", label: "Gift Boxes" },
] as const;

export default function HomePage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCraving, setSelectedCraving] = useState<string>("royal-nut");
  const [heroQuantity, setHeroQuantity] = useState(1);
  const [heroAdded, setHeroAdded] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [liveAlertIndex, setLiveAlertIndex] = useState(0);

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
        colors: ["#D4AF37", "#10B981", "#B45309", "#F59E0B"],
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

  const matchedCravingProduct = initialProducts.find(
    (p) => p.id === cravings.find((c) => c.id === selectedCraving)?.productId
  ) || initialProducts[0];

  const displayProducts = initialProducts.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "zero-sugar")
      return (
        p.badges.includes("Zero Refined Sugar") ||
        p.badges.includes("No Refined Sugar") ||
        p.nutrition.sweetenerType.includes("Zero")
      );
    if (activeCategory === "millets") return p.category === "millets";
    if (activeCategory === "seasonal") return p.category === "seasonal";
    if (activeCategory === "gifts") return p.category === "gift-boxes";
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-cream-warm py-12 sm:py-16 lg:py-20 border-b border-border-light">
        <div className="absolute top-0 right-10 w-96 h-96 bg-gold-300/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="container-custom relative z-10">
          {/* Live Order Social Proof */}
          <div className="mb-6 flex justify-center lg:justify-start animate-fade-in-up">
            <div
              key={liveAlertIndex}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-gold-300/60 text-xs shadow-sm animate-fade-in"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="font-bold text-forest-700">{liveAlerts[liveAlertIndex].name}</span>
              <span className="text-ink-light">bought</span>
              <span className="font-bold text-gold-600">{liveAlerts[liveAlertIndex].item}</span>
              <span className="text-ink-subtle text-[10px]">• {liveAlerts[liveAlertIndex].time}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-gold-200 px-3.5 py-1 rounded-full text-xs font-bold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} aria-hidden="true" />
                <span>100% Homemade • Desi Cow Ghee • Zero White Sugar</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink-dark leading-[1.08] tracking-tight">
                  Small-Batch Indian Luxury.{" "}
                  <span className="bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#C28833] bg-clip-text text-transparent">
                  Made for Better Snacking.
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-forest-700 font-medium">
                  Hand-rolled laddus with real nuts, millets, dates, and pure ghee.
                </p>
              </div>

              <p className="text-ink-light text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Premium ingredients, honest recipes, and fresh batches made to share. Pick your favourite and get it delivered.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop"
                  className="cta-primary w-full sm:w-auto px-8 py-4 text-base"
                >
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                  <span>Shop Fresh Batch</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <a
                  href="#flavor-selector"
                  className="cta-secondary w-full sm:w-auto px-6 py-4 text-base"
                >
                  <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span>Pick Your Flavor</span>
                </a>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-ink-muted">
                <div className="flex items-center gap-1 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="font-bold text-ink-dark">4.9★</span>
                  <span className="text-ink-muted">(1,400+ Families)</span>
                </div>
                <span aria-hidden="true">•</span>
                <span className="text-emerald-700 font-bold">100% Desi Cow Ghee</span>
                <span aria-hidden="true">•</span>
                <span className="text-emerald-700 font-bold">Pan-India Express Dispatch</span>
              </div>
            </div>

            {/* Right: Hero Product Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur rounded-2xl p-6 sm:p-7 shadow-xl border-2 border-gold-300/40 space-y-4 animate-float-subtle">
                <div className="flex items-center justify-between border-b border-border-light pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                    <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                      Rolled Fresh This Morning
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-forest text-gold-200 px-2.5 py-0.5 rounded-full">
                    Bestseller #1
                  </span>
                </div>

                <div className="bg-gradient-cream-warm rounded-2xl overflow-hidden border border-border-mid space-y-3">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-warm">
                    <img
                      src="/products/kas-dryfruit-almond-date.jpg"
                      alt="Royal Nut Delight Laddu"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-sm">
                        Dry Fruits Collection
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-2">
                    <h3 className="font-serif font-bold text-xl text-ink-dark">
                      Royal Nut Delight Laddu
                    </h3>
                    <p className="text-xs text-forest-700 font-semibold">
                      Royal Date, Mamra Almond & Iranian Pistachio
                    </p>
                    <p className="text-xs text-ink-muted">
                      Zero white sugar. Hand-roasted California Mamra almonds and Arabian dates bound in pure cow ghee.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-border-mid">
                      <div>
                        <span className="text-[10px] text-ink-subtle font-bold block">Box of 10-12 (400g)</span>
                        <span className="font-serif font-bold text-2xl text-gold-600">₹520</span>
                      </div>

                      {/* Quantity Stepper & Add */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-border-mid rounded-xl overflow-hidden">
                          <button
                            onClick={() => setHeroQuantity(Math.max(1, heroQuantity - 1))}
                            className="px-2.5 py-1.5 text-xs font-bold text-ink-muted hover:text-ink-dark hover:bg-surface-warm"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{heroQuantity}</span>
                          <button
                            onClick={() => setHeroQuantity(heroQuantity + 1)}
                            className="px-2.5 py-1.5 text-xs font-bold text-ink-muted hover:text-ink-dark hover:bg-surface-warm"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={handleHeroAdd}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                            heroAdded
                              ? "bg-forest text-gold-300"
                              : "bg-gold-600 hover:bg-gold-700 text-white"
                          }`}
                        >
                          {heroAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Stamp */}
                <div className="flex items-center gap-3 bg-surface-warm p-2.5 rounded-xl border border-border-light">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-300 shrink-0 bg-white">
                    <img src="/dr-afroz.jpeg" alt="Dr. Khan Afroz Shams" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-ink-dark">Formulated by Dr. Khan Afroz Shams</div>
                    <div className="text-ink-subtle text-[11px]">15+ Yrs Aviation & Luxury Hospitality • Certified Nutritionist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLAVOR SELECTOR */}
      <section id="flavor-selector" className="container-custom space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1 animate-fade-in-up delay-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-600 bg-amber-50 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Quick Flavor Selector</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-dark">
            What Are You Craving Today?
          </h2>
          <p className="text-xs text-ink-muted">Tap a flavor to reveal your freshly made batch.</p>
        </div>

        {/* Craving Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cravings.map((c) => {
            const isSelected = selectedCraving === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCraving(c.id);
                  triggerConfetti();
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-forest text-white border-forest shadow-lg scale-102"
                    : "bg-white text-ink-muted border-border-light hover:bg-surface-warm"
                }`}
              >
                <span className="text-2xl block mb-1" aria-hidden="true">{c.emoji}</span>
                <span className="font-serif font-bold text-xs block leading-tight truncate">{c.name}</span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-gold-300" : "text-ink-subtle"}`}>
                  {c.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Matched Card Reveal */}
        <div
          key={matchedCravingProduct.id}
          className="bg-white rounded-2xl p-5 sm:p-7 border-2 border-gold-300/40 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-border-light bg-surface-warm shadow-xs">
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
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full">
                  {matchedCravingProduct.categoryLabel}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Fresh Batch
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink-dark">
                {matchedCravingProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-ink-light max-w-xl">
                {matchedCravingProduct.description}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                {matchedCravingProduct.badges.slice(0, 3).map((b, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-surface-warm text-ink-muted px-2 py-0.5 rounded border border-border-light">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-xs text-ink-subtle block">{matchedCravingProduct.weight}</span>
              <div className="font-serif font-bold text-3xl text-gold-600">₹{matchedCravingProduct.price}</div>
            </div>

            <button
              onClick={() => handleProductAdd(matchedCravingProduct)}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 ${
                addedIds[matchedCravingProduct.id]
                  ? "bg-forest text-gold-300"
                  : "bg-gold-600 hover:bg-gold-700 text-white"
              }`}
            >
              {addedIds[matchedCravingProduct.id] ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="container-custom" style={{ marginTop: "4rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-forest-muted bg-forest shadow-lg">
          {[
            ["Fresh every morning", "Small-batch rolling"],
            ["Clean ingredients", "No refined white sugar"],
            ["Fast across India", "Secure, careful dispatch"],
          ].map(([title, detail]) => (
            <div key={title} className="bg-forest px-5 py-5 sm:py-6 text-center sm:text-left">
              <div className="text-sm font-bold text-[#FFFDF8]">{title}</div>
              <div className="mt-1 text-xs text-[#DDE9E0]">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CATALOG PREVIEW */}
      <section className="container-custom space-y-6 pt-10 sm:pt-14" style={{ marginTop: "4rem" }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              The Homemade Menu
            </span>
            <h2 className="text-3xl font-serif font-bold text-ink-dark">
              Signature Laddu Collection
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-forest text-white shadow-sm"
                    : "bg-white text-ink-muted border border-border-light hover:bg-surface-warm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Show 6 featured products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.slice(0, 6).map((p) => {
            const isAdded = addedIds[p.id];

            return (
              <article
                key={p.id}
                className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 space-y-3.5 hover:shadow-xl hover:border-gold-300/50 transition-all flex flex-col justify-between group"
              >
                <Link href={`/shop/${p.id}`} className="block relative aspect-[16/10] overflow-hidden bg-surface-warm rounded-xl -m-5 mb-5">
                  <img
                    src={p.image || `/products/${p.id}.jpg`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                    }}
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="text-[10px] font-bold text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {p.categoryLabel}
                    </span>
                  </div>
                  {p.badges[0] && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-ink-dark/85 backdrop-blur-sm text-gold-200 px-2.5 py-0.5 rounded-full shadow-sm">
                      {p.badges[0]}
                    </span>
                  )}
                </Link>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-ink-subtle">{p.weight}</span>
                    {p.chakraTheme && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: p.chakraTheme.accentColor,
                          color: p.chakraTheme.accentColor,
                          backgroundColor: `${p.chakraTheme.accentColor}12`,
                        }}
                      >
                        {p.chakraTheme.chakraName.split(" ")[0]}
                      </span>
                    )}
                  </div>

                  <div>
                    <Link href={`/shop/${p.id}`} className="block">
                      <h3 className="font-serif font-bold text-lg text-ink-dark group-hover:text-gold-600 transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-forest-700 font-medium mt-0.5">{p.tagline}</p>
                  </div>

                  <p className="text-xs text-ink-light leading-relaxed line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.badges.slice(0, 2).map((b, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-surface-warm text-ink-muted px-2 py-0.5 rounded border border-border-light">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border-light flex items-center justify-between">
                  <div>
                    <span className="text-xs text-ink-subtle block">{p.weight}</span>
                    <span className="font-serif font-bold text-xl text-ink-dark">₹{p.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/shop/${p.id}`}
                      className="px-3 py-2 rounded-xl border border-border-mid text-ink-muted text-xs font-semibold hover:bg-surface-warm transition-colors"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleProductAdd(p)}
                      className={`cta-primary px-4 py-2 text-xs ${
                        isAdded
                          ? "bg-forest text-gold-300"
                          : "bg-gold-600 hover:bg-gold-700 text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-700"
          >
            View All Products
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 5. GIFT BOX SPOTLIGHT */}
      <section className="container-custom">
        <div className="bg-gradient-cream-warm rounded-2xl p-6 sm:p-10 border-2 border-gold-300/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full inline-block">
              🎁 Premium Wellness Gifting
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-ink-dark">
              Dr. KAS Signature Chakra Harmony Gift Box
            </h3>
            <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
              12 assorted luxury laddus: Royal Almond Date, Sprouted Ragi Babool Gond, and Botanical Superseeds.
              Presented in an imperial festive sleeve with Dr. Shams's Mindful Eating bookmark.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-xs font-semibold text-forest-700">
              <span>✓ Corporate & Festive Gifting</span>
              <span aria-hidden="true">•</span>
              <span>✓ Baby Showers & Weddings</span>
              <span aria-hidden="true">•</span>
              <span>✓ Luxury Gift Wrapping</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold-300 shadow-md text-center space-y-3 shrink-0 w-full sm:w-72">
            <span className="text-xs text-ink-subtle font-bold block">Box of 12 Assorted (600g)</span>
            <div className="font-serif font-bold text-3xl text-gold-600">₹890</div>
            <button
              onClick={() => handleProductAdd(initialProducts.find((p) => p.id === "kas-gift-chakra-harmony-trio") || initialProducts[0])}
              className="cta-secondary w-full py-3.5 text-sm"
            >
              <Gift className="w-4 h-4 text-gold-300" aria-hidden="true" />
              <span>Order Gift Box</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 7. BOTTOM CTA BANNER */}
      <section className="container-custom">
        <div className="bg-forest text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-forest-muted shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFDF8]">
            Fresh Batches Shipped Daily Pan-India
          </h3>
          <p className="text-xs sm:text-sm text-[#DDE9E0] max-w-md mx-auto">
            Order your homemade laddus handcrafted with pure cow ghee and zero refined sugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="cta-primary w-full sm:w-auto px-8 py-3.5 text-sm"
            >
              Order Homemade Laddus
            </Link>
            <Link
              href="/consult"
              className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Book Dietary Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
