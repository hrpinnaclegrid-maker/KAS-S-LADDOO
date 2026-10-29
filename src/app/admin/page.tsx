"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  AlertCircle,
  CreditCard,
  User,
  Pencil,
  Trash2,
} from "lucide-react";
import { CustomerOrder, ConsultationBooking, LadduProduct, OrderStatus, ConsultationStatus } from "@/types";
import { initialProducts } from "@/data/initialData";
import { Container, Section, Button, Card, Badge, Input } from "@/components/ui";

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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resOrders, resConsultations, resProducts] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/consultations"),
        fetch("/api/products"),
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
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

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
        body: JSON.stringify({ status: newStatus, note: `Status marked as ${newStatus} in kitchen portal` }),
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
        body: JSON.stringify({ id: consultationId, status: newStatus }),
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

  const handleEditProduct = async (product: LadduProduct) => {
    const name = window.prompt("Product name", product.name)?.trim();
    if (!name) return;
    const price = Number(window.prompt("Price in INR", String(product.price)));
    if (!Number.isFinite(price) || price <= 0) return;
    setUpdatingId(product.id);
    try {
      const res = await fetch("/api/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: product.id, updates: { name, price } }) });
      const data = await res.json();
      if (data.success) setProducts((prev) => prev.map((p) => (p.id === product.id ? data.product : p)));
    } finally { setUpdatingId(null); }
  };

  const handleDeleteProduct = async (product: LadduProduct) => {
    if (!window.confirm(`Delete “${product.name}” from the catalog?`)) return;
    setUpdatingId(product.id);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(product.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } finally { setUpdatingId(null); }
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
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-cream-warm">
        <Card variant="elevated" padding="lg" className="w-full max-w-md space-y-6 animate-fade-in-up">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-forest text-gold-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" aria-hidden="true" />
            </div>
            <Badge variant="primary" size="md">Kitchen Desk & Operations</Badge>
            <h1 className="text-2xl font-serif font-bold text-ink-dark">Dr. KAS'S Admin Portal</h1>
            <p className="text-xs text-ink-muted">Enter authorized kitchen passcode to manage fresh dispatches, orders, and consultations.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Kitchen Passcode</label>
              <Input
                type="password"
                placeholder="Enter passcode (e.g. admin or kas2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                leftIcon={<Lock className="w-4 h-4" />}
              />
              {passcodeError && (
                <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Invalid passcode. (Hint: use <strong>admin</strong> or <strong>kas2026</strong>)</span>
                </p>
              )}
            </div>

            <Button type="submit" size="lg" fullWidth>
              Access Kitchen Dashboard
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs font-semibold text-ink-muted hover:text-gold-600 inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="admin-page-shell py-8 sm:py-12 bg-cream min-h-screen">
      <Container>
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-6 animate-fade-in-up">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Kitchen Operations Live</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-dark">Dr. KAS'S Kitchen & Order Portal</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={loadData} disabled={loading} leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}>
              Refresh Data
            </Button>
            <Link href="/">
              <Button variant="primary" size="sm">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                View Storefront
              </Button>
            </Link>
          </div>
        </div>

        {/* Real-time Operations Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-1">
          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Total Store Revenue</span>
            <div className="text-2xl font-serif font-bold text-gold-600">₹{totalRevenue.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">{orders.length} Verified Orders</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Active Kitchen Batches</span>
            <div className="text-2xl font-serif font-bold text-forest-700">{pendingOrders}</div>
            <span className="text-[10px] text-amber-700 font-semibold">Preparing or Awaiting Dispatch</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Consultation Inquiries</span>
            <div className="text-2xl font-serif font-bold text-indigo-600">{consultations.length}</div>
            <span className="text-[10px] text-indigo-700 font-semibold">{pendingConsultations} Pending Review</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Active Signature Recipes</span>
            <div className="text-2xl font-serif font-bold text-ink-dark">{products.length}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">100% Desi Ghee Formulations</span>
          </Card>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-border-light space-x-2 animate-fade-in-up delay-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "orders" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Package className="w-4 h-4" aria-hidden="true" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "consultations" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Consultation Bookings ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "inventory" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Recipe Catalog ({products.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === "orders" && (
          <div className="space-y-4 animate-fade-in-up delay-3">
            <Card variant="outlined" padding="md">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <Input
                    placeholder="Search by Order ID (KAS-7821), name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  <Filter className="w-4 h-4 text-ink-subtle" aria-hidden="true" />
                  <span className="text-xs text-ink-muted">Status:</span>
                  {["all", "Received", "Preparing", "Dispatched", "Delivered"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedStatus === st ? "bg-forest text-white" : "bg-cream text-ink-muted hover:bg-border-mid"
                      }`}
                    >
                      {st === "all" ? "All Orders" : st}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {filteredOrders.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center">
                No orders match your filter criteria.
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} variant="outlined" padding="lg" className="space-y-4 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-light pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-base text-forest-700">{order.id}</span>
                        <Badge variant="primary" size="sm">{order.paymentMethod.toUpperCase()}</Badge>
                        <span className="text-xs text-ink-muted">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-muted">Status:</span>
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-cream border border-border-mid rounded-lg px-3 py-1 text-xs font-bold text-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink-muted">
                      <div>
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block">Customer</span>
                        <div className="font-bold text-ink-dark">{order.customerName}</div>
                        <div className="text-ink-muted">{order.phone}</div>
                        <div className="text-ink-muted">{order.email}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block">Shipping Address</span>
                        <div>{order.address}</div>
                        <div>{order.city} - {order.pincode}</div>
                      </div>

                      <Card variant="default" padding="md" className="bg-cream">
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block">Order Total</span>
                        <div className="font-serif font-bold text-lg text-gold-600">₹{order.totalAmount}</div>
                        {order.orderNotes && (
                          <div className="text-[11px] text-ink-muted mt-1 italic">"{order.orderNotes}"</div>
                        )}
                      </Card>
                    </div>

                    {/* Items List */}
                    <Card variant="default" padding="md" className="bg-cream space-y-1">
                      <span className="text-[10px] font-bold uppercase text-ink-subtle block">Items in this box:</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between font-medium">
                          <span>{item.quantity} × {item.productName}</span>
                          <span className="font-bold text-ink-dark">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </Card>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Consultations Management */}
        {activeTab === "consultations" && (
          <div className="space-y-4 animate-fade-in-up delay-3">
            {consultations.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center">
                No consultation inquiries currently.
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((c) => (
                  <Card key={c.id} variant="outlined" padding="lg" className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border-light pb-2">
                      <div>
                        <span className="font-serif font-bold text-sm text-ink-dark">{c.clientName}</span>
                        <span className="text-[10px] text-ink-subtle block">{c.id}</span>
                      </div>
                      <select
                        value={c.status}
                        disabled={updatingId === c.id}
                        onChange={(e) => handleUpdateConsultationStatus(c.id, e.target.value as ConsultationStatus)}
                        className="bg-cream border border-border-mid rounded-lg px-2.5 py-1 text-xs font-bold text-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                      </select>
                    </div>

                    <div className="text-xs text-ink-muted space-y-1">
                      <div><strong className="text-ink-dark">Topic:</strong> {c.topic}</div>
                      <div><strong className="text-ink-dark">Preferred Date & Time:</strong> {c.preferredDate} at {c.preferredTime}</div>
                      <div><strong className="text-ink-dark">Phone:</strong> {c.phone} | <strong className="text-ink-dark">Email:</strong> {c.email}</div>
                      {c.notes && (
                        <div className="bg-cream p-2 rounded-lg border border-border-light text-[11px] mt-2 italic">Client Notes: "{c.notes}"</div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recipe Catalog */}
        {activeTab === "inventory" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up delay-3">
            {products.map((p) => (
              <Card key={p.id} variant="outlined" padding="md" className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">{p.categoryLabel}</Badge>
                  <span className="text-xs font-bold text-gold-600">₹{p.price}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-ink-dark">{p.name}</h4>
                <p className="text-[11px] text-ink-muted line-clamp-2">{p.tagline}</p>
                <div className="pt-2 border-t border-border-light flex items-center justify-between text-xs">
                  <span className="text-ink-muted">{p.weight}</span>
                  <span className="text-emerald-700 font-bold">100% In Kitchen</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button onClick={() => handleEditProduct(p)} disabled={updatingId === p.id} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-mid px-3 py-2 text-xs font-semibold text-ink-mid hover:bg-surface-warm">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(p)} disabled={updatingId === p.id} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
