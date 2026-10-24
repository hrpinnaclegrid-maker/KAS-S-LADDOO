import { NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, email, address, city, pincode, items, subtotal, shippingFee, totalAmount, paymentMethod, orderNotes } = body;

    if (!customerName || !phone || !address || !city || !pincode || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required customer and address fields." },
        { status: 400 }
      );
    }

    const order = createOrder({
      customerName,
      phone,
      email: email || "",
      address,
      city,
      pincode,
      items,
      subtotal: Number(subtotal) || 0,
      shippingFee: Number(shippingFee) || 0,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "upi",
      orderNotes: orderNotes || ""
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
