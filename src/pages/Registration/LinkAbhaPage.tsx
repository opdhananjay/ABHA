import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Info,
  IdCard,
  ChevronDown,
  ChevronUp,
  Lock,
  BadgeCheck,
} from "lucide-react";

import PatinetSection from "../../components/Registration/PatientSection";
import UhIdLink from "../../components/Registration/UhidLink";

const LinkAbhaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [aadhar, setAadhar] = useState("");

  const { parsedData, typeData, txnId, type } = location.state || {};

  console.log("Parsed Data:", parsedData);
  console.log("Type Data:", typeData);
  console.log("Txn Id:", txnId);
  console.log("Type:", type);

  const [activeSection, setActiveSection] = useState<"PATIENT" | "UHID" | null>(
    "PATIENT",
  );
  const [status, setStatus] = useState({
    patient: "active",
    uhid: "pending",
  });

  useEffect(() => {
    if (!parsedData) {
      //navigate("/abhaverification");
    }
  }, [parsedData, navigate]);

  if (!parsedData) {
    // return null;
  }

  const [patientData, setPatientData] = useState(parsedData);

  const isAccessible = (key: keyof typeof status) => {
    if (key === "patient" && status[key] === "completed") {
      return true;
    }

    return status[key] === "active";
  };
  const toggleSection = (
    section: "PATIENT" | "UHID",
    key: keyof typeof status,
  ) => {
    const canOpen =
      status[key] === "active" ||
      (key === "patient" && status[key] === "completed");

    if (!canOpen) return;

    setActiveSection((prev) => (prev === section ? null : section));
  };

  const onCompleteUhid = (data: any) => {
    console.log("UHID Linked:", data);
    //navigate("/success");
  };

  const handlePatinetOnComplete = (data: any) => {
    console.log("data", data);

    setStatus((prev) => ({
      ...prev,
      patient: "completed",
      uhid: "active",
    }));

    setPatientData((prev: any) => ({
      ...prev,

      profile: {
        ...prev.profile,

        email: data.email,
        aadhar: data.aadhar,

        salutationId: data.salutationId,

        stateId: data.stateId,

        districtId: data.districtId,

        cityId: data.cityId,

        countryId: data.countryId,

        maritalStatus: data.maritalStatus,

        occupation: data.occupation,

        religion: data.religion,

        bloodGroup: data.bloodGroup,
      },
    }));

    setAadhar(data.aadhar || "");

    setActiveSection("UHID");
  };

  const handleUHIDOnComplete = (data: any) => {
    console.log("data", data);

    setStatus((prev) => ({
      ...prev,
      uhid: "completed",
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {/* ================= PATIENT ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div
            className={`flex justify-between items-center ${
              status.patient === "active" || status.patient === "completed"
                ? "cursor-pointer"
                : "opacity-60 cursor-not-allowed"
            }`}
            onClick={() => toggleSection("PATIENT", "patient")}
          >
            <div className="flex items-center gap-2">
              <Info className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">Patient Details</h3>
            </div>

            <div className="flex items-center gap-2">
              {status.patient === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <BadgeCheck size={16} />
                  Completed
                </span>
              )}

              {activeSection === "PATIENT" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "PATIENT" && isAccessible("patient") && (
            <div className="mt-4">
              <PatinetSection
                profile={patientData}
                aadhar={aadhar}
                isCompleted={status.patient === "completed"}
                onComplete={(data) => {
                  handlePatinetOnComplete(data);
                }}
              />
            </div>
          )}
        </div>

        {/* ================= UHID ================= */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div
            className={`flex justify-between items-center ${
              status.uhid === "active"
                ? "cursor-pointer"
                : "opacity-60 cursor-not-allowed"
            }`}
            onClick={() => toggleSection("UHID", "uhid")}
          >
            <div className="flex items-center gap-2">
              <IdCard className="text-green-600" size={18} />
              <h3 className="font-semibold text-gray-800">UHID Linking</h3>
            </div>

            <div className="flex items-center gap-2">
              {!isAccessible("uhid") && status.uhid !== "completed" && (
                <Lock size={14} />
              )}

              {status.uhid === "completed" && (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <BadgeCheck size={16} />
                  Completed
                </span>
              )}

              {activeSection === "UHID" ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>

          {activeSection === "UHID" && isAccessible("uhid") && (
            <div className="mt-4">
              <UhIdLink
                profile={patientData.profile}
                aadhar={aadhar}
                abhaAddress={patientData.abhaAddress}
                abhaNumber={patientData.abhaNumber}
                onComplete={(data) => {
                  handleUHIDOnComplete(data);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkAbhaPage;
