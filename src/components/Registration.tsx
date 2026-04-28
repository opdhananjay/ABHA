import { useState } from "react";
import AadharSection from "./Registration/AadharSection";
import { BadgeCheck, ChevronDown, ChevronUp, IdCard, Info, NotebookTabs, ShieldCheck } from "lucide-react";
import PatinetSection from "./Registration/PatientSection";
import MobileVerificationSection from "./Registration/MobileVerificationSection";
import AbhaSection from "./Registration/AbhaSection";
import UhIdLink from "./Registration/UhidLink";

const Registration = () => {

    const [activeSection,setActiveSection] = useState("");

    const [status,setStatus] = useState({
        aadhar:"active",
        mobile:"pending",  
        patient:"pending",
        abha:"pending",
        uhid:"pending"
    });

    const onCompleteAadharVerification = () => {
        
        setStatus({...status,aadhar: "completed",mobile: "active"});
        setActiveSection("MOBILE");
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-4">
                
                <div className="max-w-7xl mx-auto px-4 space-y-4">
                     
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        {/* Header */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() =>
                                setActiveSection(prev => prev === "AADHAR" ? "" : "AADHAR")
                            }
                            >

                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-green-600" size={18} />
                                <h3 className="font-semibold text-gray-800">
                                    Aadhaar Verification
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                              {status.aadhar === "completed" && (
                                <span className="flex items-center gap-1 text-green-600 text-xs">
                                    <BadgeCheck size={14} /> Verified
                                </span>
                                )}

                                {activeSection === "AADHAR" ? (
                                <ChevronUp size={18} />
                                ) : (
                                <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        {activeSection === "AADHAR" && (
                            <div className="mt-4">
                            <AadharSection
                                onComplete={() => {
                                    onCompleteAadharVerification();
                                }}
                            />
                            </div>
                        )}

                    </div>

                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        {/* Header */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() =>
                                setActiveSection(prev => prev === "MOBILE" ? "" : "MOBILE")
                            }
                            >

                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-green-600" size={18} />
                                <h3 className="font-semibold text-gray-800">
                                    Mobile Verification
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                {status.mobile === "completed" && (
                                <span className="flex items-center gap-1 text-green-600 text-xs">
                                    <BadgeCheck size={14} /> Verified
                                </span>
                                )}

                                {activeSection === "MOBILE" ? (
                                <ChevronUp size={18} />
                                ) : (
                                <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        {activeSection === "MOBILE" && (
                            <div className="mt-4">
                              <MobileVerificationSection onComplete={()=>{
                                 setStatus({
                                    ...status,
                                    mobile: "completed",
                                    patient: "active"
                                });
                                setActiveSection("PATIENT");
                              }} />
                            </div>
                        )}

                    </div>

                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        {/* Header */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() =>
                                setActiveSection(prev => prev === "PATIENT" ? "" : "PATIENT")
                            }
                            >
                            <div className="flex items-center gap-2">
                                <Info className="text-green-600" size={18} />
                                <h3 className="font-semibold text-gray-800">
                                    Details
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                {status.patient === "completed" && (
                                    <span className="flex items-center gap-1 text-green-600 text-xs">
                                        <BadgeCheck size={14} /> Verified
                                    </span>
                                )}

                                {activeSection === "PATIENT" ? (
                                <ChevronUp size={18} />
                                ) : (
                                <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        {activeSection === "PATIENT" && (
                            <div className="mt-4">
                               <PatinetSection />
                            </div>
                        )}

                    </div>

                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        {/* Header */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() =>
                                setActiveSection(prev => prev === "ABHA" ? "" : "ABHA")
                            }
                            >
                            <div className="flex items-center gap-2">
                                <NotebookTabs className="text-green-600" size={18} />
                                <h3 className="font-semibold text-gray-800">
                                    ABHA Address
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                {status.abha === "completed" && (
                                    <span className="flex items-center gap-1 text-green-600 text-xs">
                                        <BadgeCheck size={14} /> Verified
                                    </span>
                                )}

                                {activeSection === "ABHA" ? (
                                <ChevronUp size={18} />
                                ) : (
                                <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        {activeSection === "ABHA" && (
                            <div className="mt-4">
                               <AbhaSection />
                            </div>
                        )}

                    </div>

                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        {/* Header */}
                        <div className="flex justify-between items-center cursor-pointer" 
                            onClick={()=>{
                                setActiveSection(prev => prev === "UHID" ? "" : "UHID")
                            }}>
                           
                            <div className="flex items-center gap-2">
                                <IdCard className="text-green-600" size={18} />
                                <h3 className="font-semibold text-gray-800">
                                    UHID Linking
                                </h3>
                            </div> 

                             <div className="flex items-center gap-2">
                                {status.uhid === "completed" && (
                                   <span className="flex items-center gap-1 text-green-600 text-xs">
                                      <BadgeCheck size={14} /> Verified
                                   </span>
                                )}

                                {activeSection === "UHID" ? (
                                <ChevronUp size={18} />
                                ) : (
                                <ChevronDown size={18} />
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        {activeSection === "UHID" && (
                            <div className="mt-4">
                                <UhIdLink />
                            </div>
                        )}
                        
                    </div>

                  </div>
            </div>
        </>
    )
}

export default Registration;