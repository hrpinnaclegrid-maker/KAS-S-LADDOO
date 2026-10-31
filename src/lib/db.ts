import fs from "fs";
import path from "path";
import { DatabaseSchema, CustomerOrder, ConsultationBooking, LadduProduct } from "@/types";
import { defaultDatabase } from "@/data/initialData";
import { getDb } from "./mongodb";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Ensure local fallback data file exists
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

export function getLocalDatabase(): DatabaseSchema {
  return ensureDbFile();
}

export function saveLocalDatabase(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving local database:", error);
    return false;
  }
}

// -------------------------------------------------------------
// Products
// -------------------------------------------------------------
export async function getProducts(): Promise<LadduProduct[]> {
  try {
    const db = await getDb();
    if (db) {
      const items = await db.collection<LadduProduct>("products").find({}, { projection: { _id: 0 } }).toArray();
      if (items.length > 0) return items;
    }
  } catch (err) {
    console.error("MongoDB error fetching products:", err);
  }
  return getLocalDatabase().products || [];
}

export async function updateProduct(id: string, updates: Partial<LadduProduct>): Promise<LadduProduct | null> {
  let updatedProduct: LadduProduct | null = null;
  try {
    const db = await getDb();
    if (db) {
      await db.collection("products").updateOne({ id }, { $set: updates });
      updatedProduct = await db.collection<LadduProduct>("products").findOne({ id }, { projection: { _id: 0 } });
    }
  } catch (err) {
    console.error("MongoDB error updating product:", err);
  }

  // Update local file mirror
  const local = getLocalDatabase();
  const index = local.products.findIndex((p) => p.id === id);
  if (index !== -1) {
    local.products[index] = { ...local.products[index], ...updates };
    saveLocalDatabase(local);
    if (!updatedProduct) updatedProduct = local.products[index];
  }

  return updatedProduct;
}

export async function createProduct(product: LadduProduct): Promise<LadduProduct> {
  try {
    const db = await getDb();
    if (db) {
      await db.collection("products").insertOne({ ...product, _id: product.id } as any);
    }
  } catch (err) {
    console.error("MongoDB error creating product:", err);
  }

  const local = getLocalDatabase();
  local.products.unshift(product);
  saveLocalDatabase(local);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  let deleted = false;
  try {
    const db = await getDb();
    if (db) {
      const res = await db.collection("products").deleteOne({ id });
      deleted = (res.deletedCount ?? 0) > 0;
    }
  } catch (err) {
    console.error("MongoDB error deleting product:", err);
  }

  const local = getLocalDatabase();
  const next = local.products.filter((p) => p.id !== id);
  if (next.length !== local.products.length) {
    local.products = next;
    saveLocalDatabase(local);
    deleted = true;
  }
  return deleted;
}

// -------------------------------------------------------------
// Orders
// -------------------------------------------------------------
export async function getOrders(): Promise<CustomerOrder[]> {
  try {
    const db = await getDb();
    if (db) {
      const orders = await db
        .collection<CustomerOrder>("orders")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return orders;
    }
  } catch (err) {
    console.error("MongoDB error fetching orders:", err);
  }
  return getLocalDatabase().orders || [];
}

export async function getOrderById(id: string): Promise<CustomerOrder | null> {
  const cleanId = id.trim().toUpperCase();
  try {
    const db = await getDb();
    if (db) {
      const order = await db.collection<CustomerOrder>("orders").findOne(
        {
          $or: [
            { id: { $regex: new RegExp(`^${cleanId}$`, "i") } },
            { phone: { $regex: cleanId.replace(/\D/g, "") } }
          ]
        },
        { projection: { _id: 0 } }
      );
      if (order) return order;
    }
  } catch (err) {
    console.error("MongoDB error fetching order by ID:", err);
  }

  const local = getLocalDatabase();
  return (
    local.orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.phone.replace(/\D/g, "").includes(cleanId.replace(/\D/g, ""))
    ) || null
  );
}

export async function createOrder(
  orderData: Omit<CustomerOrder, "id" | "createdAt" | "status" | "statusHistory">
): Promise<CustomerOrder> {
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

  try {
    const db = await getDb();
    if (db) {
      await db.collection("orders").insertOne({ ...newOrder, _id: newId } as any);
    }
  } catch (err) {
    console.error("MongoDB error creating order:", err);
  }

  const local = getLocalDatabase();
  local.orders.unshift(newOrder);
  saveLocalDatabase(local);
  return newOrder;
}

export async function updateOrderStatus(
  id: string,
  status: CustomerOrder["status"],
  note?: string
): Promise<CustomerOrder | null> {
  const now = new Date().toISOString();
  const historyEntry = {
    status,
    timestamp: now,
    note: note || `Order status marked as ${status}`
  };

  let updatedOrder: CustomerOrder | null = null;
  try {
    const db = await getDb();
    if (db) {
      await db.collection("orders").updateOne(
        { id: { $regex: new RegExp(`^${id}$`, "i") } },
        {
          $set: { status },
          $push: { statusHistory: historyEntry } as any
        }
      );
      updatedOrder = await db
        .collection<CustomerOrder>("orders")
        .findOne({ id: { $regex: new RegExp(`^${id}$`, "i") } }, { projection: { _id: 0 } });
    }
  } catch (err) {
    console.error("MongoDB error updating order status:", err);
  }

  const local = getLocalDatabase();
  const order = local.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
  if (order) {
    order.status = status;
    order.statusHistory.push(historyEntry);
    saveLocalDatabase(local);
    if (!updatedOrder) updatedOrder = order;
  }

  return updatedOrder;
}

// -------------------------------------------------------------
// Consultations
// -------------------------------------------------------------
export async function getConsultations(): Promise<ConsultationBooking[]> {
  try {
    const db = await getDb();
    if (db) {
      return await db
        .collection<ConsultationBooking>("consultations")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
    }
  } catch (err) {
    console.error("MongoDB error fetching consultations:", err);
  }
  return getLocalDatabase().consultations || [];
}

export async function createConsultation(
  bookingData: Omit<ConsultationBooking, "id" | "createdAt" | "status">
): Promise<ConsultationBooking> {
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const newId = `CONS-${randomSuffix}`;
  const now = new Date().toISOString();

  const newBooking: ConsultationBooking = {
    ...bookingData,
    id: newId,
    status: "Pending Review",
    createdAt: now
  };

  try {
    const db = await getDb();
    if (db) {
      await db.collection("consultations").insertOne({ ...newBooking, _id: newId } as any);
    }
  } catch (err) {
    console.error("MongoDB error creating consultation:", err);
  }

  const local = getLocalDatabase();
  local.consultations.unshift(newBooking);
  saveLocalDatabase(local);
  return newBooking;
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationBooking["status"]
): Promise<ConsultationBooking | null> {
  let updatedBooking: ConsultationBooking | null = null;
  try {
    const db = await getDb();
    if (db) {
      await db
        .collection("consultations")
        .updateOne({ id: { $regex: new RegExp(`^${id}$`, "i") } }, { $set: { status } });
      updatedBooking = await db
        .collection<ConsultationBooking>("consultations")
        .findOne({ id: { $regex: new RegExp(`^${id}$`, "i") } }, { projection: { _id: 0 } });
    }
  } catch (err) {
    console.error("MongoDB error updating consultation status:", err);
  }

  const local = getLocalDatabase();
  const booking = local.consultations.find((c) => c.id.toUpperCase() === id.toUpperCase());
  if (booking) {
    booking.status = status;
    saveLocalDatabase(local);
    if (!updatedBooking) updatedBooking = booking;
  }

  return updatedBooking;
}
