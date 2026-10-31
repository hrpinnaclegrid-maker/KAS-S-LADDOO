import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateUserPassword, verifySessionToken } from "@/lib/auth";

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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await checkAdminAuth(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { password } = body;

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const updated = await updateUserPassword(id, password);
    if (!updated) {
      return NextResponse.json({ success: false, error: "User not found in database." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Password updated successfully in database." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
