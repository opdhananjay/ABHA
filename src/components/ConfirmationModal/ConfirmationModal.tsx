import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationModal = ({
  isOpen,
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText
}: Props) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>

          {onCancel && (
            <button onClick={onCancel}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Message */}
        <div className="py-5">
          <p className="text-sm text-gray-600">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          
          {/* Show only if cancelText exists */}
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded-md text-sm"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;