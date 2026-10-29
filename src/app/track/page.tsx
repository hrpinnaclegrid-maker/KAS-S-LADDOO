"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
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
  Sparkles,
  User,
  MapPin,
} from "lucide-react";
import { CustomerOrder, OrderStatus } from "@/types";
import { Container, Section, SectionHeader, Button, Card, Badge, Input } from "@/components/ui";

const steps: { key: OrderStatus; label: string; desc: string; icon: React.ElementType }[] = [
  { key: "Received", label: "Order Received", desc: "Batch recipe queued in kitchen", icon: Clock },
  { key: "Preparing", label: "Hand-Rolling & Roasting", desc: "Crafted in small batches with cow ghee", icon: CheckCircle2 },
  { key: "Dispatched", label: "Dispatched in Airtight Box", desc: "Handed over to express courier", icon: Truck },
  { key: "Delivered", label: "Delivered to Doorstep", desc: "Mindful nourishment ready to enjoy", icon: Home },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id") || "";

  const [searchTerm, setSearchTerm] = useState(queryId);
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupOrder = useCallback(async (id: string) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (queryId) {
      lookupOrder(queryId);
    }
  }, [queryId, lookupOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrder(searchTerm);
  };

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
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="lg">
        {/* Header */}
        <SectionHeader
          label="Real-time Kitchen Tracking"
          icon={<Truck className="w-5 h-5 text-gold-600" />}
          title="Track Your Fresh Batch"
          description={<>Enter your Order ID (e.g. <strong>KAS-7821</strong>) or your contact phone number.</>}
          align="center"
        />

        {/* Search Input */}
        <Card variant="elevated" padding="lg" className="space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="e.g. KAS-7821 or 9811234567"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                className="uppercase font-mono"
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              disabled={!searchTerm.trim()}
              className="!bg-forest !text-white disabled:opacity-100"
              leftIcon={loading ? null : <Search className="w-4 h-4 text-white" />}
            >
              {loading ? "Tracking..." : "Track Status"}
            </Button>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* Order Display */}
          {order && (
            <div className="space-y-8 pt-4 border-t border-border-light animate-fade-in-up">
              {/* Top Order Badge Card */}
              <Card variant="outlined" padding="md" className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">Tracking ID</span>
                  <span className="font-mono font-bold text-base text-ink-dark">{order.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">Recipient</span>
                  <span className="font-serif font-bold text-sm text-ink-dark">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">Current Status</span>
                  <Badge variant="primary" size="md">{order.status}</Badge>
                </div>
              </Card>

              {/* Visual Timeline Stepper */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted block">Preparation & Dispatch Timeline:</span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {steps.map((st) => {
                    const state = getStepStatus(st.key);
                    const Icon = st.icon;

                    return (
                      <Card
                        key={st.key}
                        variant={state === "completed" ? "default" : state === "current" ? "elevated" : "outlined"}
                        padding="md"
                        className={`space-y-1.5 transition-all ${
                          state === "completed" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : ""
                        } ${state === "current" ? "bg-amber-50 border-amber-300 text-amber-900 shadow-sm scale-102" : ""} ${state === "upcoming" ? "bg-cream border-border-light text-ink-subtle" : ""}`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${state === "current" ? "text-gold-600" : state === "completed" ? "text-emerald-600" : "text-ink-subtle"}`} aria-hidden="true" />
                          <span className="font-bold text-xs">{st.label}</span>
                        </div>
                        <p className="text-[11px] opacity-80 leading-snug">{st.desc}</p>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Status History */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <Card variant="default" padding="md" className="space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">Kitchen Log Updates:</span>
                  <div className="space-y-1.5">
                    {order.statusHistory.map((h, i) => (
                      <div key={i} className="flex justify-between text-ink-muted text-[11px]">
                        <span>• {h.note || h.status}</span>
                        <span className="text-ink-subtle">
                          {new Date(h.timestamp).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Items Summary */}
              <Card variant="outlined" padding="lg" className="space-y-3 text-xs">
                <span className="font-bold text-ink-dark block border-b border-border-light pb-2">Order Items ({order.items.length})</span>
                <div className="space-y-1.5 text-ink-muted">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.productName} × {it.quantity}</span>
                      <span className="font-bold text-ink-dark">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 border-t border-border-light font-serif font-bold text-base text-ink-dark">
                  <span>Total Amount</span>
                  <span className="text-gold-600">₹{order.totalAmount}</span>
                </div>
              </Card>

              {/* Concierge Assistance */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                <span className="text-ink-muted">Have a special packaging or delivery inquiry?</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Namaste Dr. KAS'S! I have a question regarding my order #${order.id}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-green-600 font-bold hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Message Kitchen Desk on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-ink-muted">Loading order tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
