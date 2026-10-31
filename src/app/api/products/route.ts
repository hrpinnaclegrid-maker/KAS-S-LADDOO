import { NextResponse } from "next/server";
import { getProducts, updateProduct, createProduct, deleteProduct } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const audience = searchParams.get("audience");

    let products = await getProducts();

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

    const updated = await updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    if (!product?.name || !product?.price) {
      return NextResponse.json({ success: false, error: "Product name and price are required" }, { status: 400 });
    }
    if (!product.id) {
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      product.id = `kas-${slug || "product"}-${Math.floor(100 + Math.random() * 900)}`;
    }
    const created = await createProduct(product);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Product id is required" }, { status: 400 });
    const deleted = await deleteProduct(id);
    if (!deleted) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
