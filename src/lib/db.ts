import fs from "fs";
import path from "path";
import { DatabaseSchema, CustomerOrder, ConsultationBooking, LadduProduct } from "@/types";
import { defaultDatabase } from "@/data/initialData";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Ensure data file exists
function ensureDbFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDatabase, null, 2), "utf-8");
      return defaultDatabase;
    }
    const content = fs.readFileSync(DB_FILE, "utf-8");
    if (!content.trim()) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDatabase, null, 2), "utf-8");
      return defaultDatabase;
    }
    return JSON.parse(content) as DatabaseSchema;
  } catch (error) {
    console.error("Error ensuring database file, falling back to default:", error);
    return defaultDatabase;
  }
}

export function getDatabase(): DatabaseSchema {
  return ensureDbFile();
}

export function saveDatabase(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving database:", error);
    return false;
  }
}

// Product helpers
export function getProducts(): LadduProduct[] {
  const db = getDatabase();
  return db.products || [];
}

export function updateProduct(id: string, updates: Partial<LadduProduct>): LadduProduct | null {
  const db = getDatabase();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...updates };
  saveDatabase(db);
  return db.products[index];
}

export function createProduct(product: LadduProduct): LadduProduct {
  const db = getDatabase();
  db.products.unshift(product);
  saveDatabase(db);
  return product;
}

export function deleteProduct(id: string): boolean {
  const db = getDatabase();
  const next = db.products.filter((p) => p.id !== id);
  if (next.length === db.products.length) return false;
  db.products = next;
  saveDatabase(db);
  return true;
}

// Order helpers
export function getOrders(): CustomerOrder[] {
  const db = getDatabase();
  return db.orders || [];
}

export function getOrderById(id: string): CustomerOrder | null {
  const db = getDatabase();
  const cleanId = id.trim().toUpperCase();
  return (
    db.orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.phone.replace(/\D/g, "").includes(cleanId.replace(/\D/g, ""))
    ) || null
  );
}

export function createOrder(orderData: Omit<CustomerOrder, "id" | "createdAt" | "status" | "statusHistory">): CustomerOrder {
  const db = getDatabase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `KAS-${randomSuffix}`;
  const now = new Date().toISOString();

  const newOrder: CustomerOrder = {
    ...orderData,
    id: newId,
    status: "Received",
    statusHistory: [
      {
        status: "Received",
        timestamp: now,
        note: "Order received by Dr. KAS’s kitchen"
      }
    ],
    createdAt: now
  };

  db.orders.unshift(newOrder);
  saveDatabase(db);
  return newOrder;
}

export function updateOrderStatus(id: string, status: CustomerOrder["status"], note?: string): CustomerOrder | null {
  const db = getDatabase();
  const order = db.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
  if (!order) return null;

  order.status = status;
  order.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    note: note || `Order status marked as ${status}`
  });

  saveDatabase(db);
  return order;
}

// Consultation helpers
export function getConsultations(): ConsultationBooking[] {
  const db = getDatabase();
  return db.consultations || [];
}

export function createConsultation(bookingData: Omit<ConsultationBooking, "id" | "createdAt" | "status">): ConsultationBooking {
  const db = getDatabase();
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const newId = `CONS-${randomSuffix}`;
  const now = new Date().toISOString();

  const newBooking: ConsultationBooking = {
    ...bookingData,
    id: newId,
    status: "Pending Review",
    createdAt: now
  };

  db.consultations.unshift(newBooking);
  saveDatabase(db);
  return newBooking;
}

export function updateConsultationStatus(id: string, status: ConsultationBooking["status"]): ConsultationBooking | null {
  const db = getDatabase();
  const booking = db.consultations.find((c) => c.id.toUpperCase() === id.toUpperCase());
  if (!booking) return null;

  booking.status = status;
  saveDatabase(db);
  return booking;
}
