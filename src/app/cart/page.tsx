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
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Container, Section, SectionHeader, Button, Card, CardContent, Badge } from "@/components/ui";

export default function CartPage() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();

  const freeShippingThreshold = 1200;
  const freeShippingEligible = cartTotal >= freeShippingThreshold;
  const shippingFee = cartTotal === 0 ? 0 : freeShippingEligible ? 0 : 80;
  const total = cartTotal + shippingFee;

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-6 animate-fade-in-up">
          <div>
            <Badge variant="primary" size="sm">
              Your Selection
            </Badge>
            <h1 className="text-3xl font-serif font-bold text-ink-dark mt-1">
              Shopping Bag ({cartCount} {cartCount === 1 ? "Item" : "Items"})
            </h1>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <Card variant="elevated" padding="lg" className="text-center space-y-5 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-cream-warm flex items-center justify-center mx-auto text-ink-subtle">
              <ShoppingBag className="w-8 h-8 opacity-50" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-2xl text-ink-dark">Your bag is empty</h2>
              <p className="text-xs sm:text-sm text-ink-muted max-w-sm mx-auto">
                You haven't added any handcrafted dry fruits or millet laddus yet.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow transition-all"
            >
              <span>Explore The Laddu Collection</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Card>
        ) : (
          /* Cart With Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free Shipping Banner */}
              <Card variant="outlined" padding="md" className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>
                      {freeShippingEligible
                        ? "🎉 You qualified for Free Express Delivery!"
                        : `Add ₹${freeShippingThreshold - cartTotal} more for Free Delivery`}
                    </span>
                  </span>
                </div>
                <div className="w-full bg-border-mid rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-forest h-2 rounded-full transition-all duration-300"
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
              </Card>

              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.product.id} variant="outlined" padding="md" className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="primary" size="sm">
                          {item.product.categoryLabel}
                        </Badge>
                        <h3 className="font-serif font-bold text-base text-ink-dark mt-1">
                          {item.product.name}
                        </h3>
                        <span className="text-xs text-ink-muted">{item.product.weight}</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-ink-subtle hover:text-rose-600 transition-colors"
                        title="Remove laddu"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-border-light pt-3">
                      <div className="flex items-center gap-3 bg-surface-warm border border-border-mid rounded-xl px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-0.5 text-ink-light hover:text-ink-dark"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-ink-dark w-6 text-center">
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
                        <span className="font-serif font-bold text-lg text-forest-700">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-ink-muted block">
                          (₹{item.product.price} each)
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5">
              <Card variant="elevated" padding="lg" className="space-y-6 sticky top-28">
                <h3 className="font-serif font-bold text-lg text-ink-dark border-b border-border-light pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-ink-muted">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold text-ink-dark">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kitchen Express Dispatch</span>
                    <span className="font-semibold text-forest-700">
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-ink-dark pt-3 border-t border-border-light">
                    <span>Total Amount</span>
                    <span className="text-gold-600">₹{total}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:shadow-gold-lg text-white py-4 rounded-2xl font-bold text-sm shadow-gold transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <div className="space-y-2 pt-2 border-t border-border-light text-[11px] text-ink-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>100% Homemade • Handmade • Desi Cow Ghee • No Artificial Sweetener</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold-600 shrink-0" aria-hidden="true" />
                    <span>Cash/UPI on Delivery and Prepaid UPI Accepted</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
