"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (initialOrderId) {
      setSearchTerm(initialOrderId);
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  if (!isOpen) return null;

  const fetchOrder = async (id: string) => {
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
    } catch (err: any) {
      setError(err.message || "Failed to load order.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchTerm);
  };

  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-xl w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative my-8">
        {/* Header */}
        <div className="bg-[#FAF5EB] p-6 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-[#C28833]" />
            <h3 className="font-serif font-bold text-xl text-[#27211A]">Track Your Fresh Batch</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="flex items-center space-x-1.5 bg-[#1C3D2B] hover:bg-[#132A1E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* If Order Found */}
          {order && (
            <div className="space-y-6 pt-2">
              {/* Order Info Card */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC7] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#7C6A53] block text-[10px] uppercase font-bold">Order ID</span>
                  <span className="font-mono font-bold text-sm text-[#1C3D2B]">{order.id}</span>
                </div>
                <div>
                  <span className="text-[#7C6A53] block text-[10px] uppercase font-bold">Customer</span>
                  <span className="font-semibold text-[#27211A]">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-[#7C6A53] block text-[10px] uppercase font-bold">Current Status</span>
                  <span className="inline-block bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[11px]">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Stepper Progress */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
                  Preparation & Delivery Progress
                </h4>
                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DAC6]">
                  {steps.map((step) => {
                    const status = getStepStatus(step.key);
                    const StepIcon = step.icon;

                    return (
                      <div key={step.key} className="relative flex items-start space-x-3.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 -ml-6 border-2 transition-all ${
                            status === "completed"
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : status === "current"
                              ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                              : "bg-white border-[#DACFBB] text-[#8C7A65]"
                          }`}
                        >
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div
                            className={`text-xs font-bold ${
                              status === "current"
                                ? "text-amber-800"
                                : status === "completed"
                                ? "text-emerald-800"
                                : "text-[#7C6A53]"
                            }`}
                          >
                            {step.label}
                          </div>
                          <div className="text-[11px] text-[#8C7A65]">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Notes */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC7] space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C6A53]">
                    Kitchen Log Updates:
                  </span>
                  <div className="space-y-1.5">
                    {order.statusHistory.map((h, i) => (
                      <div key={i} className="flex justify-between text-[#5C4D3D] text-[11px]">
                        <span>• {h.note || h.status}</span>
                        <span className="text-[#8C7A65]">
                          {new Date(h.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items in order */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC7] text-xs space-y-2">
                <span className="font-semibold text-[#27211A] block border-b border-[#EFE8D8] pb-1.5">
                  Ordered Laddus
                </span>
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[#5C4D3D]">
                    <span>{it.productName} × {it.quantity}</span>
                    <span className="font-semibold text-[#27211A]">₹{it.price * it.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-[#EFE8D8] font-bold text-sm text-[#27211A]">
                  <span>Total Amount</span>
                  <span className="text-[#B45309]">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
