import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("kas_session")?.value;

    let authHeader = request.headers.get("authorization");
    let headerToken: string | undefined;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      headerToken = authHeader.substring(7);
    }

    const sessionToken = token || headerToken;
    if (!sessionToken) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
    }

    const user = verifySessionToken(sessionToken);
    if (!user) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ success: true, authenticated: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
