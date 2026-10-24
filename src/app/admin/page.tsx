"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
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
  AlertCircle
} from "lucide-react";
import { CustomerOrder, ConsultationBooking, LadduProduct, OrderStatus, ConsultationStatus } from "@/types";
import { initialProducts } from "@/data/initialData";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState<"orders" | "consultations" | "inventory">("orders");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [products, setProducts] = useState<LadduProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "kas2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [resOrders, resConsultations, resProducts] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/consultations"),
        fetch("/api/products")
      ]);
      const dataOrders = await resOrders.json();
      const dataConsultations = await resConsultations.json();
      const dataProducts = await resProducts.json();

      if (dataOrders.success) setOrders(dataOrders.orders);
      if (dataConsultations.success) setConsultations(dataConsultations.consultations);
      if (dataProducts.success) setProducts(dataProducts.products);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: `Status marked as ${newStatus} in kitchen portal` })
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

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Received" || o.status === "Preparing").length;
  const pendingConsultations = consultations.filter((c) => c.status === "Pending Review").length;

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== "all" && o.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.phone.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-[#FAF5EB] to-[#F2E5D2]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8DEC9] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#1C3D2B] text-amber-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full inline-block">
              Kitchen Desk & Operations
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#27211A]">
              Dr. KAS’S Admin Portal
            </h1>
            <p className="text-xs text-[#7C6A53]">
              Enter authorized kitchen passcode to manage fresh dispatches, orders, and consultations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#4A3E31] block mb-1.5">
                Kitchen Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. admin or kas2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] focus:outline-none focus:ring-2 focus:ring-[#B45309] text-sm text-[#27211A]"
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. (Hint: use <strong>admin</strong> or <strong>kas2026</strong>)</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1C3D2B] hover:bg-[#132A1E] text-white py-3.5 rounded-xl font-bold text-sm shadow transition-all"
            >
              Access Kitchen Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs font-semibold text-[#7C6A53] hover:text-[#B45309] inline-flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#FCFAF6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DEC9] pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                Kitchen Operations Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
              Dr. KAS’S Kitchen & Order Portal
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-[#D5C9B3] text-xs font-semibold hover:bg-white text-[#4A3E31] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Data</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-[#1C3D2B] text-white text-xs font-semibold hover:bg-[#132A1E] transition-all"
            >
              View Storefront →
            </Link>
          </div>
        </div>

        {/* Real-time Operations Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#7C6A53]">Total Store Revenue</span>
            <div className="text-2xl font-serif font-bold text-[#B45309]">₹{totalRevenue.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">{orders.length} Verified Orders</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#7C6A53]">Active Kitchen Batches</span>
            <div className="text-2xl font-serif font-bold text-[#1C3D2B]">{pendingOrders}</div>
            <span className="text-[10px] text-amber-700 font-semibold">Preparing or Awaiting Dispatch</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#7C6A53]">Consultation Inquiries</span>
            <div className="text-2xl font-serif font-bold text-[#4338CA]">{consultations.length}</div>
            <span className="text-[10px] text-indigo-700 font-semibold">{pendingConsultations} Pending Review</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#7C6A53]">Active Signature Recipes</span>
            <div className="text-2xl font-serif font-bold text-[#27211A]">{products.length}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">100% Desi Ghee Formulations</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E8DEC9] space-x-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "orders"
                ? "border-[#B45309] text-[#B45309]"
                : "border-transparent text-[#7C6A53] hover:text-[#27211A]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "consultations"
                ? "border-[#B45309] text-[#B45309]"
                : "border-transparent text-[#7C6A53] hover:text-[#27211A]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultation Bookings ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "inventory"
                ? "border-[#B45309] text-[#B45309]"
                : "border-transparent text-[#7C6A53] hover:text-[#27211A]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Recipe Catalog ({products.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DEC9]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#8C7A65] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID (KAS-7821), name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl text-[#27211A]"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto">
                <Filter className="w-4 h-4 text-[#8C7A65]" />
                <span className="text-xs text-[#7C6A53]">Status:</span>
                {["all", "Received", "Preparing", "Dispatched", "Delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedStatus === st
                        ? "bg-[#1C3D2B] text-white"
                        : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#EFE7D8]"
                    }`}
                  >
                    {st === "all" ? "All Orders" : st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DEC9] text-[#7C6A53] text-sm">
                No orders match your filter criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#E8DEC9] p-5 shadow-2xs hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFE8D8] pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-serif font-bold text-base text-[#1C3D2B]">{order.id}</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          {order.paymentMethod.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#7C6A53]">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#7C6A53]">Status:</span>
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-[#FAF6EE] border border-[#D5C9B3] rounded-lg px-3 py-1 text-xs font-bold text-[#1C3D2B] focus:outline-none"
                        >
                          <option value="Received">Received</option>
                          <option value="Preparing">Preparing in Kitchen</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#4A3E31]">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C7A65] uppercase block">Customer</span>
                        <div className="font-bold text-[#27211A]">{order.customerName}</div>
                        <div className="text-[#6B5A47]">{order.phone}</div>
                        <div className="text-[#6B5A47]">{order.email}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#8C7A65] uppercase block">Shipping Address</span>
                        <div>{order.address}</div>
                        <div>{order.city} - {order.pincode}</div>
                      </div>

                      <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#EAE0CD]">
                        <span className="text-[10px] font-bold text-[#8C7A65] uppercase block">Order Total</span>
                        <div className="font-serif font-bold text-lg text-[#B45309]">₹{order.totalAmount}</div>
                        {order.orderNotes && (
                          <div className="text-[11px] text-[#7C6A53] mt-1 italic">
                            “{order.orderNotes}”
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-[#FCFAF6] p-3 rounded-xl border border-[#EFE8D8] text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#8C7A65] block">Items in this box:</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between font-medium">
                          <span>{item.quantity} × {item.productName}</span>
                          <span className="font-bold text-[#27211A]">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Consultations Management */}
        {activeTab === "consultations" && (
          <div className="space-y-4">
            {consultations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DEC9] text-[#7C6A53] text-sm">
                No consultation inquiries currently.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-[#E8DEC9] p-5 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-2">
                      <div>
                        <span className="font-serif font-bold text-sm text-[#1C3D2B]">{c.clientName}</span>
                        <span className="text-[10px] text-[#8C7A65] block">{c.id}</span>
                      </div>
                      <select
                        value={c.status}
                        disabled={updatingId === c.id}
                        onChange={(e) => handleUpdateConsultationStatus(c.id, e.target.value as ConsultationStatus)}
                        className="bg-[#FAF6EE] border border-[#D5C9B3] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1C3D2B]"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                      </select>
                    </div>

                    <div className="text-xs text-[#4A3E31] space-y-1">
                      <div><strong className="text-[#27211A]">Topic:</strong> {c.topic}</div>
                      <div><strong className="text-[#27211A]">Preferred Date & Time:</strong> {c.preferredDate} at {c.preferredTime}</div>
                      <div><strong className="text-[#27211A]">Phone:</strong> {c.phone} | <strong className="text-[#27211A]">Email:</strong> {c.email}</div>
                      {c.notes && (
                        <div className="bg-[#FAF6EE] p-2 rounded-lg border border-[#EAE0CD] text-[11px] mt-2 italic">
                          Client Notes: “{c.notes}”
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recipe Catalog */}
        {activeTab === "inventory" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E8DEC9] p-4 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                    {p.categoryLabel}
                  </span>
                  <span className="text-xs font-bold text-[#B45309]">₹{p.price}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#27211A]">{p.name}</h4>
                <p className="text-[11px] text-[#7C6A53] line-clamp-2">{p.tagline}</p>
                <div className="pt-2 border-t border-[#EFE8D8] flex items-center justify-between text-xs">
                  <span className="text-[#7C6A53]">{p.weight}</span>
                  <span className="text-emerald-700 font-bold">100% In Kitchen</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
