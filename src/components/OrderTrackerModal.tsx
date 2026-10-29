"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Search, CheckCircle2, Clock, Truck, Home, AlertCircle, Loader2 } from "lucide-react";
import { CustomerOrder, OrderStatus } from "@/types";

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export default function OrderTrackerModal({
  isOpen,
  onClose,
  initialOrderId = ""
}: OrderTrackerModalProps) {
  const [searchTerm, setSearchTerm] = useState(initialOrderId);
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please verify the ID or phone number.");
      }
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialOrderId) {
      setSearchTerm(initialOrderId);
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId, fetchOrder]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchTerm);
  };

  const steps: { key: OrderStatus; label: string; desc: string; icon: React.ElementType }[] = [
    { key: "Received", label: "Order Received", desc: "Order logged and ingredients prepared", icon: Clock },
    { key: "Preparing", label: "Fresh Hand-Rolling", desc: "Slow roasted in desi cow ghee", icon: CheckCircle2 },
    { key: "Dispatched", label: "Dispatched", desc: "Sealed airtight & handed to courier", icon: Truck },
    { key: "Delivered", label: "Delivered", desc: "Enjoy your mindful laddu experience", icon: Home }
  ];

  const getStepStatus = (stepKey: OrderStatus) => {
    if (!order) return "upcoming";
    const statusOrder: OrderStatus[] = ["Received", "Preparing", "Dispatched", "Delivered"];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="fixed inset-0 z-[500] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-cream rounded-2xl max-w-xl w-full border border-border-mid shadow-2xl overflow-hidden relative my-8">
        {/* Header */}
        <div className="bg-cream-warm p-6 border-b border-border-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-gold-600" aria-hidden="true" />
            <h3 className="font-serif font-bold text-xl text-ink-dark">Track Your Fresh Batch</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-border-mid text-ink-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. KAS-7821) or Phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-border-mid rounded-xl focus:ring-2 focus:ring-gold-500/40 outline-none uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="flex items-center gap-1.5 bg-forest hover:bg-forest-deep text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gold-300" aria-hidden="true" />
              ) : (
                <>
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span>Track</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* If Order Found */}
          {order && (
            <div className="space-y-6 pt-2">
              {/* Order Info Card */}
              <div className="bg-white p-4 rounded-xl border border-border-light flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-ink-subtle block text-[10px] uppercase font-bold">Order ID</span>
                  <span className="font-mono font-bold text-sm text-ink-dark">{order.id}</span>
                </div>
                <div>
                  <span className="text-ink-subtle block text-[10px] uppercase font-bold">Customer</span>
                  <span className="font-semibold text-ink-dark">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-ink-subtle block text-[10px] uppercase font-bold">Current Status</span>
                  <span className="inline-block bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[11px]">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Stepper Progress */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Preparation & Delivery Progress</h4>
                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-mid">
                  {steps.map((step) => {
                    const status = getStepStatus(step.key);
                    const StepIcon = step.icon;

                    return (
                      <div key={step.key} className="relative flex items-start gap-3.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 -ml-6 border-2 transition-all ${
                            status === "completed"
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : status === "current"
                              ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                              : "bg-white border-border-dark text-ink-subtle"
                          }`}
                        >
                          <StepIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <div>
                          <div
                            className={`text-xs font-bold ${
                              status === "current"
                                ? "text-amber-800"
                                : status === "completed"
                                ? "text-emerald-800"
                                : "text-ink-muted"
                            }`}
                          >
                            {step.label}
                          </div>
                          <div className="text-[11px] text-ink-subtle">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Notes */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="bg-cream-warm p-4 rounded-xl border border-border-light space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">Kitchen Log Updates:</span>
                  <div className="space-y-1.5">
                    {order.statusHistory.map((h, i) => (
                      <div key={i} className="flex justify-between text-ink-light text-[11px]">
                        <span>• {h.note || h.status}</span>
                        <span className="text-ink-subtle">
                          {new Date(h.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items in order */}
              <div className="bg-white p-4 rounded-xl border border-border-light text-xs space-y-2">
                <span className="font-semibold text-ink-dark block border-b border-border-light pb-1.5">Ordered Laddus</span>
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-ink-light">
                    <span>{it.productName} × {it.quantity}</span>
                    <span className="font-semibold text-ink-dark">₹{it.price * it.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-border-light font-bold text-sm text-ink-dark">
                  <span>Total Amount</span>
                  <span className="text-gold-600">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}