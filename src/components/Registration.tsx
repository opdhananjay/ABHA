import { useState } from "react";
import Modal from "./shared/Modal";
import OTPVerification from "./OTPVerification";
import UserInfoSection from "./shared/UserInfoSection";

const Registration = () => {

    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);


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
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input type="text"
                             className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                        focus:ring-2 focus:ring-green-500 outline-none"
                            />
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



                        



                       



                        
                        


                    </form>

                    </div>

                </div>

            </div>
        </>
        
    )
}

export default Registration;