"use client";

type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SessionModal({ 
  isOpen, 
  onClose 
}: SessionModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-125 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

        {/* Video Section */}
        <div className="rounded-xl overflow-hidden mb-5">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            autoPlay
            className="w-full h-65 object-cover rounded-xl"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-[22px] leading-7 font-semibold mb-2">
          Welcome to your dashboard
        </h2>

        <p className="text-center text-[#535862] leading-5 text-sm mb-6">
          We`re glad to have you onboard. Here are some quick tips to get you up and running.
        </p>

        {/* Button */}
        <button className="w-full cursor-pointer bg-[linear-gradient(90deg,var(--color-AquaBlue)_-26%,var(--color-primary)_100%)] text-white py-3 text-lg rounded-full font-bold hover:opacity-90 duration-300">
          Complete Session
        </button>
      </div>
    </div>
  );
}