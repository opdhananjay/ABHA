import { useState } from "react";
import Modal from "./shared/Modal";
import OTPVerification from "./OTPVerification";
import UserInfoSection from "./shared/UserInfoSection";
import AadharDetails from "./AadharDetails";
import CreateAddress from "./CreateAddress";

type ModalType = "NONE" | "OTP_VERIFICATION" | "ABHA_ADDRESS";  // opening Modal types

const Registration = () => {

    const [activeModal,setActiveModal] = useState<ModalType>("NONE");


    // Create Abha Address Region Stats 
    
    const [suggestedAddresses, setSuggestedAddresses] = useState<string[]>([]);
    const [selectedAddress,setSelectedAddress] = useState("");  
    const [customAddress,setCustomAddress] = useState("");
    const [isFetchingAddresses,setIsFetchingAddresses] = useState(false);

    const handleCreateAbha = async () => {
        
    }
    
    // End of Region


    // OTT Verification Region Stats
    
    const handleNotifyResponseOTPVerification = (response?:any) => {
        console.log("OTP Verification Result", response);
    };  

    // End of Region

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-4">
  
                <div className="max-w-7xl mx-auto px-4 space-y-4">

                    {/* User Info Section */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                         <UserInfoSection />
                    </div>

                    {/* Main Registration */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        ABHA Registration
                    </h2>

                    <form className="space-y-4">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                    Middle Name
                                </label>
                                <input type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                        </div>

                        

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                Age
                                </label>

                                <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                    Gender
                                </label>

                                <div className="flex item-center gap-6">

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            className="accent-green-600"
                                        />
                                        Male
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            className="accent-green-600"
                                        />
                                        Female
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            className="accent-green-600"
                                        />
                                        Other
                                    </label>

                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                               Aadhar No.
                            </label>
                            <input type="text"
                             className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                        focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            <button type="button" onClick={() => setActiveModal("OTP_VERIFICATION")} className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer bg-green-600 text-white">Verify</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                Date of Birth
                                </label>

                                <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                 Mobile
                                </label>

                                <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <div className="flex flex-col md:flex-row md:items-center gap-2     md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                 UHID
                                </label>

                                <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2     md:gap-4">
                                <label className="md:w-40 text-sm font-medium text-gray-700">
                                 ABHA ID
                                </label>

                                <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                            focus:ring-2 focus:ring-green-500 outline-none"
                                />
                                <button onClick={() => setActiveModal("ABHA_ADDRESS")}  type="button" className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer bg-gray-300 text-sm">Create Abha</button>
                            </div>

                        </div>

                    </form>

                    </div>

                    {/* Aadhar Details */}
                    <div>
                        <AadharDetails/>
                    </div>

                </div>

            </div>

           <Modal
                isOpen={activeModal === "OTP_VERIFICATION"}
                onClose={()=>setActiveModal('NONE')}
                showCloseBtn={true}
                title="Aadhar Verification"
                width="max-w-lg"
                height="auto"
            >
              <OTPVerification
                    onClose={() => setActiveModal('NONE')}
                    mode="mobile"
                    mobileNumber="8104773699"
                    onSuccess={handleNotifyResponseOTPVerification}
               />
           </Modal>

           <Modal isOpen={activeModal === "ABHA_ADDRESS"}
                onClose={()=>setActiveModal('NONE')}
                showCloseBtn={true}
                title="Create ABHA Address"
                width="max-w-lg"
                height="auto"
           >
               <CreateAddress 
                    suggestedAddresses={suggestedAddresses}
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    customAddress={customAddress}
                    onCustomAddressChange={setCustomAddress}
                    onSubmit={handleCreateAbha}
                    loading={isFetchingAddresses}
               />
           </Modal>



        </>
        
    )
}

export default Registration;