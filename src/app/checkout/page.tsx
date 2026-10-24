"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  MessageCircle,
  AlertCircle,
  Loader2,
  Copy,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CustomerOrder } from "@/types";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "upi" as "upi" | "cod",
    orderNotes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<CustomerOrder | null>(null);
  const [copied, setCopied] = useState(false);

  const shippingFee = cartTotal >= 1200 ? 0 : 80;
  const totalAmount = cartTotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setError("Please complete your name, contact phone, delivery address, city, and pincode.");
      return;
    }

    if (cart.length === 0) {
      setError("Your shopping bag is empty.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal: cartTotal,
        shippingFee,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        orderNotes: formData.orderNotes.trim()
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to confirm order.");
      }

      setPlacedOrder(data.order);
      clearCart();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = () => {
    if (placedOrder) {
      navigator.clipboard.writeText(placedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10 sm:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {placedOrder ? (
        /* Order Confirmed Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E8DEC9] shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              Order Successfully Received
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#27211A]">
              Thank You, {placedOrder.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A47] max-w-md mx-auto">
              Our kitchen has received your order and will begin slow-roasting your fresh batch using pure desi cow ghee.
            </p>
          </div>

          {/* Tracking ID Box */}
          <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC7] flex items-center justify-between max-w-md mx-auto">
            <div className="text-left">
              <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider block">
                Your Order Tracking ID
              </span>
              <span className="font-mono font-bold text-xl text-[#1C3D2B]">{placedOrder.id}</span>
            </div>
            <button
              onClick={handleCopyId}
              className="flex items-center space-x-1 text-xs font-bold bg-white border border-[#DACFBB] px-3 py-1.5 rounded-lg text-[#4A3E31] hover:bg-[#FAF6EE]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* Order Details Brief */}
          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#E8DEC7] text-left text-xs space-y-2.5 max-w-md mx-auto">
            <span className="font-bold text-[#27211A] block border-b border-[#E8DFC9] pb-1.5">
              Order Items ({placedOrder.items.length})
            </span>
            <div className="space-y-1 text-[#5C4D3D]">
              {placedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.productName} × {it.quantity}</span>
                  <span className="font-bold text-[#27211A]">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E8DFC9] font-serif font-bold text-base text-[#27211A]">
              <span>Total Amount:</span>
              <span className="text-[#B45309]">₹{placedOrder.totalAmount}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Namaste Dr. KAS’S Team! 🙏 I placed order #${placedOrder.id} for ₹${placedOrder.totalAmount}. Please notify me when fresh batch is dispatched!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <Link
              href={`/track?id=${placedOrder.id}`}
              className="w-full flex items-center justify-center space-x-2 bg-[#1C3D2B] hover:bg-[#132A1E] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Track Live Status</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
              Frictionless Checkout
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#27211A]">
              Delivery Details & Payment
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#27211A] border-b border-[#EFE8D8] pb-2">
                1. Recipient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#27211A] border-b border-[#EFE8D8] pb-2">
                2. Delivery Destination
              </h3>
              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">Complete Street Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Flat/House number, Apartment/Society, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 110025"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">Gift Note / Kitchen Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Gift packing for grandparents, please add a warm greeting note"
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#27211A] border-b border-[#EFE8D8] pb-2">
                3. Payment Preference
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-4 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    formData.paymentMethod === "upi"
                      ? "border-[#B45309] bg-amber-50/70 font-bold text-[#27211A]"
                      : "border-[#E5DAC6] bg-[#FAF6EE] text-[#5C4D3D]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "upi" })}
                    className="accent-[#B45309]"
                  />
                  <span>Instant UPI / QR Code (Recommended)</span>
                </label>

                <label
                  className={`p-4 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "border-[#B45309] bg-amber-50/70 font-bold text-[#27211A]"
                      : "border-[#E5DAC6] bg-[#FAF6EE] text-[#5C4D3D]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    className="accent-[#B45309]"
                  />
                  <span>Cash / UPI on Delivery</span>
                </label>
              </div>
            </div>

            {/* Total & Confirm Button */}
            <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7C6A53] block font-semibold">Total Payable</span>
                <span className="font-serif font-bold text-2xl text-[#B45309]">₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Place Order (₹{totalAmount})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
