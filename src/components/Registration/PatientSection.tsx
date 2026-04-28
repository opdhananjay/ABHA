const PatinetSection = () => {
  return (
    <>
        {/* Main Registration */}
                    <div className="bg-white border-gray-200">

                    {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        ABHA Registration
                    </h2> */}

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
                                {/* <button onClick={() => setActiveModal("ABHA_ADDRESS")}  type="button" className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer bg-gray-300 text-sm">Create Abha</button> */}
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                            Address
                            </label>
                            <textarea
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2
                                                focus:ring-2 focus:ring-green-500 outline-none max-h-32 min-h-12"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                                District
                            </label>

                            <input
                                placeholder="District"
                                type="text"
                                className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                                State
                            </label>

                            <input
                                placeholder="State"
                                type="text"
                                className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <label className="md:w-40 text-sm font-medium text-gray-700">
                                Pincode
                            </label>

                            <input
                                placeholder="Pincode"
                                type="text"
                                className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            </div>
                        </div>

                    </form>

                </div>
    </>
  )
}

export default PatinetSection