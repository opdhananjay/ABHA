import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronUp,
  ShieldCheck,
  NotebookTabs
} from "lucide-react";
import ValidateAbhaSection from "../GetDetail/ValidateAbhaSection";
import ValidateMobileSection from "../GetDetail/ValidateMobileSection";


type Mode = "mobile" | "abha";

const AbhaVerification = () => {

  const navigate = useNavigate();

  const [selectedMode, setSelectedMode] = useState<Mode>("mobile");

  // Handle On Complete 
  const handleOnComplete = (parsedData, typeData, txnId, type) => {
      
      if(type === "mobile"){
        
      }

      if(type === "abha"){
        
      }

      navigate('/linkabhaverification');  // Pass Through State location 
  }

  return (
    <div className="bg-gray-100 min-h-screen py-4 px-3">

      <div className="max-w-5xl mx-auto space-y-4">

        {/* Back */}
        <button
          onClick={() => navigate("/module")}
          className="text-sm text-green-600 font-medium hover:underline"
        >
          ← Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            ABHA Verification 
          </h2>

          {/* Mode Selection (Improved) */}
          <div className="flex gap-4">

            <button
              onClick={() => setSelectedMode("mobile")}
              className={`px-4 py-2 rounded-md text-sm border transition
                ${selectedMode === "mobile"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              Mobile Number
            </button>

            <button
              onClick={() => setSelectedMode("abha")}
              className={`px-4 py-2 rounded-md text-sm border transition
                ${selectedMode === "abha"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              ABHA Address
            </button>

          </div>

          {/* MOBILE SECTION */}
          {selectedMode === "mobile" && (
            <div className="border rounded-lg p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-green-600" size={18} />
                  <h3 className="font-medium text-gray-800">
                    Mobile Verification
                  </h3>
                </div>

                {/* <ChevronUp size={18} className="text-gray-500" /> */}
              </div>

              <div className="mt-4">
                <ValidateMobileSection onComplete={({ parsed, mobile, txnId })=>{
                    handleOnComplete(parsed,mobile,txnId,"mobile");
                }} />
              </div>

            </div>
          )}

          {/* ABHA SECTION */}
          {selectedMode === "abha" && (
            <div className="border rounded-lg p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <NotebookTabs className="text-green-600" size={18} />
                  <h3 className="font-medium text-gray-800">
                    ABHA Address
                  </h3>
                </div>

                {/* <ChevronUp size={18} className="text-gray-500" /> */}
              </div>

              <div className="mt-4">
                <ValidateAbhaSection onComplete={({ parsed, abhaId, txnId})=>{
                    handleOnComplete(parsed, abhaId, txnId, "abha");
                }} />
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AbhaVerification;