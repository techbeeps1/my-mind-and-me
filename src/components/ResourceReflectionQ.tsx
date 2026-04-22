"use client";

type SessionModalProps = {
  isOpen: string;
  onClose: () => void;
};

export default function ResourceReflectionQ({ 
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
      <div className="relative bg-white w-180 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn overflow-y-auto custom-scroll">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

        {/* Video Section */}
        <div className="rounded-xl  mb-5  ">
         <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfBdW1ik8WseCyGQmACNO2JUTwp18nL-RqKoQjtRm6nO7zi8Q/viewform?embedded=true" className="w-full h-[80vh] custom-scroll" >Loading…</iframe>
        </div>
      </div>
    </div>
  );
}