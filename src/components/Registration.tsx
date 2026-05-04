import { useState } from "react";
import AadharSection from "./Registration/AadharSection";
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  IdCard,
  Info,
  NotebookTabs,
  ShieldCheck,
  Lock
} from "lucide-react";
import MobileVerificationSection from "./Registration/MobileVerificationSection";
import AbhaSection from "./Registration/AbhaSection";
import UhIdLink from "./Registration/UhidLink";
import PatinetSection from "./Registration/PatientSection";

const Registration = () => {

  const [txnId, setTxnId] = useState("");
  const [aadhar, setAadhar] = useState("");

  const [activeSection, setActiveSection] = useState("");


  // active , pending , completed
  const [status, setStatus] = useState({
    aadhar: "active",
    mobile: "active",
    patient: "active",
    abha: "active",
    uhid: "active"
  });

  const [patientData, setPatientData] = useState<any>({
    profile: {},
    abhaNumber: "",
    abhaAddress: ""
  });

  const [aadhaarMobile, setAadhaarMobile] = useState("");

  // 🔒 Lock logic
  const isAccessible = (key: keyof typeof status) => {
    return status[key] === "active" || status[key] === "completed";
  };

  const toggleSection = (section: string, key: keyof typeof status) => {
    if (!isAccessible(key)) return;
    setActiveSection(prev => (prev === section ? "" : section));
  };

  // ✅ Aadhaar Done
  const onCompleteAadharVerification = (data: any, txn: string, mobile: string, aadhar:string) => {

    setTxnId(txn);
    setAadhar(aadhar);
    setAadhaarMobile(mobile || data.profile?.mobile || "");

    console.log('profile',data)

    setPatientData({
      profile: data.profile || {},
      abhaNumber: data.abhaNumber || "",
      abhaAddress: data.abhaAddress || ""
    });

    setStatus(prev => ({
      ...prev,
      aadhar: "completed",
      mobile: "active"
    }));

    setActiveSection("MOBILE");
  };

  // ✅ Mobile Done
  const onCompleteMobileVerification = () => {
    setStatus(prev => ({
      ...prev,
      mobile: "completed",
      patient: "active"
    }));

    setActiveSection("PATIENT");
  };

  // ✅ Patient Done
  const onCompletePatientDetails = (updatedProfile: any) => {

    setPatientData((prev: any) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updatedProfile
      }
    }));

    setStatus(prev => ({
      ...prev,
      patient: "completed",
      abha: "active"
    }));

    setActiveSection("ABHA");
  };

  // ✅ ABHA Done
  const onCompleteAbha = () => {
    setStatus(prev => ({
      ...prev,
      abha: "completed",
      uhid: "active"
    }));

    setActiveSection("UHID");
  };

  // ✅ UHID Done
  const onCompleteUhid = () => {
    setStatus(prev => ({
      ...prev,
      uhid: "completed"
    }));

    setActiveSection("");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-4">
     
      <div className="max-w-7xl mx-auto px-4 space-y-4">

        {/* ================= AADHAAR ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div
            className={`flex justify-between items-center ${
              !isAccessible("aadhar") ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => toggleSection("AADHAR", "aadhar")}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">Aadhaar Verification</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("aadhar") && <Lock size={14} />}
              {status.aadhar === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={14} /> Verified
                </span>
              )}
              {activeSection === "AADHAR" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "AADHAR" && isAccessible("aadhar") && (
            <div className="mt-4">
              <AadharSection onComplete={onCompleteAadharVerification} />
            </div>
          )}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className={`flex justify-between items-center ${
              !isAccessible("mobile") ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => toggleSection("MOBILE", "mobile")}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">Mobile Verification</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("mobile") && <Lock size={14} />}
              {status.mobile === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={14} /> Verified
                </span>
              )}
              {activeSection === "MOBILE" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "MOBILE" && isAccessible("mobile") && (
            <div className="mt-4">
              <MobileVerificationSection
                transactionId={txnId}
                aadhaarMobile={aadhaarMobile}
                onComplete={onCompleteMobileVerification}
              />
            </div>
          )}
        </div>

        {/* ================= PATIENT ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className={`flex justify-between items-center ${
              !isAccessible("patient") ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => toggleSection("PATIENT", "patient")}
          >
            <div className="flex items-center gap-2">
              <Info className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">Patient Details</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("patient") && <Lock size={14} />}
              {status.patient === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={14} /> Completed
                </span>
              )}
              {activeSection === "PATIENT" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "PATIENT" && isAccessible("patient") && (
            <div className="mt-4">
              <PatinetSection
                profile={patientData}
                onComplete={onCompletePatientDetails}
              />
            </div>
          )}
        </div>

        {/* ================= ABHA ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className={`flex justify-between items-center ${
              !isAccessible("abha") ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => toggleSection("ABHA", "abha")}
          >
            <div className="flex items-center gap-2">
              <NotebookTabs className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">ABHA Address</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("abha") && <Lock size={14} />}
              {status.abha === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={14} /> Completed
                </span>
              )}
              {activeSection === "ABHA" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "ABHA" && isAccessible("abha") && (
            <div className="mt-4">
              <AbhaSection transactionId={txnId} onComplete={onCompleteAbha} />
            </div>
          )}
        </div>

        {/* ================= UHID ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <div
            className={`flex justify-between items-center ${
              !isAccessible("uhid") ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => toggleSection("UHID", "uhid")}
          >
            <div className="flex items-center gap-2">
              <IdCard className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">UHID Linking</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("uhid") && <Lock size={14} />}
              {status.uhid === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={14} /> Completed
                </span>
              )}
              {activeSection === "UHID" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "UHID" && isAccessible("uhid") && (
            <div className="mt-4">
              <UhIdLink profile={patientData.profile} aadhar={aadhar} abhaAddress={patientData.abhaAddress} abhaNumber={patientData.abhaNumber} onComplete={onCompleteUhid} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Registration;