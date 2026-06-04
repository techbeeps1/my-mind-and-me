import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { BOOKING_END, PATIENT_END } from "@/services/api";
//import {  orderAPI } from "@/app/utils/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("MMMAT")?.value;
    const body = await req.json();

    let data;
    let metaData;
    if (body.type === "Appointment") {
     const res = await fetch(`${BOOKING_END}/booking-details/${body.orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
           data = await res.json();
         metaData = {
          UUid: body.orderId,
          Id: data.order_id,
          userName: data.name,
          productName: data.productName,
          type: "Appointment"
        }

    } else if (body.type === "Resource") {
        const res = await fetch(`${PATIENT_END}/resources/payment`, {
        method: "POST",
        body: JSON.stringify({ patient_id: body.patient_id, resources_id: body.resources_id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
           data = await res.json();
          metaData = {
          UUid: data.UUID,
          Id: data.order_id,
          userName: data.name,
          productName: data.productName,
          type: "Resource"
        }
    }

    if (data.success) {

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: data.email,
        metadata: metaData,
        customer_creation: "always",
        line_items: [
          {
            price_data: {
              currency: "zar",
              product_data: {
                name: data.productName,
              },
              unit_amount: data.amount * 100,
            },
            quantity: 1,
          },
        ],

        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel/{CHECKOUT_SESSION_ID}`,
      });

      return NextResponse.json({
        url: session.url,
        success: true,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to create checkout session", success: false },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 },
    );
  }
}
