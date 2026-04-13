"use client";

type SessionModalProps = {
  isOpen: string;
  onClose: () => void;
};

export default function ResourceVideoPlayer({ 
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
      <div className="relative bg-white w-180 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn">

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
  controlsList="nodownload noplaybackrate"
  disablePictureInPicture
  onContextMenu={(e) => e.preventDefault()}
  className="w-full h-100 object-cover rounded-xl"
/>
        </div>

        {/* Title */}
        <h3 className=" text-[18px] leading-7 font-semibold ">
          Welcome to your dashboard
        </h3>

      </div>
    </div>
  );
}