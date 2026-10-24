import { NextResponse } from "next/server";
import { getProducts, updateProduct } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const audience = searchParams.get("audience");

    let products = getProducts();

    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    if (audience && audience !== "all") {
      products = products.filter(
        (p) => p.targetAudience.includes(audience as any) || p.targetAudience.includes("all")
      );
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { success: false, error: "Product id and updates are required" },
        { status: 400 }
      );
    }

    const updated = updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
