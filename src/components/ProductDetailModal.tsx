"use client";

import React from "react";
import { X, Sparkles, Check, AlertTriangle, ShieldCheck, Heart, ShoppingBag } from "lucide-react";
import { LadduProduct } from "@/types";

interface ProductDetailModalProps {
  product: LadduProduct | null;
  onClose: () => void;
  onAddToCart: (product: LadduProduct) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-2xl w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#FAF5EB] p-6 border-b border-[#E8DEC8] flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#27211A] pt-1">
              {product.name}
            </h3>
            {product.hindiName && (
              <p className="text-xs text-[#8C7A65] font-serif">{product.hindiName}</p>
            )}
            <p className="text-xs font-semibold text-[#1C3D2B]">{product.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#4A3E31]">
          {/* Product Image Banner */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E8DEC9] relative shadow-inner">
            <img
              src={product.image || `/products/${product.id}.jpg`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
              }}
            />
            <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold bg-[#27211A]/85 backdrop-blur-sm text-amber-200 px-2.5 py-0.5 rounded-full">
              100% Desi Cow Ghee • Fresh Daily
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
              About This Recipe
            </h4>
            <p className="text-[#3D3328] leading-relaxed">{product.description}</p>
          </div>

          {/* Chakra Theme If Present */}
          {product.chakraTheme && (
            <div
              className="p-4 rounded-2xl border space-y-1"
              style={{
                borderColor: `${product.chakraTheme.accentColor}40`,
                backgroundColor: `${product.chakraTheme.accentColor}0D`
              }}
            >
              <div className="flex items-center space-x-2">
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: product.chakraTheme.accentColor }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: product.chakraTheme.accentColor }}
                >
                  Chakra Harmony Focus: {product.chakraTheme.chakraName}
                </span>
              </div>
              <p className="text-xs text-[#4A3E31]">
                {product.chakraTheme.chakraMeaning}
              </p>
            </div>
          )}

          {/* Ingredients Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
              Pure Ingredients & Composition
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.ingredients.map((ingr, i) => (
                <div
                  key={i}
                  className="bg-white p-2.5 rounded-xl border border-[#E9DFC8] text-xs flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>{ingr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts Table */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5DAC6] space-y-3">
            <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-2">
              <span className="font-serif font-bold text-base text-[#27211A]">
                Estimated Nutritional Profile
              </span>
              <span className="text-xs text-[#7C6A53]">
                Serving: {product.nutrition.servingSize}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Calories</span>
                <span className="text-sm font-bold text-[#2D261E]">~{product.nutrition.caloriesApprox} kcal</span>
              </div>
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Protein</span>
                <span className="text-sm font-bold text-[#2D261E]">{product.nutrition.proteinG} g</span>
              </div>
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Healthy Fats</span>
                <span className="text-sm font-bold text-[#2D261E]">{product.nutrition.healthyFatsG} g</span>
              </div>
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Total Carbs</span>
                <span className="text-sm font-bold text-[#2D261E]">{product.nutrition.carbsG} g</span>
              </div>
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Dietary Fiber</span>
                <span className="text-sm font-bold text-[#2D261E]">{product.nutrition.dietaryFiberG} g</span>
              </div>
              <div className="bg-[#FAF6EE] p-2.5 rounded-lg">
                <span className="text-[#7C6A53] block text-[10px] uppercase font-semibold">Sweetener</span>
                <span className="text-xs font-bold text-[#1C3D2B] truncate block">
                  {product.nutrition.sweetenerType}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-[#8C7A65] italic">
              *Approximate laboratory nutritional calculation. Exact value depends on natural batch variation.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
              Wellness & Nutritional Benefits
            </h4>
            <div className="space-y-1.5">
              {product.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Allergen & Storage Advisories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/70 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Allergen Notice</span>
              </div>
              <p className="text-amber-950 text-[11px] leading-relaxed">
                {product.allergenWarning}
              </p>
            </div>

            <div className="bg-[#F4EFE6] p-3.5 rounded-xl border border-[#E5DAC6] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#3D3328] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C3D2B]" />
                <span>Fresh Storage</span>
              </div>
              <p className="text-[#5C4D3D] text-[11px] leading-relaxed">
                {product.storageInstructions}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer / Add to Bag */}
        <div className="bg-[#FAF5EB] p-4 sm:p-6 border-t border-[#E8DEC8] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7C6A53]">{product.weight}</span>
            <div className="text-2xl font-serif font-bold text-[#27211A]">₹{product.price}</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#C28833] to-[#996515] hover:from-[#B37825] hover:to-[#7A500D] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag (₹{product.price})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
