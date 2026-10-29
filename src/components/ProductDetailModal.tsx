"use client";

import React from "react";
import { X, Sparkles, Check, AlertTriangle, ShieldCheck, Heart, ShoppingBag, CheckCircle2 } from "lucide-react";
import { LadduProduct } from "@/types";
import { Badge, Button, Card } from "@/components/ui";

interface ProductDetailModalProps {
  product: LadduProduct | null;
  onClose: () => void;
  onAddToCart: (product: LadduProduct) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[500] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-cream rounded-2xl max-w-2xl w-full border border-border-mid shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-cream-warm p-6 border-b border-border-light flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <Badge variant="primary" size="sm">{product.categoryLabel}</Badge>
            <h3 className="font-serif font-bold text-2xl text-ink-dark pt-1">{product.name}</h3>
            {product.hindiName && <p className="text-xs text-ink-subtle font-serif">{product.hindiName}</p>}
            <p className="text-xs font-semibold text-forest-700">{product.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-border-mid text-ink-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-ink-muted">
          {/* Product Image Banner */}
          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-warm border border-border-light relative shadow-inner">
            <img
              src={product.image || `/products/${product.id}.jpg`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/products/kas-dryfruit-pista-walnut.jpg";
              }}
            />
            <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold bg-ink-dark/85 backdrop-blur-sm text-gold-200 px-2.5 py-0.5 rounded-full">
              100% Desi Cow Ghee • Fresh Daily
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">About This Recipe</h4>
            <p className="text-ink-muted leading-relaxed">{product.description}</p>
          </div>

          {/* Chakra Theme If Present */}
          {product.chakraTheme && (
            <Card variant="default" padding="md" className="space-y-1" style={{ borderColor: `${product.chakraTheme.accentColor}40`, backgroundColor: `${product.chakraTheme.accentColor}0D` }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: product.chakraTheme.accentColor }} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: product.chakraTheme.accentColor }}>
                  Chakra Harmony Focus: {product.chakraTheme.chakraName}
                </span>
              </div>
              <p className="text-xs text-ink-muted">{product.chakraTheme.chakraMeaning}</p>
            </Card>
          )}

          {/* Ingredients Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Pure Ingredients & Composition</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.ingredients.map((ingr, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-border-light text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                  <span>{ingr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts Table */}
          <Card variant="outlined" padding="lg" className="space-y-3">
            <div className="flex items-center justify-between border-b border-border-light pb-2">
              <span className="font-serif font-bold text-base text-ink-dark">Estimated Nutritional Profile</span>
              <span className="text-xs text-ink-muted">Serving: {product.nutrition.servingSize}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Calories</span>
                <span className="text-sm font-bold text-ink-dark">~{product.nutrition.caloriesApprox} kcal</span>
              </div>
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Protein</span>
                <span className="text-sm font-bold text-ink-dark">{product.nutrition.proteinG} g</span>
              </div>
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Healthy Fats</span>
                <span className="text-sm font-bold text-ink-dark">{product.nutrition.healthyFatsG} g</span>
              </div>
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Total Carbs</span>
                <span className="text-sm font-bold text-ink-dark">{product.nutrition.carbsG} g</span>
              </div>
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Dietary Fiber</span>
                <span className="text-sm font-bold text-ink-dark">{product.nutrition.dietaryFiberG} g</span>
              </div>
              <div className="bg-surface-warm p-2.5 rounded-lg">
                <span className="text-ink-subtle block text-[10px] uppercase font-semibold">Sweetener</span>
                <span className="text-xs font-bold text-forest-700 truncate block">{product.nutrition.sweetenerType}</span>
              </div>
            </div>
            <p className="text-[10px] text-ink-subtle italic">*Approximate laboratory nutritional calculation. Exact value depends on natural batch variation.</p>
          </Card>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Wellness & Nutritional Benefits</h4>
            <div className="space-y-1.5">
              {product.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Allergen & Storage Advisories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Card variant="default" padding="md" className="bg-amber-50/70 border-amber-200/70 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                <span>Allergen Notice</span>
              </div>
              <p className="text-amber-950 text-[11px] leading-relaxed">{product.allergenWarning}</p>
            </Card>

            <Card variant="default" padding="md" className="bg-cream border-border-light space-y-1">
              <div className="flex items-center gap-1.5 text-ink-muted font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700" aria-hidden="true" />
                <span>Fresh Storage</span>
              </div>
              <p className="text-ink-muted text-[11px] leading-relaxed">{product.storageInstructions}</p>
            </Card>
          </div>
        </div>

        {/* Modal Bottom Footer / Add to Bag */}
        <div className="bg-cream-warm p-4 sm:p-6 border-t border-border-light flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-muted">{product.weight}</span>
            <div className="text-2xl font-serif font-bold text-ink-dark">₹{product.price}</div>
          </div>

          <Button
            size="lg"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            Add to Bag (₹{product.price})
          </Button>
        </div>
      </div>
    </div>
  );
}