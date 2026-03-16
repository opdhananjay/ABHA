import { X } from "lucide-react";
import type { IModalProps } from "../../types/general.types";

const Modal = ({
  isOpen,
  showCloseBtn,
  onClose,
  title,
  children,
  width = "max-w-lg",
  height = "auto"
}: IModalProps) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

      {/* Modal Container */}
      <div
        className={`relative bg-white rounded-xl shadow-xl w-full ${width} max-h-[90vh] overflow-auto`}
        style={{ height }}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">

          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>

          {showCloseBtn && (
                <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full 
                                text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
                    >
                    <X size={20} />
               </button>
          )}
          
        </div>

        {/* Body */}
        <div className="p-4">
          {children}
        </div>

      </div>

    </div>

  );
};

export default Modal;