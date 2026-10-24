"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Home,
  AlertCircle,
  Loader2,
  Package,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { CustomerOrder, OrderStatus } from "@/types";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id") || "";

  const [searchTerm, setSearchTerm] = useState(queryId);
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (queryId) {
      setSearchTerm(queryId);
      lookupOrder(queryId);
    }
  }, [queryId]);

  const lookupOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please verify the Order ID or phone number.");
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
    lookupOrder(searchTerm);
  };

  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: "Received", label: "Order Received", desc: "Batch recipe queued in kitchen", icon: Clock },
    { key: "Preparing", label: "Hand-Rolling & Roasting", desc: "Crafted in small batches with cow ghee", icon: CheckCircle2 },
    { key: "Dispatched", label: "Dispatched in Airtight Box", desc: "Handed over to express courier", icon: Truck },
    { key: "Delivered", label: "Delivered to Doorstep", desc: "Mindful nourishment ready to enjoy", icon: Home }
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
    <div className="py-10 sm:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
          <Truck className="w-3.5 h-3.5 text-[#B45309]" />
          <span>Real-time Kitchen Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27211A] leading-tight">
          Track Your Fresh Batch
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5A47]">
          Enter your Order ID (e.g. <strong>KAS-7821</strong>) or your contact phone number.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. KAS-7821 or 9811234567"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none uppercase font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="flex items-center justify-center space-x-2 bg-[#B45309] hover:bg-[#92400E] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Display */}
        {order && (
          <div className="space-y-8 pt-4 border-t border-[#EFE8D8] animate-fadeIn">
            {/* Top Order Badge Card */}
            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC7] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider block">
                  Tracking ID
                </span>
                <span className="font-mono font-bold text-base text-[#1C3D2B]">{order.id}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider block">
                  Recipient
                </span>
                <span className="font-serif font-bold text-sm text-[#27211A]">{order.customerName}</span>
              </div>

              <div>
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider block">
                  Current Status
                </span>
                <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-xs inline-block">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C6A53] block">
                Preparation & Dispatch Timeline:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {steps.map((st) => {
                  const state = getStepStatus(st.key);
                  const Icon = st.icon;

                  return (
                    <div
                      key={st.key}
                      className={`p-4 rounded-2xl border transition-all space-y-1.5 ${
                        state === "completed"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                          : state === "current"
                          ? "bg-amber-50 border-amber-400 text-amber-950 shadow-sm scale-102"
                          : "bg-[#FAF6EE] border-[#E8DEC7] text-[#8C7A65]"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${state === "current" ? "text-[#B45309]" : ""}`} />
                        <span className="font-bold text-xs">{st.label}</span>
                      </div>
                      <p className="text-[11px] opacity-80 leading-snug">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status History */}
            {order.statusHistory && order.statusHistory.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC7] space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C6A53] block">
                  Kitchen Log Updates:
                </span>
                <div className="space-y-1.5">
                  {order.statusHistory.map((h, i) => (
                    <div key={i} className="flex justify-between text-[#4A3E31] text-[11px]">
                      <span>• {h.note || h.status}</span>
                      <span className="text-[#8C7A65]">
                        {new Date(h.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Items Summary */}
            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC7] space-y-3 text-xs">
              <span className="font-bold text-[#27211A] block border-b border-[#E8DFC9] pb-2">
                Order Items ({order.items.length})
              </span>
              <div className="space-y-1.5 text-[#4A3E31]">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.productName} × {it.quantity}</span>
                    <span className="font-bold text-[#27211A]">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8DFC9] font-serif font-bold text-base text-[#27211A]">
                <span>Total Amount</span>
                <span className="text-[#B45309]">₹{order.totalAmount}</span>
              </div>
            </div>

            {/* Concierge Assistance */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
              <span className="text-[#7C6A53]">
                Have a special packaging or delivery inquiry?
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Namaste Dr. KAS’S! I have a question regarding my order #${order.id}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-[#25D366] font-bold hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Kitchen Desk on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7C6A53]">Loading order tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
