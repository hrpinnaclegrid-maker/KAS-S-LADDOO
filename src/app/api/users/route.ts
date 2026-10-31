import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUsers, createUser, deleteUser, verifySessionToken } from "@/lib/auth";

async function checkAdminAuth(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("kas_session")?.value;
  let authHeader = request.headers.get("authorization");
  const sessionToken = token || (authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null);

  if (!sessionToken) return null;
  const user = verifySessionToken(sessionToken);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  try {
    const admin = await checkAdminAuth(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const users = await getUsers();
    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await checkAdminAuth(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await request.json();
    const { name, username, email, role, password } = body;

    if (!name || !username || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Name, username, role, and password are required." },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "staff") {
      return NextResponse.json(
        { success: false, error: "Role must be either 'admin' or 'staff'." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const newUser = await createUser({
      name,
      username,
      email: email || "",
      role,
      password
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await checkAdminAuth(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required." }, { status: 400 });
    }

    if (id === admin.id) {
      return NextResponse.json({ success: false, error: "You cannot delete your own admin account." }, { status: 400 });
    }

    const deleted = await deleteUser(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "User not found or could not be deleted." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully", id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
