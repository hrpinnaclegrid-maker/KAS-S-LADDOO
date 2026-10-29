"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ShieldCheck,
  Package,
  Calendar,
  Layers,
  CheckCircle,
  Clock,
  Truck,
  RefreshCw,
  Lock,
  ChevronRight,
  DollarSign,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle,
  CreditCard,
  User,
} from "lucide-react";
import { CustomerOrder, ConsultationBooking, LadduProduct, OrderStatus, ConsultationStatus } from "@/types";
import { Container, Section, Button, Card, Badge, Input } from "@/components/ui";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: LadduProduct[];
  onProductsUpdate: () => void;
}

export default function AdminDashboardModal({
  isOpen,
  onClose,
  products,
  onProductsUpdate
}: AdminDashboardModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState<"orders" | "consultations" | "inventory">("orders");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loadTrigger, setLoadTrigger] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resOrders, resConsultations] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/consultations")
      ]);
      const dataOrders = await resOrders.json();
      const dataConsultations = await resConsultations.json();

      if (dataOrders.success) setOrders(dataOrders.orders);
      if (dataConsultations.success) setConsultations(dataConsultations.consultations);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setLoadTrigger(prev => prev + 1);
    }
  }, [isOpen, isAuthenticated]);

  useEffect(() => {
    if (loadTrigger > 0 && isOpen && isAuthenticated) {
      loadData();
    }
  }, [loadTrigger, loadData]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "kas2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      setPasscodeError(false);
      loadData();
    } else {
      setPasscodeError(true);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: `Status updated to ${newStatus} in admin portal` })
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateConsultationStatus = async (consultationId: string, newStatus: ConsultationStatus) => {
    setUpdatingId(consultationId);
    try {
      const res = await fetch("/api/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: consultationId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setConsultations((prev) => prev.map((c) => (c.id === consultationId ? data.consultation : c)));
      }
    } catch (err) {
      console.error("Error updating consultation:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStock = async (product: LadduProduct) => {
    setUpdatingId(product.id);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          updates: { inStock: !product.inStock }
        })
      });
      const data = await res.json();
      if (data.success) {
        onProductsUpdate();
      }
    } catch (err) {
      console.error("Error toggling stock:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Received" || o.status === "Preparing").length;
  const pendingConsultations = consultations.filter((c) => c.status === "Pending Review").length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-5xl w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1C3D2B] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest">
                Kitchen & Practice Management
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF5EB]">
                Dr. KAS’S Admin Portal
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={loadData}
                disabled={loading}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center space-x-1"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Sync</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lock Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-5 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF5EB] border border-[#E8DFC9] flex items-center justify-center mx-auto text-[#1C3D2B]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-[#27211A]">Admin Access Required</h4>
              <p className="text-xs text-[#7C6A53]">
                Enter kitchen passkey to manage customer orders, consultations, and inventory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Enter Passkey (e.g. kas2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
              {passcodeError && (
                <div className="text-xs text-rose-600 font-medium">
                  Incorrect passkey. (Default hint: kas2026)
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#1C3D2B] hover:bg-[#132A1E] text-white py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider">
                  Total Orders
                </span>
                <div className="text-2xl font-serif font-bold text-[#27211A]">{orders.length}</div>
                <span className="text-[10px] text-emerald-700 font-medium">Logged & active</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider">
                  Revenue (INR)
                </span>
                <div className="text-2xl font-serif font-bold text-[#B45309]">₹{totalRevenue}</div>
                <span className="text-[10px] text-[#7C6A53]">Completed & in progress</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider">
                  Pending Kitchen Batches
                </span>
                <div className="text-2xl font-serif font-bold text-amber-600">{pendingOrders}</div>
                <span className="text-[10px] text-amber-800 font-medium">Needs rolling / packing</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider">
                  Consultation Requests
                </span>
                <div className="text-2xl font-serif font-bold text-[#1C3D2B]">{pendingConsultations}</div>
                <span className="text-[10px] text-[#7C6A53]">Awaiting Dr. Shams review</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-2 border-b border-[#E8DEC8] pb-3">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "orders"
                    ? "bg-[#1C3D2B] text-white shadow-sm"
                    : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Customer Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("consultations")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "consultations"
                    ? "bg-[#1C3D2B] text-white shadow-sm"
                    : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Consultations ({consultations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "inventory"
                    ? "bg-[#1C3D2B] text-white shadow-sm"
                    : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Laddu Inventory ({products.length})</span>
              </button>
            </div>

            {/* Tab 1: Orders Management */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#7C6A53]">No orders placed yet.</div>
                  ) : (
                    orders.map((o) => (
                      <div
                        key={o.id}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DEC9] space-y-3 shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE8D8] pb-3">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono font-bold text-sm text-[#1C3D2B] bg-[#FAF6EE] px-2.5 py-1 rounded-lg border border-[#E8DEC7]">
                              {o.id}
                            </span>
                            <div>
                              <span className="font-serif font-bold text-sm text-[#27211A] block">
                                {o.customerName}
                              </span>
                              <span className="text-[11px] text-[#7C6A53]">
                                📞 {o.phone} {o.email ? `• ✉️ ${o.email}` : ""}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-[#7C6A53]">Status:</span>
                            <select
                              value={o.status}
                              disabled={updatingId === o.id}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E5DAC6] bg-[#FAF6EE] text-[#27211A] outline-none"
                            >
                              <option value="Received">Received</option>
                              <option value="Preparing">Preparing (Rolling)</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Order items & address details */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                          <div className="md:col-span-7 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#7C6A53]">
                              Items Ordered:
                            </span>
                            <div className="space-y-1">
                              {o.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between text-[#4A3E31]">
                                  <span>• {it.productName} × {it.quantity}</span>
                                  <span className="font-medium">₹{it.price * it.quantity}</span>
                                </div>
                              ))}
                            </div>
                            {o.orderNotes && (
                              <p className="text-[11px] italic text-[#8C7A65] pt-1">
                                Note: “{o.orderNotes}”
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-5 bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DEC7] space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#7C6A53]">
                              Delivery Address:
                            </span>
                            <p className="text-[#3D3328] text-[11px] leading-relaxed">
                              {o.address}, {o.city} - {o.pincode}
                            </p>
                            <div className="flex justify-between items-center pt-1 border-t border-[#EAE0CD] text-xs font-bold">
                              <span>Total: ₹{o.totalAmount}</span>
                              <span className="text-[10px] uppercase text-[#1C3D2B]">
                                {o.paymentMethod.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Consultations Management */}
            {activeTab === "consultations" && (
              <div className="space-y-3">
                {consultations.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#7C6A53]">No consultations booked yet.</div>
                ) : (
                  consultations.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DEC9] space-y-3 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE8D8] pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#1C3D2B] bg-[#FAF6EE] px-2 py-0.5 rounded">
                            {c.id}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-[#27211A] inline-block ml-2">
                            {c.clientName}
                          </h4>
                          <span className="text-xs text-[#7C6A53] block sm:inline-block sm:ml-2">
                            📞 {c.phone} {c.email ? `• ✉️ ${c.email}` : ""}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-[#7C6A53]">Booking Status:</span>
                          <select
                            value={c.status}
                            disabled={updatingId === c.id}
                            onChange={(e) =>
                              handleUpdateConsultationStatus(c.id, e.target.value as ConsultationStatus)
                            }
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E5DAC6] bg-[#FAF6EE] text-[#27211A] outline-none"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Rescheduled">Rescheduled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7C6A53] block">
                            Requested Focus Topic:
                          </span>
                          <p className="font-medium text-[#27211A]">{c.topic}</p>
                          <span className="text-[11px] text-[#7C6A53]">
                            📅 {c.preferredDate} ({c.preferredTime})
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7C6A53] block">
                            Client Notes / Challenges:
                          </span>
                          <p className="text-[#5C4D3D] text-[11px] italic">
                            {c.notes || "No additional notes provided."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Inventory Management */}
            {activeTab === "inventory" && (
              <div className="space-y-3">
                <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DFC9] text-xs text-[#5C4D3D]">
                  💡 Toggle stock availability in real-time. Changes immediately update across the customer store.
                </div>

                <div className="space-y-2">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white p-4 rounded-xl border border-[#E8DEC9] flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="max-w-md">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          {p.categoryLabel}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#27211A] mt-0.5">{p.name}</h5>
                        <p className="text-[11px] text-[#7C6A53]">{p.weight} • ₹{p.price}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            p.inStock ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>

                        <button
                          onClick={() => handleToggleStock(p)}
                          disabled={updatingId === p.id}
                          className="px-3.5 py-1.5 rounded-lg border border-[#DACFBB] text-xs font-semibold hover:bg-[#FAF6EE] transition-colors"
                        >
                          {p.inStock ? "Mark Out of Stock" : "Mark Available"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
