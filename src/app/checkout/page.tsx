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
  ShoppingBag,
  User,
  Mail,
  MapPin,
  Phone,
  CreditCard,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/context/CartContext";
import { CustomerOrder } from "@/types";
import { Container, Section, Button, Input, Textarea, Card, CardContent, Badge } from "@/components/ui";

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
    orderNotes: "",
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
          price: item.product.price,
        })),
        subtotal: cartTotal,
        shippingFee,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        orderNotes: formData.orderNotes.trim(),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="lg">
        {placedOrder ? (
          /* Order Confirmed Screen */
          <div className="bg-white rounded-2xl p-8 sm:p-14 border border-border-light shadow-xl text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <Badge variant="success" size="md">
                Order Successfully Received
              </Badge>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-ink-dark">
                Thank You, {placedOrder.customerName}!
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
                Our kitchen has received your order and will begin slow-roasting your fresh batch using pure desi cow ghee.
              </p>
            </div>

            {/* Tracking ID Box */}
            <Card variant="outlined" padding="md" className="max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">
                  Your Order Tracking ID
                </span>
                <span className="font-mono font-bold text-xl text-ink-dark">{placedOrder.id}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCopyId}>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Button>
            </Card>

            {/* Order Details Brief */}
            <Card variant="default" padding="md" className="max-w-md mx-auto text-left text-xs space-y-2.5">
              <span className="font-bold text-ink-dark block border-b border-border-light pb-1.5">
                Order Items ({placedOrder.items.length})
              </span>
              <div className="space-y-1 text-ink-muted">
                {placedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.productName} × {it.quantity}</span>
                    <span className="font-bold text-ink-dark">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2 border-t border-border-light font-serif font-bold text-base text-ink-dark">
                <span>Total Amount:</span>
                <span className="text-gold-600">₹{placedOrder.totalAmount}</span>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Namaste Dr. KAS'S Team! 🙏 I placed order #${placedOrder.id} for ₹${placedOrder.totalAmount}. Please notify me when fresh batch is dispatched!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:translate-y-0 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                }}
              >
                <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
                <span style={{ color: "#FFFFFF" }}>Confirm on WhatsApp</span>
              </a>

              <Link
                href={`/track?id=${placedOrder.id}`}
                className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-deep text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <Truck className="w-4 h-4 text-gold-300" aria-hidden="true" />
                <span>Track Live Status</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="space-y-8">
            <div className="text-center space-y-2 animate-fade-in-up">
              <Badge variant="primary" size="md">
                Frictionless Checkout
              </Badge>
              <h1 className="text-3xl font-serif font-bold text-ink-dark">
                Delivery Details & Payment
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-10 border border-border-light shadow-sm space-y-8">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in" role="alert">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-ink-dark border-b border-border-light pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gold-600" aria-hidden="true" />
                  1. Recipient Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    leftIcon={<User className="w-4 h-4" />}
                  />
                  <Input
                    label="WhatsApp Phone Number *"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                </div>

                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-ink-dark border-b border-border-light pb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-600" aria-hidden="true" />
                  2. Delivery Destination
                </h3>
                <Textarea
                  label="Complete Street Address *"
                  required
                  placeholder="Flat/House number, Apartment/Society, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City / Town *"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    leftIcon={<MapPin className="w-4 h-4" />}
                  />
                  <Input
                    label="Pincode *"
                    required
                    placeholder="e.g. 110025"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>

                <Input
                  label="Gift Note / Kitchen Instructions (Optional)"
                  placeholder="e.g. Gift packing for grandparents, please add a warm greeting note"
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-ink-dark border-b border-border-light pb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold-600" aria-hidden="true" />
                  3. Payment Preference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === "upi"
                        ? "border-gold-500 bg-amber-50/70 font-bold text-ink-dark"
                        : "border-border-mid bg-surface-warm text-ink-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "upi" })}
                      className="accent-gold-600"
                    />
                    <span>Instant UPI / QR Code (Recommended)</span>
                  </label>

                  <label
                    className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-gold-500 bg-amber-50/70 font-bold text-ink-dark"
                        : "border-border-mid bg-surface-warm text-ink-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="accent-gold-600"
                    />
                    <span>Cash / UPI on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Total & Confirm Button */}
              <div className="pt-4 border-t border-border-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[11px] text-ink-muted block font-semibold">Total Payable</span>
                  <span className="font-serif font-bold text-2xl text-gold-600">₹{totalAmount}</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth={true}
                  disabled={loading || cart.length === 0}
                  isLoading={loading}
                  leftIcon={loading ? null : <CheckCircle2 className="w-4 h-4" />}
                >
                  {loading ? "Confirming Order..." : `Place Order (₹${totalAmount})`}
                </Button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}