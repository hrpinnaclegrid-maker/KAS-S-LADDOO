"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function GlobalCartDrawer() {
  const {
    cart,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 1200;
  const freeShippingEligible = cartTotal >= freeShippingThreshold;
  const shippingFee = cartTotal === 0 ? 0 : freeShippingEligible ? 0 : 80;
  const total = cartTotal + shippingFee;

  return (
    <div
      className="fixed inset-0 z-[400] overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div className="w-full max-w-sm bg-cream h-full shadow-2xl flex flex-col justify-between border-l border-border-mid">
        {/* Top Header */}
        <div className="p-5 bg-cream-warm border-b border-border-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold-600" aria-hidden="true" />
            <h3 className="font-serif font-bold text-lg text-ink-dark">Your Laddu Bag</h3>
            <span className="text-xs bg-forest text-gold-300 font-bold px-2 py-0.5 rounded-full" aria-label={`${cartCount} items`}>
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-xl hover:bg-border-mid text-ink-muted transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-surface-warm px-5 py-3 border-b border-border-light">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted mb-1.5">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>
                {freeShippingEligible
                  ? "🎉 You qualified for Free Express Delivery!"
                  : `Add ₹${freeShippingThreshold - cartTotal} more for Free Delivery`}
              </span>
            </span>
          </div>
          <div className="w-full bg-border-mid rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-forest h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`,
              }}
              role="progressbar"
              aria-valuenow={Math.min(100, (cartTotal / freeShippingThreshold) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Free shipping progress"
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-cream-warm flex items-center justify-center text-ink-subtle">
                <ShoppingBag className="w-8 h-8 opacity-50" aria-hidden="true" />
              </div>
              <h4 className="font-serif font-bold text-lg text-ink-dark">Your bag is empty</h4>
              <p className="text-xs text-ink-muted max-w-xs mx-auto">
                Explore our dry fruits and millet laddus handcrafted with love and mindful nutrition.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartDrawerOpen(false)}
                className="inline-block bg-gold-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gold-700 transition-all shadow-sm"
              >
                Browse The Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-4 rounded-2xl border border-border-light space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="pr-2">
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {item.product.categoryLabel}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-ink-dark mt-1">
                      {item.product.name}
                    </h5>
                    <span className="text-[11px] text-ink-muted">{item.product.weight}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-ink-subtle hover:text-rose-600 transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-border-light pt-2.5">
                  <div className="flex items-center gap-2 bg-surface-warm border border-border-mid rounded-xl px-2.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-0.5 text-ink-light hover:text-ink-dark"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-ink-dark w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-0.5 text-ink-light hover:text-ink-dark"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-forest-700">
                      ₹{item.product.price * item.quantity}
                    </span>
                    <span className="text-[10px] text-ink-muted block">
                      (₹{item.product.price} ea)
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Actions */}
        {cart.length > 0 && (
          <div className="p-5 bg-cream-warm border-t border-border-light space-y-3">
            <div className="space-y-1.5 text-xs text-ink-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-dark">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Kitchen Delivery</span>
                <span className="font-semibold text-forest-700">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-ink-dark pt-2 border-t border-border-mid">
                <span>Total Amount</span>
                <span className="text-gold-600">₹{total}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-border-mid text-xs font-semibold text-ink-muted hover:bg-surface-warm transition-all"
              >
                View Full Bag
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-br from-[#D4AF37] via-[#C28833] to-[#92400E] hover:from-[#C28833] hover:to-[#78350F] text-white py-3 rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-ink-muted pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>Direct Kitchen Dispatch • Cash/UPI on Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
