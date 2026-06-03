import Stripe from "stripe";
import WrapperBanner from "@/components/WraperBanner";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

import { BiBuilding, BiCalendar, BiCreditCard, BiHash } from "react-icons/bi";
import { BOOKING_END, PATIENT_END } from "@/services/api";
import { cookies } from "next/headers";

//paymentStatusUpdate
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SuccessPage({ params }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("MMMAT")?.value;
  const { id } = await params;
  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(id);
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Invalid Session
      </div>
    );
  }
  if (session.payment_status !== "paid") {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Something went wrong with the payment. Please try again.
      </div>
    );
  }
  const date = new Date(session.created * 1000);
  const formatted =
    date.toLocaleDateString("en-GB") +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  if (session.payment_status === "paid") {
    let responseStatus;
    if (session.metadata?.type === "Appointment") {
      const payload = {
        booking_id: session.metadata?.UUid,
        bookingStatus: "booked",
        PaymentStatus: "confirmed",
        method: session?.payment_method_types?.[0] || "",
        transactionId: String(session?.payment_intent),
      };
      const res = await fetch(`${BOOKING_END}/payment-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      responseStatus = await res.json();
    } else if (session.metadata?.type === "Resource") {
      const payload = {
        payment_id: session.metadata?.UUid,
        status: "completed",
        method: session?.payment_method_types?.[0] || "",
        transaction_id: String(session?.payment_intent),
      };
      const res = await fetch(`${PATIENT_END}/resources/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      responseStatus = await res.json();
    }

    if (!responseStatus.success) {
      return (
        <>
          <div className="flex flex-col gap-4 items-center justify-center h-screen text-white bg-black">
            <div>
              Payment was successful, but failed to update booking status.
              Please contact support.
            </div>
            <Link
              href={`/payment-success/${id}`}
              className=" bg-gray-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-hoverblue transition"
            >
              Refresh
            </Link>
          </div>
        </>
      );
    }
  }
  return (
    <WrapperBanner>
      <main className="min-h-screen text-white overflow-hidden">
        <div className="w-full relative min-h-screen flex items-center justify-center px-3 py-7">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
          />
          <div className="absolute inset-0" />

          <div className="relative w-full max-w-[540px]">
            <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.18)] border border-gray-100">
              {/* Header */}
              <div className="px-5 pt-6 pb-3 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                    <FaCheckCircle className="text-green-600 text-[48px] " />
                  </div>
                </div>

                <h1 className="text-[30px] font-bold text-gray-800">
                  Payment Successful
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                  Your payment has been processed successfully.
                </p>

                {/* Amount */}
                <div>
                  <p className="text-sm text-gray-400 mb-1">Amount Paid</p>

                  <h2 className="text-[36px] font-bold text-gray-900">
                    ₹
                    {session?.amount_total
                      ? (session.amount_total / 100).toFixed(2)
                      : "0.00"}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="mx-6 rounded-2xl bg-gray-50 border border-gray-100 p-5 space-y-4">
                {/* Transaction ID */}
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <BiHash className="w-5 h-5" />
                    <span className="text-sm">Transaction ID</span>
                  </div>

                  <span className="text-gray-800 text-sm font-mono break-all text-right ">
                    {String(session?.payment_intent)}
                  </span>
                </div>

                <div className="border-t border-gray-200" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <BiCreditCard className="w-5 h-5" />
                    <span className="text-sm">Payment Method</span>
                  </div>

                  <span className="text-gray-800 text-sm font-semibold uppercase">
                    {session?.payment_method_types?.[0] || "N/A"}
                  </span>
                </div>

                <div className="border-t border-gray-200" />

                {/* Date */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <BiCalendar className="w-5 h-5" />
                    <span className="text-sm">Date</span>
                  </div>

                  <span className="text-gray-800 text-sm">{formatted}</span>
                </div>

                <div className="border-t border-gray-200" />

                {/* Order ID */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <BiBuilding className="w-5 h-5" />
                    <span className="text-sm">Order ID</span>
                  </div>

                  <span className="text-gray-800 text-sm font-semibold">
                    #{session?.metadata?.Id || "N/A"}
                  </span>
                </div>
                {session?.metadata?.type === "Resource" && (
                  <>
                    <div className="border-t border-gray-200" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500">
                        <BiBuilding className="w-5 h-5" />
                        <span className="text-sm">Resource </span>
                      </div>

                      <span className="text-gray-800 text-sm font-semibold">
                        #{session?.metadata?.productName || "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-6"></div>
            </div>
          </div>
        </div>
      </main>
    </WrapperBanner>
  );
}
