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
    setIsCartDrawerOpen
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 1200;
  const freeShippingEligible = cartTotal >= freeShippingThreshold;
  const shippingFee = cartTotal === 0 ? 0 : freeShippingEligible ? 0 : 80;
  const total = cartTotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#FCFAF6] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DAC6]">
        {/* Top Header */}
        <div className="p-5 bg-[#FAF5EB] border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#B45309]" />
            <h3 className="font-serif font-bold text-lg text-[#27211A]">Your Laddu Bag</h3>
            <span className="text-xs bg-[#1C3D2B] text-amber-300 font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-xl hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-[#FAF6EE] px-5 py-3 border-b border-[#E8DEC8]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A3E31] mb-1.5">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>
                {freeShippingEligible
                  ? "🎉 You qualified for Free Express Delivery!"
                  : `Add ₹${freeShippingThreshold - cartTotal} more for Free Delivery`}
              </span>
            </span>
          </div>
          <div className="w-full bg-[#E5DAC6] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#1C3D2B] h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`
              }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C7A65]">
                <ShoppingBag className="w-8 h-8 opacity-50" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#27211A]">Your bag is empty</h4>
              <p className="text-xs text-[#7C6A53] max-w-xs mx-auto">
                Explore our dry fruits and millet laddus handcrafted with love and mindful nutrition.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartDrawerOpen(false)}
                className="inline-block bg-[#B45309] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#92400E] transition-all shadow-sm"
              >
                Browse The Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div className="pr-2">
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {item.product.categoryLabel}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#27211A] mt-1">
                      {item.product.name}
                    </h5>
                    <span className="text-[11px] text-[#7C6A53]">{item.product.weight}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-[#8C7A65] hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-[#EFE8D8] pt-2.5">
                  <div className="flex items-center space-x-2 bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl px-2.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-0.5 text-[#5C4D3D] hover:text-[#27211A]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#27211A] w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-0.5 text-[#5C4D3D] hover:text-[#27211A]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1C3D2B]">
                      ₹{item.product.price * item.quantity}
                    </span>
                    <span className="text-[10px] text-[#7C6A53] block">
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
          <div className="p-5 bg-[#FAF5EB] border-t border-[#E8DEC8] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C4D3D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#27211A]">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Kitchen Delivery</span>
                <span className="font-semibold text-[#1C3D2B]">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#27211A] pt-2 border-t border-[#E5DAC6]">
                <span>Total Amount</span>
                <span className="text-[#B45309]">₹{total}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-[#DACFBB] text-xs font-semibold text-[#4A3E31] hover:bg-[#FAF6EE] transition-all"
              >
                View Full Bag
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white py-3 rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#7C6A53] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct Kitchen Dispatch • Cash/UPI on Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
