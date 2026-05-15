type ModalType = "delete" | "accept" | "reject" | "default";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback: (userId?: string | number) => void;
  userId?: string | number;
  loading?: boolean;
  type?: ModalType;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  callback,
  userId,
  loading = false,
  type = "default",
}) => {
  if (!isOpen) return null;

  const config = {
    delete: {
      title: "Confirm Delete",
      message: "Are you sure you want to delete this account?",
      buttonText: "Yes, Delete",
      titleColor: "text-red-600",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },

    accept: {
      title: "Accept Request",
      message: "Are you sure you want to accept this request?",
      buttonText: "Accept",
      titleColor: "text-green-600",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },

    reject: {
      title: "Reject Request",
      message: "Are you sure you want to reject this request?",
      buttonText: "Reject",
      titleColor: "text-yellow-600",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },

    default: {
      title: "Confirmation",
      message: "Are you sure?",
      buttonText: "Confirm",
      titleColor: "text-blue-600",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const selected = config[type];

  const handleConfirm = () => {
    callback(userId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className={`text-xl font-semibold mb-3 ${selected.titleColor}`}>
          {selected.title}
        </h3>

        <p className="text-gray-700 text-sm leading-6">
          {selected.message}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-5 py-2 rounded-full text-white disabled:opacity-50 ${selected.buttonColor}`}
          >
            {loading ? "Please wait..." : selected.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
{/* <ConfirmModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  type="accept"
  userId={"sdf33"}
  callback={() => {}}
/> */}