"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Sparkles,
  Check,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { LadduProduct, ProductCategory } from "@/types";
import { useCart } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProduct, setModalProduct] = useState<LadduProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "dry-fruits", label: "Dry Fruits Laddus" },
    { id: "millets", label: "Millet & Grain Laddus" },
    { id: "specialty", label: "Specialty Wellness" },
    { id: "seasonal", label: "Seasonal Nutrition Bites" },
    { id: "gift-boxes", label: "Chakra Gift Boxes" }
  ];

  const quickTags = [
    { id: "all", label: "All Priorities" },
    { id: "Zero Refined Sugar", label: "Zero Added Sugar" },
    { id: "High Calcium", label: "Bone & Joint Care" },
    { id: "Omega-3 Rich", label: "Cognitive & Focus" },
    { id: "Digestive Care", label: "Digestive Comfort" },
    { id: "Bestseller", label: "Bestsellers" }
  ];

  const filteredProducts = initialProducts.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    if (selectedTag !== "all" && !product.badges.includes(selectedTag)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchIngr = product.ingredients.some((i) => i.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIngr) return false;
    }
    return true;
  });

  const handleAdd = (p: LadduProduct) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Kitchen Selection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#27211A]">
            The Homemade Laddu Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5A47]">
            Carefully curated dry fruits, sprouted millets, and botanical seeds. 
            Prepared fresh in small batches using pure A2 cow ghee and traditional wholesome recipes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DEC9] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search almond, ragi, dates, fig, gond..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B45309]/30 text-[#2D261E]"
              />
            </div>

            {/* Quick Priority Tags */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7A65] shrink-0" />
              {quickTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTag === tag.id
                      ? "bg-[#1C3D2B] text-white"
                      : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-[#EFE8D8]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#B45309] text-white shadow-sm"
                    : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DEC9] space-y-3">
            <p className="text-sm text-[#655544]">No laddus match your selected filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTag("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#FAF6EE] text-[#B45309] rounded-xl text-xs font-bold hover:bg-[#EFE7D8]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => {
              const isAdded = addedId === p.id;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-[#E8DEC9] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group hover:border-[#B45309]/50"
                >
                  {/* Product Card Image */}
                  <Link href={`/shop/${p.id}`} className="block relative aspect-[16/10] overflow-hidden bg-[#FAF6EE]">
                    <img
                      src={p.image || `/products/${p.id}.jpg`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[10px] font-bold text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {p.categoryLabel}
                      </span>
                    </div>
                    {p.badges && p.badges[0] && (
                      <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-[#27211A]/85 backdrop-blur-sm text-amber-200 px-2.5 py-0.5 rounded-full shadow-sm">
                        {p.badges[0]}
                      </span>
                    )}
                  </Link>

                  <div className="p-6 space-y-4">
                    {/* Chakra theme & quick tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-[#7C6A53]">{p.weight}</span>
                      {p.chakraTheme && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: p.chakraTheme.accentColor,
                            color: p.chakraTheme.accentColor,
                            backgroundColor: `${p.chakraTheme.accentColor}12`
                          }}
                        >
                          {p.chakraTheme.chakraName.split(" ")[0]}
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <div>
                      <Link href={`/shop/${p.id}`} className="block">
                        <h3 className="font-serif font-bold text-xl text-[#27211A] group-hover:text-[#B45309] transition-colors line-clamp-1">
                          {p.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#1C3D2B] font-medium mt-1">{p.tagline}</p>
                    </div>

                    <p className="text-xs text-[#5C4D3D] leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-[#FAF6EE] text-[#4A3E31] px-2 py-0.5 rounded border border-[#E9DFC8]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Macro snapshot */}
                    <div className="bg-[#FAF6EE] rounded-xl p-2.5 grid grid-cols-3 gap-1 text-center border border-[#EAE0CD]">
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Calories</span>
                        <span className="text-xs font-bold text-[#2D261E]">~{p.nutrition.caloriesApprox} kcal</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Protein</span>
                        <span className="text-xs font-bold text-[#2D261E]">{p.nutrition.proteinG}g</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Sweetener</span>
                        <span className="text-[10px] font-bold text-[#1C3D2B] truncate block">
                          {p.nutrition.sweetenerType.includes("Zero") ? "Zero Sugar" : "Gur / Fig"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-baseline justify-between border-t border-[#EFE8D8] pt-3">
                      <div>
                        <span className="text-xs text-[#7C6A53]">{p.weight}</span>
                        <div className="text-xl font-serif font-bold text-[#27211A]">₹{p.price}</div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Fresh In Kitchen
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/shop/${p.id}`}
                        className="flex items-center justify-center space-x-1 py-2.5 rounded-xl border border-[#DACFBB] text-[#4A3E31] text-xs font-semibold hover:bg-[#FAF6EE] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Nutrition Info</span>
                      </Link>

                      <button
                        onClick={() => handleAdd(p)}
                        className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                          isAdded
                            ? "bg-[#1C3D2B] text-amber-300"
                            : "bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick view modal if clicked */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={(p) => addToCart(p)}
      />
    </div>
  );
}
