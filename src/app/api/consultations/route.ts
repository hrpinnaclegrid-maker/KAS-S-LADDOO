import { NextResponse } from "next/server";
import { getConsultations, createConsultation, updateConsultationStatus } from "@/lib/db";

export async function GET() {
  try {
    const consultations = getConsultations();
    return NextResponse.json({ success: true, count: consultations.length, consultations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, phone, email, topic, preferredDate, preferredTime, notes } = body;

    if (!clientName || !phone || !topic || !preferredDate) {
      return NextResponse.json(
        { success: false, error: "Please provide client name, phone, consultation topic, and preferred date." },
        { status: 400 }
      );
    }

    const booking = createConsultation({
      clientName,
      phone,
      email: email || "",
      topic,
      preferredDate,
      preferredTime: preferredTime || "Morning (10:00 AM - 12:00 PM)",
      notes: notes || ""
    });

    return NextResponse.json({ success: true, consultation: booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 });
    }

    const updated = updateConsultationStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, consultation: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
