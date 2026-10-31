import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserByUsername, verifyPassword, stripPassword, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, portal } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter your username and password." },
        { status: 400 }
      );
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const isMatch = verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // If portal is specified, ensure user role matches the portal
    if (portal && portal !== user.role) {
      return NextResponse.json(
        {
          success: false,
          error: `Access denied. This account has the role "${user.role}" and cannot log in through the ${portal.toUpperCase()} portal.`
        },
        { status: 403 }
      );
    }

    const safeUser = stripPassword(user);
    const token = createSessionToken(safeUser);

    const cookieStore = await cookies();
    cookieStore.set("kas_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      success: true,
      user: safeUser,
      token
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: error.message || "Login failed" }, { status: 500 });
  }
}
