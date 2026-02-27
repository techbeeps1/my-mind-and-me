"use client";

import toast from "react-hot-toast";

const DEFAULT_DURATION = 3000;

const showToast = ({
  message,
  type = "success",
  duration = DEFAULT_DURATION,
}) => {
  toast.custom(
    (t) => {
      const isVisible = t.visible;

      return (
        <div
          className={`
            relative w-[320px] overflow-hidden rounded-lg bg-white  shadow-lg
            transition-all duration-300
            ${isVisible ? "animate-enter" : ""}
          `}
        >
          {/* Content */}
          <div className="flex items-center gap-3 px-4 py-3">

            {/* Icon */}
            <div
              className={`
                flex h-6 w-6 items-center justify-center rounded-full text-white text-sm
                ${getIconBg(type)}
              `}
            >
              {getIcon(type)}
            </div>

            {/* Text */}
            <p className="flex-1 text-sm font-medium text-gray-800">
              {message}
            </p>

            {/* Close */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-gray-200 overflow-hidden">
          
              <div
                className={`${getProgressColor(type)} h-full`}
                style={{
                  width: "100%",
                  animation: `progress ${duration+1000}ms linear forwards`,
                }}
              />
           
          </div>
        </div>
      );
    },
    { duration }
  );
};
const getIcon = (type) => {
  switch (type) {
    case "error":
      return "✕";
    case "warning":
      return "!";
    default:
      return "✓";
  }
};

const getIconBg = (type) => {
  switch (type) {
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};

const getProgressColor = (type) => {
  switch (type) {
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};

export const toastTBS = {
  success: (message) => showToast({ message, type: "success" }),
  error: (message) => showToast({ message, type: "error" }),
  warning: (message) => showToast({ message, type: "warning" }),
};