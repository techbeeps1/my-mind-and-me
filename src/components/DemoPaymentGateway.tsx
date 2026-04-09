"use client";

import Link from "next/link";
import { useState } from "react";


type Step = "select" | "confirm" | "result";
type PaymentResponse = {
  txnId: string;
  date: string;
  method: string;
  status: string;
  amount: string;

};
type FormDataType = {
  patient_id: string;
  practitioner_id: string;
  full_name: string;
  date: string;
  slot: string;
  fee: string;
};

export default function DemoPaymentGateway( {data, callback }: { data: FormDataType,callback: (paymentData: PaymentResponse) => void; }) {
  const [step, setStep] = useState<Step>("select");
  const [method, setMethod] = useState<string>("");
  const [status,setstatus] = useState(false);

 
  const handleConfirm = (type: "success" | "failed") => {
  
    // simulate callback redirect
    setTimeout(() => {
        const paymentData: PaymentResponse = {
            txnId: "TXN123456",
            date: new Date().toISOString(),
            method,
            status: type,
            amount: data.fee,   
        };
        callback(paymentData);
      
      
    }, 1500);
  };
if(status){
return(
  <div className=" flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 p-4 rounded-3xl" >
  <div className="w-full min-w-md bg-white rounded-3xl shadow-2xl p-8 text-center space-y-5 border border-gray-100">

    {/* ICON */}
    <div className="flex justify-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100">
        <span className="text-4xl text-red-500">❌</span>
      </div>
    </div>

    {/* TITLE */}
    <h2 className="text-2xl font-semibold text-red-600">
      Payment Failed
    </h2>

    {/* MESSAGE */}
    <p className="text-gray-500 text-sm leading-relaxed">
      Your transaction could not be completed.  
      Please check your payment details or try again.
    </p>

    {/* ERROR BOX */}
    <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-500">
      Error: Transaction declined by bank
    </div>

    {/* ACTION BUTTONS */}
    <div className="space-y-3 pt-2">
      <Link  href="/dashboard" className="w-full bg-black hover:bg-gray-900 transition text-white p-3 rounded-xl font-medium">
        Back to dashboard
      </Link>


    </div>

  </div>
</div>
)
}
  return (
  <div className=" bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 rounded-3xl">
  <div className="w-full min-w-md bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 space-y-6 border border-gray-100">

    {/* HEADER */}
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">
        Secure Payment
      </h1>
      <p className="text-gray-400 text-sm">Demo Gateway</p>
    </div>

    {/* STEP 1 */}
    {step === "select" && (
      <>
        <div className="space-y-3">
          {["Card Payments (Debit & Credit)", "Net Banking"].map((item) => (
            <div
              key={item}
              onClick={() => setMethod(item)}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                method === item
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              <span className="font-medium">{item}</span>

              {method === item && (
                <span className="text-blue-500 text-sm">Selected</span>
              )}
            </div>
          ))}
        </div>

        <button
          disabled={!method}
          onClick={() => setStep("confirm")}
          className="w-full bg-black hover:bg-gray-900 transition text-white py-3 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </>
    )}

    {/* STEP 2 */}
    {step === "confirm" && (
      <>
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">Selected Method</p>
          <h2 className="font-semibold text-xl">{method}</h2>
          <p className="text-sm text-gray-400">
            Choose payment result (Demo)
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleConfirm("success")}
            className="flex-1 bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl font-medium shadow-sm"
          >
            Success
          </button>

          <button
            onClick={() => setstatus(true)}
            className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl font-medium shadow-sm"
          >
            Failed
          </button>
        </div>

        <button
          onClick={() => setStep("select")}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Back
        </button>
      </>
    )}

   
  </div>
</div>
  );
}

