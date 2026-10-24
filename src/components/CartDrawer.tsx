"use client";

import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1200;
  const freeShippingEligible = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 ? 0 : freeShippingEligible ? 0 : 80;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#FCFAF6] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DAC6]">
        {/* Drawer Header */}
        <div className="p-5 bg-[#FAF5EB] border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C28833]" />
            <h3 className="font-serif font-bold text-lg text-[#27211A]">Your Laddu Bag</h3>
            <span className="text-xs bg-[#1C3D2B] text-amber-300 font-semibold px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="bg-[#FAF6EE] px-5 py-3 border-b border-[#E8DEC8]">
          <div className="flex items-center justify-between text-xs font-medium text-[#4A3E31] mb-1.5">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {freeShippingEligible
                  ? "🎉 You qualified for Free Express Delivery!"
                  : `Add ₹${freeShippingThreshold - subtotal} more for Free Delivery`}
              </span>
            </span>
          </div>
          <div className="w-full bg-[#E5DAC6] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#1C3D2B] h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`
              }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#8C7A65]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#27211A]">Your bag is empty</h4>
              <p className="text-xs text-[#7C6A53] max-w-xs mx-auto">
                Explore our dry fruits and millet laddus handcrafted with love and nutritional wisdom.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E8DEC9] space-y-3 shadow-2xs"
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
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1 text-[#8C7A65] hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-[#EFE8D8] pt-2">
                  <div className="flex items-center space-x-2 bg-[#FAF6EE] border border-[#E5DAC6] rounded-lg px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-0.5 text-[#5C4D3D] hover:text-[#27211A]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#27211A] w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
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

        {/* Drawer Footer & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FAF5EB] border-t border-[#E8DEC8] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C4D3D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#27211A]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span className="font-semibold text-[#1C3D2B]">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#27211A] pt-2 border-t border-[#E5DAC6]">
                <span>Total Amount</span>
                <span className="text-[#B45309]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#C28833] to-[#996515] hover:from-[#B37825] hover:to-[#7A500D] text-white py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#7C6A53] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct Kitchen Dispatch • Cash/UPI on Delivery Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
