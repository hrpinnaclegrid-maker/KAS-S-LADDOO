"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, Truck, MessageCircle, AlertCircle, Loader2 } from "lucide-react";
import { CartItem, CustomerOrder } from "@/types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (order: CustomerOrder) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onOrderSuccess
}: CheckoutModalProps) {
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

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 1200 ? 0 : 80;
  const totalAmount = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setError("Please fill in your name, contact phone, delivery address, city, and pincode.");
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
        subtotal,
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
        throw new Error(data.error || "Failed to place order.");
      }

      onOrderSuccess(data.order);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-xl w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative my-8">
        {/* Header */}
        <div className="bg-[#FAF5EB] p-6 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Secure Checkout
            </span>
            <h3 className="font-serif font-bold text-xl text-[#27211A]">
              Delivery Details & Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
              Email Address (Optional for order tracking)
            </label>
            <input
              type="email"
              placeholder="priya@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
              Complete Delivery Address *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Flat/House No., Building, Street, Landmark"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none resize-none"
            />
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                City / Town *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Delhi"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 110025"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E31] mb-1.5">
              Payment Preference
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <label
                className={`p-3 rounded-xl border flex items-center space-x-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "upi"
                    ? "border-[#C28833] bg-amber-50/60 font-semibold text-[#27211A]"
                    : "border-[#E5DAC6] bg-white text-[#5C4D3D]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "upi" })}
                  className="accent-[#C28833]"
                />
                <span>Instant UPI / QR Code</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center space-x-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "cod"
                    ? "border-[#C28833] bg-amber-50/60 font-semibold text-[#27211A]"
                    : "border-[#E5DAC6] bg-white text-[#5C4D3D]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                  className="accent-[#C28833]"
                />
                <span>Cash / UPI on Delivery</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
              Order Notes / Gift Message (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Please pack with extra love for grandmother's birthday"
              value={formData.orderNotes}
              onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
            />
          </div>

          {/* Total & Submit */}
          <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#7C6A53] block">Total Payable</span>
              <span className="font-serif font-bold text-xl text-[#B45309]">₹{totalAmount}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#1C3D2B] to-[#122B1E] hover:from-[#163324] hover:to-[#0D1F15] text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Confirm Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
