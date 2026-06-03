"use client";

import { useEffect, useState } from "react";
import DemoPaymentGateway from "./DemoPaymentGateway";
import LoadingSpin from "./LoadingSpin";
import { CreatePurchaseResource, resourcePaymentStatusUpdate } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";
import { toastTBS } from "@/lib/toast";
import { useRouter } from "next/navigation";

type PaymentResponse = {
  txnId: string;
  date: string;
  method: string;
  status: string;
  amount: string;

};

type SessionModalProps = {
  key: string | undefined;
  data?: {
    id: string;
    name: string;
    type: string;
    amount: string;
  };
  isOpen: string | undefined;
  onClose: () => void;
};

export default function ResourcePaid({ key,data, isOpen, onClose }: SessionModalProps) {
   const { MMMUserData } = useProfile();
    const router = useRouter()




 
  const [gatewayInit, setGatewayInit] = useState(false);





function paymentInit() {

if(!MMMUserData?.id || !data?.id || !data?.amount) return;
if(gatewayInit) return;
setGatewayInit(true);
const payload={patient_id: MMMUserData?.id,resources_id: data?.id,type:"Resource"}
CreatePurchaseResource(payload).then((res) => {
  if(res.success){
    router.push(res.url);
  }else{
    setGatewayInit(false)     ;
    toastTBS.error("Purchase Creation Failed:");
  }
}).catch((err) => {
  console.error("Payment initiation failed:", err);
  setGatewayInit(false)     ;

});

}

// function paymentCallback(paymentData: PaymentResponse) {
//   console.log("Payment Response:", paymentData);  
//   const payload = {
//     payment_id: Orderdata?.id || "",
//     transaction_id: paymentData.txnId,
//     status: "completed", 
//     price: paymentData.amount,
//   };
//   resourcePaymentStatusUpdate(payload).then((res) => {
//     if(res.success){
//       toastTBS.success("Payment Successful");
//       setBookingCfrm(true);
//       setGatewayInit(false)     ;
//     }else{
//       toastTBS.error("payment failed");
//     }
//   }).catch((err) => {
//     console.error("Payment status update failed:", err);
//     toastTBS.error("Payment was successful ");
//   });

// }


  if (!isOpen) return null;

  return (
    <>

        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative bg-white w-130 rounded-2xl shadow-2xl pb-6 z-50 animate-fadeIn">
<h3 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Payment Details
            </h3>         
      
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
            >
              ✕
            </button>

            <div className="w-full max-w-sm mx-auto  ">
              <>
                {/* Content */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Name</span>
                    <span className="font-semibold text-gray-800">
                     {data?.name || "Video Session"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="font-semibold text-gray-800">
                      {data?.type || "Video Session"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-semibold text-gray-800">
                      {data?.amount || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">
                    Amount to Pay
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {data?.amount || "N/A"}
                  </span>
                </div>
                <div className="flex justify-center mt-10 gap-2">
             
                
                    <>
                  <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => paymentInit()}
                    className="lg:py-3 py-1.25 flex justify-center items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                  >
                    {gatewayInit ? <div className="px-[25px]"><LoadingSpin width={3} height={15} /></div> : "Pay Now"}
                  </button> 
                </>
                </div>
              </>
            </div>
          </div>
        </div>
  
    </>
  );
}
