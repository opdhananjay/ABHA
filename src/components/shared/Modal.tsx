import type { IModalProps } from "../../types/general.types";

const Modal = ({isOpen,onClose,title,children,width,height}:IModalProps) => {

    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
           
            {/* Modal Container */}
            <div className={`bg-white rounded-lg shadow-lg w-full ${width} max-h-[90vh] overflow-auto`} 
                style={{height}}>
                    
                <div className="flex items-center justify-between border-b px-4 py-3 shadow-md">

                    <h2 className="text-lg font-semibold text-gray-700">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl hover:cursor-pointer"
                    >
                        ×
                    </button>

                </div>  

                {/* Body */}
                <div className="p-4">
                    {children}
                </div>

            </div>

        </div>
    )
}

export default Modal;