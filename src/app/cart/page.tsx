"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();

  const freeShippingThreshold = 1200;
  const freeShippingEligible = cartTotal >= freeShippingThreshold;
  const shippingFee = cartTotal === 0 ? 0 : freeShippingEligible ? 0 : 80;
  const total = cartTotal + shippingFee;

  return (
    <div className="py-10 sm:py-16 space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DEC9] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block">
            Your Selection
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#27211A] mt-1">
            Shopping Bag ({cartCount} {cartCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        <Link
          href="/shop"
          className="flex items-center space-x-1.5 text-xs font-bold text-[#1C3D2B] hover:text-[#B45309] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {cart.length === 0 ? (
        /* Empty Bag State */
        <div className="bg-white rounded-3xl p-12 sm:p-20 border border-[#E8DEC9] text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FAF5EB] flex items-center justify-center mx-auto text-[#8C7A65]">
            <ShoppingBag className="w-8 h-8 opacity-50" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-2xl text-[#27211A]">Your bag is empty</h2>
            <p className="text-xs sm:text-sm text-[#7C6A53] max-w-sm mx-auto">
              You haven't added any handcrafted dry fruits or millet laddus yet.
            </p>
          </div>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-[#B45309] hover:bg-[#92400E] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow transition-all"
            >
              <span>Explore The Laddu Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Cart With Items */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items */}
          <div className="lg:col-span-7 space-y-4">
            {/* Free Shipping Banner */}
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC7] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#4A3E31]">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>
                    {freeShippingEligible
                      ? "🎉 You qualified for Free Express Delivery!"
                      : `Add ₹${freeShippingThreshold - cartTotal} more for Free Delivery`}
                  </span>
                </span>
              </div>
              <div className="w-full bg-[#E5DAC6] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#1C3D2B] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-5 rounded-3xl border border-[#E8DEC9] space-y-4 shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {item.product.categoryLabel}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#27211A] mt-1">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-[#7C6A53]">{item.product.weight}</span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-[#8C7A65] hover:text-rose-600 transition-colors"
                      title="Remove laddu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#EFE8D8] pt-3">
                    <div className="flex items-center space-x-3 bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-0.5 text-[#5C4D3D] hover:text-[#27211A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#27211A] w-6 text-center">
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
                      <span className="font-serif font-bold text-lg text-[#1C3D2B]">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-[#7C6A53] block">
                        (₹{item.product.price} each)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DEC9] space-y-6 shadow-sm sticky top-28">
            <h3 className="font-serif font-bold text-lg text-[#27211A] border-b border-[#EFE8D8] pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#5C4D3D]">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#27211A]">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Kitchen Express Dispatch</span>
                <span className="font-semibold text-[#1C3D2B]">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#27211A] pt-3 border-t border-[#EFE8D8]">
                <span>Total Amount</span>
                <span className="text-[#B45309]">₹{total}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white py-4 rounded-2xl font-bold text-sm shadow-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-2 pt-2 border-t border-[#EFE8D8] text-[11px] text-[#7C6A53]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Homemade fresh with Desi Cow Ghee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#B45309] shrink-0" />
                <span>Cash/UPI on Delivery and Prepaid UPI Accepted</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
