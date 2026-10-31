import crypto from "crypto";
import { AppUser, SafeUser, UserRole } from "@/types";
import { getDb } from "./mongodb";
import { getLocalDatabase, saveLocalDatabase } from "./db";

const TOKEN_SECRET = process.env.AUTH_SECRET || "kas-secret-signature-key-2026-ayurveda-laddus";

// -------------------------------------------------------------
// Password hashing & verification with PBKDF2
// -------------------------------------------------------------
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}

// -------------------------------------------------------------
// Session Token (HMAC signed JSON)
// -------------------------------------------------------------
export function createSessionToken(user: SafeUser): string {
  const payload = JSON.stringify({
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SafeUser | null {
  if (!token || !token.includes(".")) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = crypto.createHmac("sha256", TOKEN_SECRET).update(encodedPayload).digest("base64url");
  if (signature !== expectedSignature) return null;

  try {
    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadStr);
    if (!payload.exp || Date.now() > payload.exp) return null;
    return {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      role: payload.role,
      createdAt: payload.createdAt || new Date().toISOString()
    };
  } catch {
    return null;
  }
}

export function stripPassword(user: AppUser): SafeUser {
  const { passwordHash, ...safe } = user;
  return safe;
}

// -------------------------------------------------------------
// Database User Management
// -------------------------------------------------------------
export async function seedInitialUsers(): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    const col = db.collection<AppUser>("users");
    const count = await col.countDocuments();
    if (count === 0) {
      const now = new Date().toISOString();
      const defaultUsers: AppUser[] = [
        {
          id: "usr-admin-1",
          name: "Dr. KAS Admin",
          username: "admin",
          email: "admin@drkasfoods.com",
          role: "admin",
          passwordHash: hashPassword("admin123"),
          createdAt: now,
          updatedAt: now
        },
        {
          id: "usr-staff-1",
          name: "Packaging Kitchen Staff",
          username: "staff",
          email: "staff@drkasfoods.com",
          role: "staff",
          passwordHash: hashPassword("staff123"),
          createdAt: now,
          updatedAt: now
        }
      ];
      await col.insertMany(defaultUsers.map(u => ({ ...u, _id: u.id as any })));
      console.log("Seeded default admin and staff users into MongoDB");
    }
  } catch (err) {
    console.error("Error seeding initial users:", err);
  }
}

export async function getUsers(): Promise<SafeUser[]> {
  await seedInitialUsers();
  try {
    const db = await getDb();
    if (db) {
      const users = await db.collection<AppUser>("users").find({}, { projection: { passwordHash: 0, _id: 0 } }).toArray();
      if (users.length > 0) return users as SafeUser[];
    }
  } catch (err) {
    console.error("MongoDB error fetching users:", err);
  }

  const local = getLocalDatabase();
  return (local.users || []).map(stripPassword);
}

export async function getUserByUsername(username: string): Promise<AppUser | null> {
  await seedInitialUsers();
  const clean = username.trim().toLowerCase();
  try {
    const db = await getDb();
    if (db) {
      const user = await db.collection<AppUser>("users").findOne({
        $or: [
          { username: { $regex: new RegExp(`^${clean}$`, "i") } },
          { email: { $regex: new RegExp(`^${clean}$`, "i") } }
        ]
      });
      if (user) return user;
    }
  } catch (err) {
    console.error("MongoDB error finding user:", err);
  }

  const local = getLocalDatabase();
  const found = (local.users || []).find(
    u => u.username.toLowerCase() === clean || (u.email && u.email.toLowerCase() === clean)
  );
  return found || null;
}

export async function getUserById(id: string): Promise<AppUser | null> {
  try {
    const db = await getDb();
    if (db) {
      const user = await db.collection<AppUser>("users").findOne({ id });
      if (user) return user;
    }
  } catch (err) {
    console.error("MongoDB error finding user by ID:", err);
  }

  const local = getLocalDatabase();
  return (local.users || []).find(u => u.id === id) || null;
}

export async function createUser(data: {
  name: string;
  username: string;
  email?: string;
  role: UserRole;
  password: string;
}): Promise<SafeUser> {
  const existing = await getUserByUsername(data.username);
  if (existing) {
    throw new Error("Username or email already exists in database");
  }

  const now = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `usr-${data.role}-${randomSuffix}`;

  const newUser: AppUser = {
    id: newId,
    name: data.name.trim(),
    username: data.username.trim().toLowerCase(),
    email: data.email?.trim() || "",
    role: data.role,
    passwordHash: hashPassword(data.password),
    createdAt: now,
    updatedAt: now
  };

  try {
    const db = await getDb();
    if (db) {
      await db.collection("users").insertOne({ ...newUser, _id: newId } as any);
    }
  } catch (err) {
    console.error("MongoDB error creating user:", err);
  }

  const local = getLocalDatabase();
  if (!local.users) local.users = [];
  local.users.unshift(newUser);
  saveLocalDatabase(local);

  return stripPassword(newUser);
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<boolean> {
  const newHash = hashPassword(newPassword);
  const now = new Date().toISOString();
  let updated = false;

  try {
    const db = await getDb();
    if (db) {
      const res = await db.collection("users").updateOne(
        { id: userId },
        { $set: { passwordHash: newHash, updatedAt: now } }
      );
      updated = (res.modifiedCount ?? 0) > 0;
    }
  } catch (err) {
    console.error("MongoDB error updating password:", err);
  }

  const local = getLocalDatabase();
  if (local.users) {
    const index = local.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      local.users[index].passwordHash = newHash;
      local.users[index].updatedAt = now;
      saveLocalDatabase(local);
      updated = true;
    }
  }

  return updated;
}

export async function deleteUser(userId: string): Promise<boolean> {
  let deleted = false;
  try {
    const db = await getDb();
    if (db) {
      const res = await db.collection("users").deleteOne({ id: userId });
      deleted = (res.deletedCount ?? 0) > 0;
    }
  } catch (err) {
    console.error("MongoDB error deleting user:", err);
  }

  const local = getLocalDatabase();
  if (local.users) {
    const before = local.users.length;
    local.users = local.users.filter(u => u.id !== userId);
    if (local.users.length !== before) {
      saveLocalDatabase(local);
      deleted = true;
    }
  }

  return deleted;
}
