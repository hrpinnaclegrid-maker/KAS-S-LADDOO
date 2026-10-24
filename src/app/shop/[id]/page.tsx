"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  AlertTriangle,
  Truck,
  Heart,
  MessageCircle,
  Plus,
  Minus
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";

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
    `Namaste Dr. KAS’S Team! 🙏 I want to order ${quantity} box(es) of "${product.name}" (₹${product.price * quantity}). Please share payment details and dispatch status.`
  );

  return (
    <div className="py-8 sm:py-14 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[#7C6A53]">
          <Link href="/" className="hover:text-[#B45309] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#B45309] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#27211A] font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm">
          {/* Left Column: Visual Presentation & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF5EB] rounded-3xl p-4 sm:p-6 border border-[#E8DEC7] space-y-5 relative overflow-hidden shadow-inner">
              {/* Product Hero Image with Zoom and Badges */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5EAD8] to-[#EBD9C0] border border-[#E2D2BC] shadow-md group">
                <img
                  src={product.image || `/products/${product.id}.jpg`}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Graceful fallback if image path ever fails
                    e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
                  }}
                />
                
                {/* Visual Glassmorphic Tag Overlays */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="bg-[#27211A]/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 border border-amber-500/20">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    100% Desi Cow Ghee
                  </span>
                  {product.badges && product.badges[0] && (
                    <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 shadow-sm">
                      {product.badges[0]}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-[#27211A] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#E8DEC9] shadow-sm">
                    Handmade in Small Batches
                  </span>
                </div>
              </div>

              {product.chakraTheme && (
                <div
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-2xl text-xs font-semibold border shadow-2xs"
                  style={{
                    borderColor: product.chakraTheme.accentColor,
                    color: product.chakraTheme.accentColor,
                    backgroundColor: `${product.chakraTheme.accentColor}10`
                  }}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Chakra Alignment: {product.chakraTheme.chakraName}</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[#E8DFC9] text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-[#EDE2CE] shadow-2xs">
                  <span className="text-[9px] text-[#7C6A53] uppercase font-bold block">Weight</span>
                  <span className="font-semibold text-[#27211A] text-xs">{product.weight || "400g (10-12)"}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#EDE2CE] shadow-2xs">
                  <span className="text-[9px] text-[#7C6A53] uppercase font-bold block">Ghee</span>
                  <span className="font-semibold text-[#27211A] text-xs">Pure Desi Cow</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#EDE2CE] shadow-2xs">
                  <span className="text-[9px] text-[#7C6A53] uppercase font-bold block">Batch</span>
                  <span className="font-semibold text-emerald-800 text-xs">Fresh Daily</span>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#524436]">
              <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DFC9] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero Chemical Additives</span>
              </div>
              <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DFC9] flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#B45309] shrink-0" />
                <span>Express Kitchen Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Nutrition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {product.categoryLabel}
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#27211A]">
                {product.name}
              </h1>
              {product.hindiName && (
                <p className="text-xs text-[#8C7A65] font-serif">{product.hindiName}</p>
              )}
              <p className="text-sm font-semibold text-[#1C3D2B]">{product.tagline}</p>
            </div>

            {/* Price & Quantity Bar */}
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC7] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7C6A53] block">{product.weight}</span>
                <span className="font-serif font-bold text-3xl text-[#B45309]">₹{product.price}</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white border border-[#DACFBB] rounded-xl px-3 py-1.5 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#5C4D3D] hover:text-[#27211A]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-[#27211A] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#5C4D3D] hover:text-[#27211A]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                    added
                      ? "bg-[#1C3D2B] text-amber-300"
                      : "bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? "Added to Bag!" : `Add to Bag (₹${product.price * quantity})`}</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Quick Order button */}
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant Order on WhatsApp Concierge</span>
            </a>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
                Culinary & Wellness Background
              </h3>
              <p className="text-sm text-[#4A3E31] leading-relaxed">{product.description}</p>
            </div>

            {/* Nutrition Facts Grid */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DEC9] space-y-3">
              <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-2">
                <span className="font-serif font-bold text-sm text-[#27211A]">
                  Nutritional Value Profile (Serving: {product.nutrition.servingSize})
                </span>
                <span className="text-[11px] text-[#7C6A53]">Natural wholesome source</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Calories</span>
                  <span className="font-bold text-[#27211A]">~{product.nutrition.caloriesApprox} kcal</span>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Protein</span>
                  <span className="font-bold text-[#27211A]">{product.nutrition.proteinG}g</span>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Healthy Fats</span>
                  <span className="font-bold text-[#27211A]">{product.nutrition.healthyFatsG}g</span>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Fiber</span>
                  <span className="font-bold text-[#27211A]">{product.nutrition.dietaryFiberG}g</span>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Natural Sugar</span>
                  <span className="font-bold text-[#27211A]">{product.nutrition.sugarG}g</span>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-xl">
                  <span className="text-[10px] text-[#7C6A53] uppercase font-bold block">Sweet Source</span>
                  <span className="font-bold text-[#1C3D2B] truncate block text-[10px]">
                    {product.nutrition.sweetenerType}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
                Hand-Selected Ingredients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="bg-[#FAF6EE] p-2 rounded-xl border border-[#E9DFC8] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergens & Storage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Allergen Notice</span>
                </span>
                <p className="text-[11px] leading-relaxed">{product.allergenWarning}</p>
              </div>

              <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DFC9] text-[#4A3E31] space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Fresh Shelf Life</span>
                </span>
                <p className="text-[11px] leading-relaxed">{product.storageInstructions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Varieties */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="font-serif font-bold text-xl text-[#27211A]">
              Complementary Varieties in This Collection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="bg-white p-4 rounded-3xl border border-[#E8DEC9] space-y-3 hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FAF6EE] relative border border-[#EBE1D0]">
                      <img
                        src={rel.image || `/products/${rel.id}.jpg`}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-amber-900 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-2xs">
                        {rel.categoryLabel}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#27211A] group-hover:text-[#B45309] transition-colors">{rel.name}</h4>
                    <p className="text-xs text-[#5C4D3D] line-clamp-2">{rel.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#EFE8D8]">
                    <span className="font-serif font-bold text-base text-[#B45309]">₹{rel.price}</span>
                    <Link
                      href={`/shop/${rel.id}`}
                      className="text-xs font-bold text-[#1C3D2B] hover:text-[#B45309]"
                    >
                      View Laddu →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-[#7C6A53] font-serif">Loading laddu details...</div>}>
      <ProductDetailContent />
    </React.Suspense>
  );
}
