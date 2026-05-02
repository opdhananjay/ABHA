import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Info, IdCard, ChevronDown, ChevronUp } from "lucide-react";

import PatinetSection from "../../components/Registration/PatientSection";
import UhIdLink from "../../components/Registration/UhidLink";

const LinkAbhaPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { parsedData,typeData,txnId,type } = location.state || {};

  console.log("Parsed Data:", parsedData);
  console.log("Type Data:", typeData);
  console.log("Txn Id:", txnId);
  console.log("Type:", type);

  const [activeSection, setActiveSection] = useState<"PATIENT" | "UHID" | null>("PATIENT");

   useEffect(() => {
    if (!parsedData) {
      //navigate("/abhaverification");
    }
  }, [parsedData, navigate]); 
  
  if (!parsedData) {
   // return null;
  }

  const patientData = parsedData;

  const toggleSection = (section: "PATIENT" | "UHID") => {
    setActiveSection(prev => (prev === section ? null : section));
    // 👆 no collapse for patient (optional logic tweak)
  };

  const onCompleteUhid = (data: any) => {
    console.log("UHID Linked:", data);
    //navigate("/success");
  };

  const handlePatinetOnComplete = (data:any) => {
    console.log('data', data);  
    setActiveSection('UHID')

  }

  const handleUHIDOnComplete = (data:any) => {
    console.log('data',data);
    
     
  }

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-7xl mx-auto px-4 space-y-4">

        {/* ================= PATIENT ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("PATIENT")}
          >
            <div className="flex items-center gap-2">
              <Info className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">
                Patient Details
              </h3>
            </div>

            {activeSection === "PATIENT" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {activeSection === "PATIENT" && (
            <div className="mt-4">
              <PatinetSection profile={patientData} onComplete={(data) =>{ handlePatinetOnComplete(data) }} />
            </div>
          )}

        </div>

        {/* ================= UHID ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("UHID")}
          >
            <div className="flex items-center gap-2">
              <IdCard className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">
                UHID Linking
              </h3>
            </div>

            {activeSection === "UHID" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {activeSection === "UHID" && (
            <div className="mt-4">
              <UhIdLink
                patinetName={patientData?.profile?.firstName || ""}
                abhaAddress={patientData?.abhaAddress}
                abhaNumber={patientData?.abhaNumber}
                onComplete={(data)=>{ handleUHIDOnComplete(data) }}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LinkAbhaPage;