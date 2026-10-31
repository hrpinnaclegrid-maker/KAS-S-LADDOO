"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Package,
  Calendar,
  Layers,
  CheckCircle,
  RefreshCw,
  Lock,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
  User,
  Users,
  UserPlus,
  Key,
  Pencil,
  Trash2,
  Printer,
  ClipboardList,
  Check,
  FileText,
  Plus,
  X,
  Eye,
  EyeOff,
  LogOut,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";
import {
  CustomerOrder,
  ConsultationBooking,
  LadduProduct,
  OrderStatus,
  ConsultationStatus,
  SafeUser,
  UserRole,
  ProductCategory,
} from "@/types";
import { initialProducts } from "@/data/initialData";
import { Container, Button, Card, Badge, Input } from "@/components/ui";

export default function AdminPage() {
  // Session & Authentication
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginPortal, setLoginPortal] = useState<"admin" | "staff">("admin");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab & Data State
  const [activeTab, setActiveTab] = useState<"orders" | "packing" | "consultations" | "inventory" | "users">("orders");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [products, setProducts] = useState<LadduProduct[]>(initialProducts);
  const [usersList, setUsersList] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [packedChecklist, setPackedChecklist] = useState<Record<string, boolean>>({});

  // Product Modal State (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<LadduProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    hindiName: "",
    price: 450,
    weight: "400g (Box of 10-12 laddus)",
    category: "dry-fruits" as ProductCategory,
    categoryLabel: "Dry Fruits Collection",
    tagline: "",
    description: "",
    ingredients: "",
    inStock: true,
    featured: false,
    image: "/products/kas-dryfruit-almond-date.jpg",
  });
  const [productSubmitting, setProductSubmitting] = useState(false);

  // User Management Modals
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "staff" as UserRole,
    password: "",
  });
  const [userSubmitting, setUserSubmitting] = useState(false);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [targetPasswordUser, setTargetPasswordUser] = useState<SafeUser | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    async function checkSession() {
      setAuthLoading(true);
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
          if (data.user.role === "staff") {
            setActiveTab("packing");
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setAuthLoading(false);
      }
    }
    checkSession();
  }, []);

  // Load Data
  const loadData = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const fetches: Promise<Response>[] = [fetch("/api/orders")];

      if (currentUser.role === "admin") {
        fetches.push(fetch("/api/consultations"));
        fetches.push(fetch("/api/products"));
        fetches.push(fetch("/api/users"));
      }

      const results = await Promise.all(fetches);
      const ordersData = await results[0].json();
      if (ordersData.success) setOrders(ordersData.orders || []);

      if (currentUser.role === "admin") {
        if (results[1]) {
          const cData = await results[1].json();
          if (cData.success) setConsultations(cData.consultations || []);
        }
        if (results[2]) {
          const pData = await results[2].json();
          if (pData.success) setProducts(pData.products || []);
        }
        if (results[3]) {
          const uData = await results[3].json();
          if (uData.success) setUsersList(uData.users || []);
        }
      }
    } catch (err) {
      console.error("Error loading portal data:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser, loadData]);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
          portal: loginPortal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Login failed. Please check your credentials.");
        return;
      }

      setCurrentUser(data.user);
      if (data.user.role === "staff") {
        setActiveTab("packing");
      } else {
        setActiveTab("orders");
      }
      setUsernameInput("");
      setPasswordInput("");
    } catch (err: any) {
      setLoginError(err.message || "Network error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setCurrentUser(null);
    setOrders([]);
    setConsultations([]);
    setUsersList([]);
  };

  // Update Order Status (Admin & Staff)
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: `Status marked as ${newStatus} by ${currentUser?.name || "Kitchen"}`,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Update Consultation Status (Admin only)
  const handleUpdateConsultationStatus = async (consultationId: string, newStatus: ConsultationStatus) => {
    setUpdatingId(consultationId);
    try {
      const res = await fetch("/api/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: consultationId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.consultation) {
        setConsultations((prev) => prev.map((c) => (c.id === consultationId ? data.consultation : c)));
      }
    } catch (err) {
      console.error("Error updating consultation:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Open Product Modal for Create or Edit
  const handleOpenProductModal = (product?: LadduProduct) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        hindiName: product.hindiName || "",
        price: product.price,
        weight: product.weight || "400g",
        category: product.category,
        categoryLabel: product.categoryLabel,
        tagline: product.tagline || "",
        description: product.description || "",
        ingredients: (product.ingredients || []).join(", "),
        inStock: product.inStock ?? true,
        featured: product.featured ?? false,
        image: product.image || "/products/kas-dryfruit-almond-date.jpg",
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        hindiName: "",
        price: 450,
        weight: "400g (Box of 10-12 laddus)",
        category: "dry-fruits",
        categoryLabel: "Dry Fruits Collection",
        tagline: "",
        description: "",
        ingredients: "Mamra Almonds, Medjool Dates, Pure A2 Cow Ghee, Green Cardamom",
        inStock: true,
        featured: false,
        image: "/products/kas-dryfruit-almond-date.jpg",
      });
    }
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update in MongoDB)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim() || productForm.price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }

    setProductSubmitting(true);
    try {
      const ingredientsArray = productForm.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (editingProduct) {
        // Update product
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingProduct.id,
            updates: {
              name: productForm.name,
              hindiName: productForm.hindiName,
              price: Number(productForm.price),
              weight: productForm.weight,
              category: productForm.category,
              categoryLabel: productForm.categoryLabel,
              tagline: productForm.tagline,
              description: productForm.description,
              ingredients: ingredientsArray,
              inStock: productForm.inStock,
              featured: productForm.featured,
            },
          }),
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)));
          setIsProductModalOpen(false);
        } else {
          alert(data.error || "Failed to update product");
        }
      } else {
        // Create product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: productForm.name,
            hindiName: productForm.hindiName,
            price: Number(productForm.price),
            weight: productForm.weight,
            category: productForm.category,
            categoryLabel: productForm.categoryLabel,
            tagline: productForm.tagline,
            description: productForm.description,
            ingredients: ingredientsArray,
            keyBenefits: ["Nutritious wholesome energy", "100% Desi Cow Ghee preparation"],
            targetAudience: ["all"],
            nutrition: {
              servingSize: "1 Laddu (35g)",
              caloriesApprox: 155,
              proteinG: 4.5,
              carbsG: 16.0,
              healthyFatsG: 8.5,
              dietaryFiberG: 3.0,
              sugarG: 10.0,
              sweetenerType: "Natural Dates / Khand",
            },
            badges: ["Zero Refined Sugar", "Kitchen Fresh"],
            inStock: productForm.inStock,
            featured: productForm.featured,
            storageInstructions: "Store in a cool airtight container for up to 30 days.",
            allergenWarning: "Contains nuts and dairy (pure ghee).",
            image: productForm.image,
          }),
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) => [data.product, ...prev]);
          setIsProductModalOpen(false);
        } else {
          alert(data.error || "Failed to create product");
        }
      }
    } catch (err: any) {
      alert(err.message || "Error saving product");
    } finally {
      setProductSubmitting(false);
    }
  };

  // Delete Product (Admin only)
  const handleDeleteProduct = async (product: LadduProduct) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${product.name}" from the database?`)) return;
    setUpdatingId(product.id);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(product.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err: any) {
      alert(err.message || "Error deleting product");
    } finally {
      setUpdatingId(null);
    }
  };

  // Add User (Admin only)
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.username || !newUserForm.password) {
      alert("Name, username, and password are required.");
      return;
    }
    if (newUserForm.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setUserSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserForm),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUsersList((prev) => [data.user, ...prev]);
        setIsAddUserModalOpen(false);
        setNewUserForm({ name: "", username: "", email: "", role: "staff", password: "" });
        alert(`User "${data.user.name}" created successfully in the database!`);
      } else {
        alert(data.error || "Failed to create user");
      }
    } catch (err: any) {
      alert(err.message || "Error creating user");
    } finally {
      setUserSubmitting(false);
    }
  };

  // Change User Password (Admin only)
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPasswordUser || !newPasswordInput || newPasswordInput.length < 6) {
      alert("Please enter a new password with at least 6 characters.");
      return;
    }

    setPasswordSubmitting(true);
    try {
      const res = await fetch(`/api/users/${targetPasswordUser.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPasswordInput }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Password for user "${targetPasswordUser.name}" (${targetPasswordUser.username}) has been updated in the database!`);
        setIsChangePasswordModalOpen(false);
        setTargetPasswordUser(null);
        setNewPasswordInput("");
      } else {
        alert(data.error || "Failed to update password");
      }
    } catch (err: any) {
      alert(err.message || "Error updating password");
    } finally {
      setPasswordSubmitting(false);
    }
  };

  // Delete User (Admin only)
  const handleDeleteUser = async (userToDelete: SafeUser) => {
    if (userToDelete.id === currentUser?.id) {
      alert("You cannot delete your own admin account.");
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete user "${userToDelete.name}" (${userToDelete.username}) from the database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/users?id=${encodeURIComponent(userToDelete.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsersList((prev) => prev.filter((u) => u.id !== userToDelete.id));
        alert("User deleted from database successfully.");
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch (err: any) {
      alert(err.message || "Error deleting user");
    }
  };

  // Filtered orders for Admin Orders tab
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

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Received" || o.status === "Preparing").length;
  const pendingConsultations = consultations.filter((c) => c.status === "Pending Review").length;

  // -------------------------------------------------------------
  // VIEW 1: LOADING SESSION
  // -------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-cream-warm">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-forest animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Authenticating Database Session...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: INDIVIDUAL LOGIN SECTIONS (ADMIN & STAFF)
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 bg-gradient-cream-warm">
        <Card variant="elevated" padding="lg" className="w-full max-w-md space-y-6 animate-fade-in-up border border-border-mid shadow-xl">
          {/* Top Brand Header */}
          <div className="text-center space-y-2">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md transition-colors duration-300 ${
                loginPortal === "admin" ? "bg-forest text-white" : "bg-amber-600 text-white"
              }`}
            >
              {loginPortal === "admin" ? <ShieldCheck className="w-9 h-9" /> : <ClipboardList className="w-9 h-9" />}
            </div>
            <h1 className="text-2xl font-serif font-bold text-ink-dark">Dr. KAS's Operations</h1>
            <p className="text-xs text-ink-muted">Database-authenticated management &amp; kitchen packaging portal</p>
          </div>

          {/* Individual Login Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-cream-warm rounded-2xl border border-border-mid">
            <button
              type="button"
              onClick={() => {
                setLoginPortal("admin");
                setLoginError(null);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                loginPortal === "admin"
                  ? "bg-forest text-white shadow-sm"
                  : "text-ink-muted hover:text-ink-dark"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginPortal("staff");
                setLoginError(null);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                loginPortal === "staff"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-ink-muted hover:text-ink-dark"
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Staff Packaging</span>
            </button>
          </div>

          {/* Portal Information Badge */}
          <div
            className={`p-3 rounded-xl text-xs border ${
              loginPortal === "admin"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                : "bg-amber-50 text-amber-900 border-amber-200"
            }`}
          >
            {loginPortal === "admin" ? (
              <div>
                <strong>Admin Mode:</strong> Full management for products, pricing, orders, consultations, and database users/passwords.
              </div>
            ) : (
              <div>
                <strong>Staff Mode:</strong> Dedicated laddu kitchen packaging station for preparing and dispatching customer orders.
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label text-xs font-bold text-ink-dark">Username or Email</label>
              <Input
                type="text"
                placeholder={loginPortal === "admin" ? "admin" : "staff"}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoFocus
                required
                leftIcon={<User className="w-4 h-4 text-ink-muted" />}
              />
            </div>

            <div>
              <label className="label text-xs font-bold text-ink-dark">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your database password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  leftIcon={<Lock className="w-4 h-4 text-ink-muted" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-ink-muted hover:text-ink-dark focus:outline-none pointer-events-auto"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2" role="alert">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={isLoggingIn}
              className={loginPortal === "admin" ? "!bg-forest !text-white hover:!bg-forest-light" : "!bg-amber-600 !text-white hover:!bg-amber-700"}
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying DB...
                </span>
              ) : loginPortal === "admin" ? (
                "Sign In as Administrator"
              ) : (
                "Sign In to Packing Station"
              )}
            </Button>
          </form>

          {/* Quick Reference Guide */}
          <div className="bg-[#FAF6EE] rounded-xl p-3 border border-border-light text-[11px] text-ink-muted space-y-1">
            <div className="font-bold text-ink-dark">Pre-configured Database Credentials:</div>
            <div>• <strong>Admin:</strong> Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-ink-dark">admin</code> | Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-ink-dark">admin123</code></div>
            <div>• <strong>Staff:</strong> Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-ink-dark">staff</code> | Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-ink-dark">staff123</code></div>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs font-semibold text-ink-muted hover:text-gold-600 inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: STAFF PACKING STATION (RESTRICTED TO PACKAGING ONLY)
  // -------------------------------------------------------------
  if (currentUser.role === "staff") {
    const packingOrders = orders.filter((o) => o.status === "Received" || o.status === "Preparing");
    const aggregated: Record<string, { name: string; qty: number; orderIds: string[] }> = {};

    packingOrders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const key = item.productId;
        if (!aggregated[key]) {
          aggregated[key] = { name: item.productName || item.productId, qty: 0, orderIds: [] };
        }
        aggregated[key].qty += item.quantity || 1;
        if (!aggregated[key].orderIds.includes(order.id)) aggregated[key].orderIds.push(order.id);
      });
    });

    return (
      <div className="min-h-screen bg-cream py-8 sm:py-12">
        <Container>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Kitchen Packaging Live</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-dark">Laddu Packing Station</h1>
              <p className="text-xs font-semibold text-ink-muted mt-0.5">
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.username}) &bull; Packaging Staff Access
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" onClick={loadData} disabled={loading} leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}>
                Refresh
              </Button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-forest text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow hover:bg-forest-light transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Packing Sheet
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Packing Content */}
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-ink-dark flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-amber-600" />
                  Today's Active Laddu Orders to Pack
                </h2>
                <p className="text-xs text-ink-muted">
                  {packingOrders.length} order(s) currently awaiting packaging &amp; dispatch
                </p>
              </div>
            </div>

            {packingOrders.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center space-y-3 py-12">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <p className="font-serif font-bold text-xl text-ink-dark">All Laddus Packed! 🎉</p>
                <p className="text-sm text-ink-muted">No pending customer orders requiring packaging at the moment.</p>
              </Card>
            ) : (
              <>
                {/* Aggregate Summary Table */}
                <Card variant="outlined" padding="lg" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border-light pb-3">
                    <h3 className="font-serif font-bold text-base text-ink-dark flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" />
                      Total Laddus to Prepare (All Active Orders)
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                      Kitchen Packing Summary
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FAF6EE] border-b border-border-light">
                          <th className="text-left p-3 font-bold text-ink-dark">Laddu Formulation</th>
                          <th className="text-center p-3 font-bold text-ink-dark">Total Units</th>
                          <th className="text-left p-3 font-bold text-ink-dark">Order IDs</th>
                          <th className="text-center p-3 font-bold text-ink-dark">Packed ✓</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light">
                        {Object.entries(aggregated).map(([key, val]) => (
                          <tr key={key} className={`hover:bg-surface-warm transition-colors ${packedChecklist[key] ? "opacity-50 line-through" : ""}`}>
                            <td className="p-3 font-medium text-ink-dark">{val.name}</td>
                            <td className="p-3 text-center">
                              <span className="bg-forest text-white font-bold text-[11px] px-3 py-1 rounded-full">×{val.qty}</span>
                            </td>
                            <td className="p-3 text-ink-muted font-mono">{val.orderIds.join(", ")}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => setPackedChecklist((prev) => ({ ...prev, [key]: !prev[key] }))}
                                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center mx-auto transition-all ${
                                  packedChecklist[key] ? "bg-emerald-600 border-emerald-600 text-white" : "border-border-mid hover:border-emerald-400"
                                }`}
                                aria-label={`Mark ${val.name} as packed`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {Object.values(packedChecklist).some(Boolean) && (
                    <div className="text-right pt-2 border-t border-border-light">
                      <button onClick={() => setPackedChecklist({})} className="text-xs text-ink-muted hover:text-rose-600 font-semibold transition-colors">
                        Reset Checklist
                      </button>
                    </div>
                  )}
                </Card>

                {/* Per-Order Packing Details */}
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-base text-ink-dark flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-600" />
                    Per-Order Packing Cards
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packingOrders.map((order) => (
                      <Card key={order.id} variant="outlined" padding="md" className="space-y-3 bg-white hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between border-b border-border-light pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-ink-dark">{order.id}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                order.status === "Received" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-ink-muted uppercase font-bold">{order.paymentMethod}</span>
                        </div>

                        <div className="text-xs text-ink-muted space-y-0.5">
                          <div className="font-bold text-ink-dark">{order.customerName} &bull; {order.phone}</div>
                          <div>{order.address}, {order.city} - {order.pincode}</div>
                          {order.orderNotes && (
                            <div className="text-[11px] italic text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200/60 mt-1">
                              Note: "{order.orderNotes}"
                            </div>
                          )}
                        </div>

                        {/* Items to Pack */}
                        <div className="bg-[#FAF6EE] rounded-xl p-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">🧺 Boxes to Pack:</span>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs font-medium">
                              <span className="text-ink-dark">{item.productName || item.productId}</span>
                              <span className="font-bold text-forest bg-emerald-100 px-2 py-0.5 rounded-full">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Staff Actions */}
                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-border-light">
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "Preparing")}
                            disabled={order.status === "Preparing" || updatingId === order.id}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 disabled:opacity-40 transition-colors"
                          >
                            Mark Preparing
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "Dispatched")}
                            disabled={updatingId === order.id}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" /> Mark Dispatched
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 4: ADMIN PORTAL (FULL CRUD, PRICES, ORDERS, CONSULTATIONS, USERS, PASSWORDS)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Database Live Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-dark">Dr. KAS Kitchen &amp; Admin Suite</h1>
            <p className="text-xs font-semibold text-ink-muted mt-0.5">
              Logged in as <strong>{currentUser.name}</strong> ({currentUser.username}) &bull; Full Administrator Privileges
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" onClick={loadData} disabled={loading} leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}>
              Refresh
            </Button>
            <Link href="/">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="w-3.5 h-3.5" />
                Storefront
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Total Store Revenue</span>
            <div className="text-2xl font-serif font-bold text-gold-600">₹{totalRevenue.toLocaleString("en-IN")}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">{orders.length} Total Orders</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Active Packing Batches</span>
            <div className="text-2xl font-serif font-bold text-amber-700">{pendingOrders}</div>
            <span className="text-[10px] text-amber-700 font-semibold">Received / In Kitchen</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Consultation Requests</span>
            <div className="text-2xl font-serif font-bold text-indigo-600">{consultations.length}</div>
            <span className="text-[10px] text-indigo-700 font-semibold">{pendingConsultations} Pending Review</span>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Catalog Products in DB</span>
            <div className="text-2xl font-serif font-bold text-forest">{products.length}</div>
            <span className="text-[10px] text-forest font-semibold">{usersList.length} Active System Users</span>
          </Card>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap border-b border-border-light space-x-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "orders" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("packing")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "packing" ? "border-amber-600 text-amber-700" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Packing List ({pendingOrders})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "consultations" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultations ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "inventory" ? "border-gold-600 text-gold-600" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Products &amp; Pricing ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "users" ? "border-indigo-600 text-indigo-700" : "border-transparent text-ink-muted hover:text-ink-dark"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Access &amp; Passwords ({usersList.length})</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: ORDERS MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-4 mt-6">
            <Card variant="outlined" padding="md">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="Search orders by ID, customer name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  <Filter className="w-4 h-4 text-ink-muted" />
                  <span className="text-xs text-ink-muted">Status:</span>
                  {["all", "Received", "Preparing", "Dispatched", "Delivered", "Cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedStatus === st ? "bg-forest text-white" : "bg-cream text-ink-muted hover:bg-border-mid"
                      }`}
                    >
                      {st === "all" ? "All" : st}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {filteredOrders.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center text-ink-muted py-8">
                No orders found matching your search.
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} variant="outlined" padding="lg" className="space-y-4 hover:shadow-md transition-all bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-light pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-base text-forest-700">{order.id}</span>
                        <Badge variant="primary" size="sm">{order.paymentMethod.toUpperCase()}</Badge>
                        <span className="text-xs text-ink-muted">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ink-dark">Status:</span>
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-cream border border-border-mid rounded-lg px-3 py-1.5 text-xs font-bold text-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                        >
                          <option value="Received">Received</option>
                          <option value="Preparing">Preparing in Kitchen</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink-muted">
                      <div>
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block mb-1">Customer Info</span>
                        <div className="font-bold text-ink-dark text-sm">{order.customerName}</div>
                        <div>Phone: {order.phone}</div>
                        {order.email && <div>Email: {order.email}</div>}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block mb-1">Delivery Destination</span>
                        <div className="font-medium text-ink-dark">{order.address}</div>
                        <div>{order.city} - {order.pincode}</div>
                      </div>

                      <div className="bg-[#FAF6EE] p-3 rounded-xl border border-border-light">
                        <span className="text-[10px] font-bold text-ink-subtle uppercase block mb-1">Payment Summary</span>
                        <div className="text-lg font-serif font-bold text-gold-600">₹{(order.totalAmount || 0).toLocaleString("en-IN")}</div>
                        {order.orderNotes && <div className="text-[11px] text-ink-muted italic mt-1">"{order.orderNotes}"</div>}
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="bg-[#FAF6EE] rounded-xl p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-ink-subtle block mb-1">Laddus in this shipment:</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="font-medium text-ink-dark">{item.quantity} × {item.productName || item.productId}</span>
                          <span className="font-bold text-ink-dark">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PACKING LIST */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "packing" && (() => {
          const packingOrders = orders.filter((o) => o.status === "Received" || o.status === "Preparing");
          const aggregated: Record<string, { name: string; qty: number; orderIds: string[] }> = {};

          packingOrders.forEach((order) => {
            (order.items || []).forEach((item) => {
              const key = item.productId;
              if (!aggregated[key]) {
                aggregated[key] = { name: item.productName || item.productId, qty: 0, orderIds: [] };
              }
              aggregated[key].qty += item.quantity || 1;
              if (!aggregated[key].orderIds.includes(order.id)) aggregated[key].orderIds.push(order.id);
            });
          });

          return (
            <div className="space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-serif font-bold text-ink-dark flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-amber-600" />
                    Kitchen Laddu Packing Sheet
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Active orders with status <strong>Received</strong> or <strong>Preparing</strong> ({packingOrders.length} orders)
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-forest text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-forest-light transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Packing Sheet
                </button>
              </div>

              {packingOrders.length === 0 ? (
                <Card variant="outlined" padding="lg" className="text-center py-8">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-bold text-ink-dark">No orders currently pending packaging.</p>
                </Card>
              ) : (
                <Card variant="outlined" padding="lg" className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FAF6EE] border-b border-border-light">
                          <th className="text-left p-3 font-bold text-ink-dark">Laddu Product</th>
                          <th className="text-center p-3 font-bold text-ink-dark">Total Boxes to Pack</th>
                          <th className="text-left p-3 font-bold text-ink-dark">For Order IDs</th>
                          <th className="text-center p-3 font-bold text-ink-dark">Done ✓</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light">
                        {Object.entries(aggregated).map(([key, val]) => (
                          <tr key={key} className={`hover:bg-surface-warm ${packedChecklist[key] ? "opacity-50 line-through" : ""}`}>
                            <td className="p-3 font-medium text-ink-dark">{val.name}</td>
                            <td className="p-3 text-center">
                              <span className="bg-forest text-white font-bold text-[11px] px-3 py-1 rounded-full">×{val.qty}</span>
                            </td>
                            <td className="p-3 text-ink-muted font-mono">{val.orderIds.join(", ")}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => setPackedChecklist((prev) => ({ ...prev, [key]: !prev[key] }))}
                                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center mx-auto transition-all ${
                                  packedChecklist[key] ? "bg-emerald-600 border-emerald-600 text-white" : "border-border-mid hover:border-emerald-400"
                                }`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          );
        })()}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CONSULTATIONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "consultations" && (
          <div className="space-y-4 mt-6">
            {consultations.length === 0 ? (
              <Card variant="outlined" padding="lg" className="text-center text-ink-muted py-8">
                No consultation inquiries currently.
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultations.map((c) => (
                  <Card key={c.id} variant="outlined" padding="lg" className="space-y-3 bg-white">
                    <div className="flex items-center justify-between border-b border-border-light pb-2">
                      <div>
                        <span className="font-serif font-bold text-sm text-ink-dark">{c.clientName}</span>
                        <span className="text-[10px] text-ink-muted font-mono block">{c.id}</span>
                      </div>
                      <select
                        value={c.status}
                        disabled={updatingId === c.id}
                        onChange={(e) => handleUpdateConsultationStatus(c.id, e.target.value as ConsultationStatus)}
                        className="bg-cream border border-border-mid rounded-lg px-2.5 py-1 text-xs font-bold text-forest-700 focus:outline-none"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                      </select>
                    </div>

                    <div className="text-xs text-ink-muted space-y-1">
                      <div><strong className="text-ink-dark">Topic:</strong> {c.topic}</div>
                      <div><strong className="text-ink-dark">Preferred Date:</strong> {c.preferredDate} at {c.preferredTime}</div>
                      <div><strong className="text-ink-dark">Contact:</strong> {c.phone} | {c.email}</div>
                      {c.notes && (
                        <div className="bg-[#FAF6EE] p-2.5 rounded-lg border border-border-light text-[11px] mt-2 italic">
                          "{c.notes}"
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: PRODUCTS & PRICING CRUD */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "inventory" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-serif font-bold text-ink-dark flex items-center gap-2">
                  <Layers className="w-5 h-5 text-forest" />
                  Product Catalog &amp; Pricing (Live MongoDB)
                </h2>
                <p className="text-xs text-ink-muted">
                  Create, update pricing, edit recipe descriptions, or remove products from the database
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenProductModal()}
                className="!bg-forest !text-white hover:!bg-forest-light"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <Card key={p.id} variant="outlined" padding="md" className="space-y-3 bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="primary" size="sm">{p.categoryLabel}</Badge>
                      <div className="text-base font-serif font-bold text-gold-600">₹{p.price}</div>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink-dark">{p.name}</h4>
                      {p.hindiName && <span className="text-[11px] text-ink-muted font-hindi block">{p.hindiName}</span>}
                    </div>

                    <p className="text-xs text-ink-muted line-clamp-2">{p.tagline || p.description}</p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-ink-muted">{p.weight}</span>
                      <span className={`font-bold ${p.inStock ? "text-emerald-700" : "text-rose-600"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-light flex gap-2">
                    <button
                      onClick={() => handleOpenProductModal(p)}
                      disabled={updatingId === p.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-mid px-3 py-2 text-xs font-semibold text-ink-dark hover:bg-[#FAF6EE] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5 text-forest" />
                      Edit &amp; Price
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p)}
                      disabled={updatingId === p.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: USER ACCESS & PASSWORDS (DATABASE MANAGEMENT) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "users" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-serif font-bold text-ink-dark flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Database User Accounts &amp; Passwords
                </h2>
                <p className="text-xs text-ink-muted">
                  Add or delete users, assign admin or staff roles, and update passwords directly in MongoDB
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddUserModalOpen(true)}
                className="!bg-indigo-700 !text-white hover:!bg-indigo-800"
                leftIcon={<UserPlus className="w-4 h-4" />}
              >
                Add New User
              </Button>
            </div>

            <Card variant="outlined" padding="lg" className="bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6EE] border-b border-border-light">
                      <th className="text-left p-3 font-bold text-ink-dark">Full Name</th>
                      <th className="text-left p-3 font-bold text-ink-dark">Username</th>
                      <th className="text-left p-3 font-bold text-ink-dark">Email</th>
                      <th className="text-center p-3 font-bold text-ink-dark">System Role</th>
                      <th className="text-right p-3 font-bold text-ink-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-surface-warm transition-colors">
                        <td className="p-3 font-bold text-ink-dark">{u.name}</td>
                        <td className="p-3 font-mono text-ink-muted">{u.username}</td>
                        <td className="p-3 text-ink-muted">{u.email || "—"}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === "admin" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                setTargetPasswordUser(u);
                                setNewPasswordInput("");
                                setIsChangePasswordModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-mid text-xs font-semibold text-ink-dark hover:bg-cream transition-colors"
                              title="Update password in database"
                            >
                              <Key className="w-3.5 h-3.5 text-amber-600" />
                              Change Password
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u)}
                              disabled={u.id === currentUser.id}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-40 transition-colors"
                              title={u.id === currentUser.id ? "Cannot delete own active account" : "Delete user"}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL 1: ADD / EDIT PRODUCT */}
        {/* ------------------------------------------------------------- */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl border border-border-mid">
              <div className="flex items-center justify-between border-b border-border-light pb-3">
                <h3 className="font-serif font-bold text-lg text-ink-dark">
                  {editingProduct ? `Edit Recipe: ${editingProduct.name}` : "Add New Laddu Recipe"}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} className="text-ink-muted hover:text-ink-dark">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-ink-dark block mb-1">Product Name *</label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Kashmiri Saffron & Pistachio Vitality Laddu"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-ink-dark block mb-1">Price (₹ INR) *</label>
                    <Input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      min={1}
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-ink-dark block mb-1">Weight / Box Size</label>
                    <Input
                      value={productForm.weight}
                      onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                      placeholder="e.g. 400g (10-12 laddus)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-ink-dark block mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => {
                        const cat = e.target.value as ProductCategory;
                        const labels: Record<ProductCategory, string> = {
                          "dry-fruits": "Dry Fruits Collection",
                          millets: "Millets & Seeds",
                          specialty: "Ayurvedic Specialty",
                          "gift-boxes": "Gift Hampers & Assortments",
                          seasonal: "Seasonal Specials",
                        };
                        setProductForm({ ...productForm, category: cat, categoryLabel: labels[cat] });
                      }}
                      className="w-full bg-cream border border-border-mid rounded-xl p-2.5 text-xs text-ink-dark focus:outline-none"
                    >
                      <option value="dry-fruits">Dry Fruits Collection</option>
                      <option value="millets">Millets &amp; Seeds</option>
                      <option value="specialty">Ayurvedic Specialty</option>
                      <option value="gift-boxes">Gift Hampers</option>
                      <option value="seasonal">Seasonal Specials</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-ink-dark block mb-1">Hindi Script Name</label>
                    <Input
                      value={productForm.hindiName}
                      onChange={(e) => setProductForm({ ...productForm, hindiName: e.target.value })}
                      placeholder="e.g. बादाम और खजूर लड्डू"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Tagline</label>
                  <Input
                    value={productForm.tagline}
                    onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                    placeholder="e.g. Natural Sustained Energy • Zero Refined Sugar"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full bg-cream border border-border-mid rounded-xl p-2.5 text-xs text-ink-dark focus:outline-none"
                    placeholder="Detailed Ayurvedic health benefit description..."
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Ingredients (comma-separated)</label>
                  <Input
                    value={productForm.ingredients}
                    onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                    placeholder="Mamra Almonds (40%), Arabian Dates (35%), Pure A2 Ghee (15%)"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="rounded border-border-mid text-forest focus:ring-forest"
                    />
                    <span className="font-bold text-ink-dark">In Kitchen Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                      className="rounded border-border-mid text-gold-600 focus:ring-gold-600"
                    />
                    <span className="font-bold text-ink-dark">Featured on Homepage</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border-light">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsProductModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={productSubmitting} className="!bg-forest !text-white hover:!bg-forest-light">
                    {productSubmitting ? "Saving to DB..." : editingProduct ? "Save Changes" : "Create Product"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL 2: ADD USER */}
        {/* ------------------------------------------------------------- */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-border-mid">
              <div className="flex items-center justify-between border-b border-border-light pb-3">
                <h3 className="font-serif font-bold text-lg text-ink-dark flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                  Add New Database User
                </h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-ink-muted hover:text-ink-dark">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-ink-dark block mb-1">Full Name *</label>
                  <Input
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Packaging Officer"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Username *</label>
                  <Input
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                    placeholder="e.g. ramesh_pack"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Email Address</label>
                  <Input
                    type="email"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="ramesh@drkasfoods.com"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">System Role *</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                    className="w-full bg-cream border border-border-mid rounded-xl p-2.5 text-xs text-ink-dark focus:outline-none"
                  >
                    <option value="staff">Staff (Laddu Packing Station Only)</option>
                    <option value="admin">Admin (Full Store, Products, Users &amp; Price Access)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-ink-dark block mb-1">Initial Password (min 6 characters) *</label>
                  <Input
                    type="password"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="Choose secure password"
                    minLength={6}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border-light">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddUserModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={userSubmitting} className="!bg-indigo-700 !text-white hover:!bg-indigo-800">
                    {userSubmitting ? "Creating..." : "Create User in DB"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL 3: CHANGE USER PASSWORD */}
        {/* ------------------------------------------------------------- */}
        {isChangePasswordModalOpen && targetPasswordUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-border-mid">
              <div className="flex items-center justify-between border-b border-border-light pb-3">
                <h3 className="font-serif font-bold text-lg text-ink-dark flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-600" />
                  Update Password
                </h3>
                <button onClick={() => setIsChangePasswordModalOpen(false)} className="text-ink-muted hover:text-ink-dark">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-ink-muted">
                Updating database password for <strong>{targetPasswordUser.name}</strong> (<code className="font-mono">{targetPasswordUser.username}</code>).
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-ink-dark block mb-1">New Password (min 6 characters) *</label>
                  <Input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Enter new password"
                    minLength={6}
                    autoFocus
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border-light">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsChangePasswordModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={passwordSubmitting} className="!bg-amber-600 !text-white hover:!bg-amber-700">
                    {passwordSubmitting ? "Updating..." : "Update Password in DB"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
