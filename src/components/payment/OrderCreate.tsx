import { useEffect, useState } from "react";

//import { CreateOrder } from "@/app/utils/api";

import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

type SelectedData = {
  patient_id: string;
  practitioner_id: string;
  full_name: string;
  date: string;
  slot: string;
  fee: string;
  practitioner_name: string;
};
type BookingCreateData = {
  success: boolean;
  id: string;
};

type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  BookingCreateData: BookingCreateData;
  data: SelectedData;
};

export default function OrderCreate({
  closeModal,
  BookingCreateData,
  data,
}: OrderCreateProps) {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("BookingCreateData:", BookingCreateData);
    console.log("Selected Data:", data);
  }, []);
  async function processToPay() {
    if (!isAgreed) {
      toast.error("Please accept Terms & Conditions first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/payment/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: BookingCreateData?.id,
          type: "Appointment",
        }),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session. Try again.");
      }

      // ✅ Update Status
      // const responseStatus = await updateOrderStatus(
      //   response.data.order_uid,
      //   {
      //     payment_meta: {
      //       paymentMethod: "COD",
      //       paymentStatus: "pending",
      //       paymentDate: new Date().toISOString(),
      //       amount: dataSelect?.priceCents || "0",
      //       transactionId: "",
      //       gateway: "COD",
      //       notes: "",
      //     },
      //     status: "in_process",
      //   }
      // );

      // if (responseStatus?.data?.status === "in_process") {
      //   toast.success("Order created successfully!");
      //   window.location.reload();
      // }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    closeModal(false);
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6  md:mb-11.25 mb-7.5 px-5">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl  shadow-lg p-6">
        <div className="max-w-full mx-auto">
          <div className="mt-[30px]">
            <div>
              <div className="flex justify-between mb-[5px]">
                <p className="text-sm text-gray-600">
                  Name :{" "}
                  <span className="font-semibold text-gray-800">
                    {data?.full_name}{" "}
                  </span>
                </p>

                <p className="text-sm f text-gray-600">
                  Amount :{" "}
                  <span className="font-semibold text-gray-800">
                    R {data?.fee}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t my-4"></div>
          <div className="mt-4  text-[13px] text-gray-600  ">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-1"
              />

              <span>
                By clicking <b>Confirm and Pay</b>, Appointments may be
                cancelled, and refunds will be processed according to our{" "}
                <Link className="text-autoblue font-semibold underline" href="#">
                  Cancellation & Refund Policy
                </Link>
                .{" "}
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* ✅ Proceed Button */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={handleClose}
          className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
        >
          Back
        </button>
        <button
          onClick={processToPay}
          disabled={!isAgreed || loading}
          className={`lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500  rounded-full  text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition
              
              ${
                !isAgreed || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] cursor-pointer hover:opacity-90"
              }`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
}
