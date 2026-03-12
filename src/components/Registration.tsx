import { useState } from "react";
import Modal from "./shared/Modal";
import OTPVerification from "./OTPVerification";

const Registration = () => {

    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);

    return (
        <div>

            <button type="button" onClick={()=>{setIsModalOpen(true)}}>
                show modal
            </button>

            Registration


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="OTP Verification"
                width="max-w-md"
                height="30vh"
                >
                <OTPVerification onClose={() => setIsModalOpen(false)} />
            </Modal>
            
        </div>
    )
}

export default Registration;