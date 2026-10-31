"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  AlertTriangle,
  Truck,
  Heart,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";
import { Container, Section, Badge, Button, Card, CardContent } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

function ProductDetailContent() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = initialProducts.find((p) => p.id === productId) || initialProducts[0];
  const relatedProducts = initialProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Dr. KAS'S Team! 🙏 I want to order ${quantity} box(es) of "${product.name}" (₹${product.price * quantity}). Please share payment details and dispatch status.`
  );

  return (
    <div className="py-8 sm:py-14 space-y-12">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-dark font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border-light shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Visual Presentation & Badges */}
            <div className="lg:col-span-5 space-y-6">
              <Card variant="outlined" padding="md" className="space-y-5">
                {/* Product Hero Image with Badges */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-cream-warm border border-border-mid shadow-md group">
                  <img
                    src={product.image || `/products/${product.id}.jpg`}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                    }}
                  />

                  {/* Tag Overlays */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <Badge variant="primary" size="sm" className="bg-ink-dark/80 text-gold-300 border-gold-500/20" dot dotColor="#F59E0B">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      100% Desi Cow Ghee
                    </Badge>
                    {product.badges[0] && (
                      <Badge variant="success" size="sm" className="bg-emerald-900/80 text-emerald-300 border-emerald-500/20">
                        {product.badges[0]}
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 z-10">
                    <Badge variant="neutral" size="sm" className="bg-white/90 text-ink-dark border-border-light">
                      Handmade in Small Batches
                    </Badge>
                  </div>
                </div>

                {product.chakraTheme && (
                  <div
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border shadow-sm"
                    style={{
                      borderColor: product.chakraTheme.accentColor,
                      color: product.chakraTheme.accentColor,
                      backgroundColor: `${product.chakraTheme.accentColor}10`,
                    }}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Chakra Alignment: {product.chakraTheme.chakraName}</span>
                  </div>
                )}

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-light text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-border-light shadow-xs">
                    <span className="text-[9px] text-ink-subtle uppercase font-bold block">Weight</span>
                    <span className="font-semibold text-ink-dark text-xs">{product.weight || "400g (10-12)"}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-border-light shadow-xs">
                    <span className="text-[9px] text-ink-subtle uppercase font-bold block">Ghee</span>
                    <span className="font-semibold text-ink-dark text-xs">Pure Desi Cow</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-border-light shadow-xs">
                    <span className="text-[9px] text-ink-subtle uppercase font-bold block">Batch</span>
                    <span className="font-semibold text-emerald-700 text-xs">Fresh Daily</span>
                  </div>
                </div>
              </Card>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 text-xs text-ink-light">
                <div className="bg-surface-warm p-3 rounded-xl border border-border-light flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Zero Chemical Additives</span>
                </div>
                <div className="bg-surface-warm p-3 rounded-xl border border-border-light flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-600 shrink-0" aria-hidden="true" />
                  <span>Express Kitchen Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details, Nutrition & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="primary" size="sm">
                  {product.categoryLabel}
                </Badge>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-ink-dark">
                  {product.name}
                </h1>
                {product.hindiName && (
                  <p className="text-xs text-ink-subtle font-serif">{product.hindiName}</p>
                )}
                <p className="text-sm font-semibold text-forest-700">{product.tagline}</p>
              </div>

              {/* Price, Quantity & Purchase Actions */}
              <div className="bg-gradient-to-br from-white to-[#FAF6EE] rounded-3xl p-5 sm:p-6 border border-[#E8DEC9] shadow-sm space-y-4">
                <div className="flex items-baseline justify-between pb-3 border-b border-[#EAE0CD]">
                  <div>
                    <span className="text-xs text-ink-muted block font-medium">{product.weight}</span>
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#8A4B08]">₹{product.price}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-3 py-1 rounded-full shadow-xs">
                    Fresh Kitchen Batch
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between sm:justify-center gap-3 bg-white border border-[#E2D6C0] rounded-2xl px-4 py-2.5 shadow-xs sm:w-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Qty</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-lg bg-[#FAF5EB] hover:bg-[#EAE0CD] text-ink-dark flex items-center justify-center font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-bold text-ink-dark w-7 text-center select-none font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-[#FAF5EB] hover:bg-[#EAE0CD] text-ink-dark flex items-center justify-center font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide text-white transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:translate-y-0 hover:-translate-y-0.5 cursor-pointer disabled:cursor-default"
                    style={{
                      background: added
                        ? "#1C3D2B"
                        : "linear-gradient(135deg, #B45309 0%, #C28833 50%, #8A3B05 100%)",
                      color: "#FFFFFF",
                      boxShadow: added
                        ? "0 4px 14px rgba(28, 61, 43, 0.35)"
                        : "0 6px 20px rgba(180, 83, 9, 0.35)",
                    }}
                  >
                    {added ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                        <span style={{ color: "#FFFFFF" }}>Added to Bag! ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 text-white shrink-0" />
                        <span style={{ color: "#FFFFFF" }}>Add to Bag &mdash; ₹{product.price * quantity}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Quick Order button */}
                <a
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:translate-y-0 hover:-translate-y-0.5 cursor-pointer group"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span style={{ color: "#FFFFFF" }} className="!text-white font-bold">
                    Instant Order on WhatsApp Concierge
                  </span>
                </a>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Culinary & Wellness Background
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{product.description}</p>
              </div>

              {/* Nutrition Facts Grid */}
              <Card variant="outlined" padding="lg" className="space-y-3">
                <div className="flex items-center justify-between border-b border-border-light pb-2">
                  <span className="font-serif font-bold text-sm text-ink-dark">
                    Nutritional Value Profile (Serving: {product.nutrition.servingSize})
                  </span>
                  <span className="text-[11px] text-ink-muted">Natural wholesome source</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Calories</span>
                    <span className="font-bold text-ink-dark">~{product.nutrition.caloriesApprox} kcal</span>
                  </div>
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Protein</span>
                    <span className="font-bold text-ink-dark">{product.nutrition.proteinG}g</span>
                  </div>
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Healthy Fats</span>
                    <span className="font-bold text-ink-dark">{product.nutrition.healthyFatsG}g</span>
                  </div>
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Fiber</span>
                    <span className="font-bold text-ink-dark">{product.nutrition.dietaryFiberG}g</span>
                  </div>
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Natural Sugar</span>
                    <span className="font-bold text-ink-dark">{product.nutrition.sugarG}g</span>
                  </div>
                  <div className="bg-surface-warm p-2 rounded-xl">
                    <span className="text-[10px] text-ink-subtle uppercase font-bold block">Sweet Source</span>
                    <span className="font-bold text-forest-700 truncate block text-[10px]">
                      {product.nutrition.sweetenerType}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Ingredients */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Hand-Selected Ingredients
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="bg-surface-warm p-2 rounded-xl border border-border-light flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergens & Storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                    <span>Allergen Notice</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{product.allergenWarning}</p>
                </div>

                <div className="bg-surface-warm p-3 rounded-xl border border-border-light text-ink-muted space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span>Fresh Shelf Life</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{product.storageInstructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Varieties */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="font-serif font-bold text-xl text-ink-dark">
              Complementary Varieties in This Collection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Card key={rel.id} variant="interactive" padding="md" className="space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-surface-warm relative border border-border-light">
                      <img
                        src={rel.image || `/products/${rel.id}.jpg`}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge variant="primary" size="sm" className="absolute top-2 left-2">
                        {rel.categoryLabel}
                      </Badge>
                    </div>
                    <h4 className="font-serif font-bold text-base text-ink-dark group-hover:text-gold-600 transition-colors">{rel.name}</h4>
                    <p className="text-xs text-ink-light line-clamp-2">{rel.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border-light">
                    <span className="font-serif font-bold text-base text-gold-600">₹{rel.price}</span>
                    <Link
                      href={`/shop/${rel.id}`}
                      className="text-xs font-bold text-forest-700 hover:text-gold-600 flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-ink-muted font-serif">Loading laddu details...</div>}>
      <ProductDetailContent />
    </React.Suspense>
  );
}