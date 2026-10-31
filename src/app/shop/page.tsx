"use client";

import React, { useState, useMemo } from "react";
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
  ArrowRight,
  X,
  FileText,
  Download,
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { LadduProduct, ProductCategory } from "@/types";
import { useCart } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Container, Section, SectionHeader, Badge, Button } from "@/components/ui";

const categories = [
  { id: "all", label: "All Collections" },
  { id: "dry-fruits", label: "Dry Fruits Laddus" },
  { id: "millets", label: "Millet & Grain Laddus" },
  { id: "specialty", label: "Specialty Wellness" },
  { id: "seasonal", label: "Seasonal Nutrition Bites" },
  { id: "gift-boxes", label: "Chakra Gift Boxes" },
] as const;

const quickTags = [
  { id: "all", label: "All Priorities" },
  { id: "Zero Refined Sugar", label: "Zero Added Sugar" },
  { id: "High Calcium", label: "Bone & Joint Care" },
  { id: "Omega-3 Rich", label: "Cognitive & Focus" },
  { id: "Digestive Care", label: "Digestive Comfort" },
  { id: "Bestseller", label: "Bestsellers" },
] as const;

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProduct, setModalProduct] = useState<LadduProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
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
  }, [selectedCategory, selectedTag, searchQuery]);

  const handleAdd = (p: LadduProduct) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedTag !== "all" || searchQuery.trim();

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <Container>
        {/* Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            label="Artisanal Kitchen Selection"
            title="The Homemade Laddu Collection"
            description="Carefully curated dry fruits, sprouted millets, and botanical seeds. Prepared fresh in small batches using pure A2 cow ghee and traditional wholesome recipes."
          />
          <div className="shrink-0 pb-2">
            <a
              href="/DR_KAS_SHOP_LADDUS_CATALOGUE.doc"
              download="DR_KAS_SHOP_LADDUS_CATALOGUE.doc"
              className="inline-flex items-center gap-2 bg-[#FAF6EE] hover:bg-[#F2E8D7] text-[#8A4B08] border border-[#E8DEC9] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm group"
              title="Download Microsoft Word Catalogue for offline review"
            >
              <FileText className="w-4 h-4 text-[#B45309] group-hover:scale-110 transition-transform" />
              <span>Download Laddus Word File (.doc)</span>
              <Download className="w-3.5 h-3.5 text-[#B45309]/70" />
            </a>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-5 border border-border-light shadow-sm space-y-4 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-ink-subtle absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search almond, ragi, dates, fig, gond..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-surface-warm border border-border-mid rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/30 text-ink-dark"
              />
            </div>

            {/* Quick Priority Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-ink-subtle shrink-0" aria-hidden="true" />
              {quickTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTag === tag.id
                      ? "bg-forest text-white"
                      : "bg-surface-warm text-ink-muted hover:bg-border-mid"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-border-light">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gold-600 text-white shadow-sm"
                    : "bg-surface-warm text-ink-muted hover:bg-border-mid"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border-light">
              <span className="text-xs text-ink-muted">Active filters</span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border-light space-y-3 animate-fade-in-up">
            <p className="text-sm text-ink-light">No laddus match your selected filters.</p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((p) => {
                const isAdded = addedId === p.id;

                return (
                  <article
                    key={p.id}
                    className="bg-white rounded-2xl border border-border-light overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group hover:border-gold-300/50 animate-fade-in-up"
                  >
                    {/* Product Card Image */}
                    <Link href={`/shop/${p.id}`} className="block relative aspect-[16/10] overflow-hidden bg-surface-warm -m-5 mb-5">
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
                      {p.badges[0] && (
                        <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-ink-dark/85 backdrop-blur-sm text-gold-200 px-2.5 py-0.5 rounded-full shadow-sm">
                          {p.badges[0]}
                        </span>
                      )}
                    </Link>

                    <div className="p-6 space-y-4">
                      {/* Chakra theme & quick tag */}
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

                      {/* Titles */}
                      <div>
                        <Link href={`/shop/${p.id}`} className="block">
                          <h3 className="font-serif font-bold text-xl text-ink-dark group-hover:text-gold-600 transition-colors line-clamp-1">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-forest-700 font-medium mt-1">{p.tagline}</p>
                      </div>

                      <p className="text-xs text-ink-light leading-relaxed line-clamp-3">
                        {p.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.badges.map((b, idx) => (
                          <Badge key={idx} variant="neutral" size="sm">
                            {b}
                          </Badge>
                        ))}
                      </div>

                      {/* Macro snapshot */}
                      <div className="bg-surface-warm rounded-xl p-2.5 grid grid-cols-3 gap-1 text-center border border-border-light">
                        <div>
                          <span className="text-[9px] text-ink-subtle uppercase block font-semibold">Calories</span>
                          <span className="text-xs font-bold text-ink-dark">~{p.nutrition.caloriesApprox} kcal</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-ink-subtle uppercase block font-semibold">Protein</span>
                          <span className="text-xs font-bold text-ink-dark">{p.nutrition.proteinG}g</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-ink-subtle uppercase block font-semibold">Sweetener</span>
                          <span className="text-[10px] font-bold text-forest-700 truncate block">
                            {p.nutrition.sweetenerType.includes("Zero") ? "Zero Sugar" : "Gur / Fig"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="p-6 pt-0 space-y-3">
                      <div className="flex items-baseline justify-between border-t border-border-light pt-3">
                        <div>
                          <span className="text-xs text-ink-subtle">{p.weight}</span>
                          <div className="font-serif font-bold text-xl text-ink-dark">₹{p.price}</div>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Fresh In Kitchen
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/shop/${p.id}`}
                          className="flex items-center justify-center gap-1 py-2.5 rounded-xl border border-border-mid text-ink-muted text-xs font-semibold hover:bg-surface-warm transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Nutrition Info</span>
                        </Link>

                        <button
                          onClick={() => handleAdd(p)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                            isAdded
                              ? "bg-forest text-gold-300"
                              : "bg-gold-600 hover:bg-gold-700 text-white"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Added!</span>
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

            <div className="text-center pt-8 animate-fade-in-up">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-700"
              >
                View All Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </Container>

      {/* Quick view modal */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={(p) => addToCart(p)}
      />
    </div>
  );
}