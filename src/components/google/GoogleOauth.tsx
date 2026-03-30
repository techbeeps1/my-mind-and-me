"use client";


import { FcGoogle } from "react-icons/fc";

export default function GoogleOauth() {

function signIn(){

  return window.open("/api/google/connect", "_self");
}

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      
      <div className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[450px] text-center text-gray-900 ">
        
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Connect Google Calendar
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Sync your calendar and manage bookings easily
        </p>

        <button
          onClick={signIn}
          className="flex items-center justify-center gap-3 w-full bg-gray-200 text-black py-3 rounded-xl hover:scale-105 transition-all duration-200 font-medium shadow-md"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 mt-6">
          We only access your calendar events
        </p>
      </div>

    </div>
  );
}