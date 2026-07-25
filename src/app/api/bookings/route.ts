import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      location,
      serviceId,
      serviceName,
      servicePrice,
      stylist,
      date,
      time,
      name,
      email,
      phone,
    } = body;

    if (
      !location ||
      !serviceId ||
      !serviceName ||
      !servicePrice ||
      !stylist ||
      !date ||
      !time ||
      !name?.trim() ||
      !email?.trim()
    ) {
      return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
    }

    if (location !== "lindenau" && location !== "seetal") {
      return NextResponse.json({ error: "Ungültiger Standort." }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("salon_bookings").insert({
      location,
      service_id: serviceId,
      service_name: serviceName,
      service_price: servicePrice,
      stylist,
      booking_date: date,
      booking_time: time,
      customer_name: name.trim(),
      customer_email: email.trim(),
      customer_phone: phone?.trim() || null,
    });

    if (error) {
      console.error("Supabase booking error:", error);
      return NextResponse.json({ error: "Speichern fehlgeschlagen." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
}
