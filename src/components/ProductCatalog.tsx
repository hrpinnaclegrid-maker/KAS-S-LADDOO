"use client";

import React, { useState } from "react";
import { Plus, Check, Eye, Sparkles, Filter, Search, ShoppingBag } from "lucide-react";
import { LadduProduct, ProductCategory, TargetAudience } from "@/types";

interface ProductCatalogProps {
  products: LadduProduct[];
  onAddToCart: (product: LadduProduct) => void;
  onOpenProductDetail: (product: LadduProduct) => void;
}

export default function ProductCatalog({
  products,
  onAddToCart,
  onOpenProductDetail
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAudience, setSelectedAudience] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "dry-fruits", label: "Dry Fruits Laddus" },
    { id: "millets", label: "Millet & Grain Laddus" },
    { id: "specialty", label: "Specialty Wellness Laddus" },
    { id: "seasonal", label: "Seasonal Nutrition Bites" },
    { id: "gift-boxes", label: "Chakra Gift Boxes" }
  ];

  const audienceFilters = [
    { id: "all", label: "Every Generation" },
    { id: "children", label: "For Children" },
    { id: "young-adults", label: "For Young Adults" },
    { id: "women", label: "For Women" },
    { id: "men", label: "For Men" },
    { id: "older-adults", label: "For Older Adults" }
  ];

  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    // Audience match
    if (
      selectedAudience !== "all" &&
      !p.targetAudience.includes(selectedAudience as TargetAudience) &&
      !p.targetAudience.includes("all")
    )
      return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchIngr = p.ingredients.some((i) => i.toLowerCase().includes(q));
      if (!matchName && !matchTag && !matchIngr) return false;
    }
    return true;
  });

  const handleAdd = (product: LadduProduct) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="products" className="py-20 bg-[#FCFAF6] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100/70 px-3 py-1 rounded-full">
            <span>Handmade Kitchen Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#27211A]">
            The Laddu Collection
          </h2>
          <p className="text-[#655544] text-base leading-relaxed">
            Wholesome dry fruits, sprouted millets, and ancient seeds slowly roasted in pure cow ghee. 
            100% organic, with no added sugar, artificial sweetener, preservatives, or artificial colors.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DEC9] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ingredients, almond, ragi, dates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C28833]/40 text-[#2D261E]"
              />
            </div>

            {/* Generational Filter Dropdown / Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-[#8C7A65] shrink-0" />
              <span className="text-xs font-semibold text-[#7C6A53] shrink-0">Stage:</span>
              <div className="flex space-x-1.5 shrink-0">
                {audienceFilters.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAudience(a.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedAudience === a.id
                        ? "bg-[#1C3D2B] text-white"
                        : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-[#EFE8D8]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#C28833] text-white shadow-sm"
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
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DEC9]">
            <p className="text-base text-[#655544]">No laddus match your selected filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedAudience("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#FAF6EE] text-[#C28833] rounded-xl text-xs font-semibold hover:bg-[#EFE7D8]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#E8DEC9] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group hover:border-[#C28833]/60"
                >
                  {/* Product Card Image */}
                  <div
                    onClick={() => onOpenProductDetail(product)}
                    className="cursor-pointer relative aspect-[16/10] overflow-hidden bg-[#FAF6EE]"
                  >
                    <img
                      src={product.image || `/products/${product.id}.jpg`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[10px] font-bold text-amber-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {product.categoryLabel}
                      </span>
                    </div>
                    {product.badges && product.badges[0] && (
                      <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-[#27211A]/85 backdrop-blur-sm text-amber-200 px-2.5 py-0.5 rounded-full shadow-sm">
                        {product.badges[0]}
                      </span>
                    )}
                  </div>

                  {/* Top Header Card Info */}
                  <div className="p-6 space-y-4">
                    {/* Category Tag & Chakra Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-medium text-[#7C6A53]">{product.weight}</span>
                      {product.chakraTheme && (
                        <span
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: product.chakraTheme.accentColor,
                            color: product.chakraTheme.accentColor,
                            backgroundColor: `${product.chakraTheme.accentColor}12`
                          }}
                        >
                          {product.chakraTheme.chakraName.split(" ")[0]}
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-xl text-[#27211A] group-hover:text-[#B45309] transition-colors">
                        {product.name}
                      </h3>
                      {product.hindiName && (
                        <p className="text-xs text-[#8C7A65] font-serif">{product.hindiName}</p>
                      )}
                      <p className="text-xs font-medium text-[#1C3D2B] pt-1">{product.tagline}</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#5C4D3D] leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Badges / Micro Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.badges.map((badge, bidx) => (
                        <span
                          key={bidx}
                          className="text-[10px] font-medium bg-[#FAF6EE] text-[#4A3E31] border border-[#E9DFC8] px-2 py-0.5 rounded-md"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Micro Macro Snapshot */}
                    <div className="bg-[#FAF6EE] rounded-xl p-2.5 grid grid-cols-3 gap-1 text-center border border-[#EAE0CD]">
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Calories</span>
                        <span className="text-xs font-bold text-[#2D261E]">~{product.nutrition.caloriesApprox} kcal</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Protein</span>
                        <span className="text-xs font-bold text-[#2D261E]">{product.nutrition.proteinG}g</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C6A53] uppercase block font-semibold">Sweetener</span>
                        <span className="text-[10px] font-bold text-[#1C3D2B] truncate block">
                          {product.nutrition.sweetenerType.includes("Zero") ? "Zero Sugar" : "Gur / Dates"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Action Row */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-baseline justify-between border-t border-[#EFE8D8] pt-3">
                      <div>
                        <div className="text-xs text-[#7C6A53]">{product.weight}</div>
                        <div className="text-xl font-serif font-bold text-[#27211A]">₹{product.price}</div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {product.inStock ? "Fresh In Kitchen" : "Next Batch Soon"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenProductDetail(product)}
                        className="flex items-center justify-center space-x-1 py-2.5 rounded-xl border border-[#DACFBB] text-[#4A3E31] text-xs font-semibold hover:bg-[#FAF6EE] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Nutrition Info</span>
                      </button>

                      <button
                        onClick={() => handleAdd(product)}
                        disabled={!product.inStock}
                        className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                          isAdded
                            ? "bg-[#1C3D2B] text-amber-300"
                            : "bg-gradient-to-r from-[#C28833] to-[#B37825] hover:from-[#B37825] hover:to-[#996515] text-white"
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
    </section>
  );
}
