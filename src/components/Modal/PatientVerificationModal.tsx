import { CircleX } from "lucide-react";

type Props = {
  isOpen: boolean;
  abhaProfile: any;
  patientData?: any;
  isNewPatient?: boolean;
  onContinue: () => void;
  onCancel: () => void;
};

const PatientVerificationModal = ({
  isOpen,
  abhaProfile,
  patientData,
  isNewPatient,
  onContinue,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-fit min-w-[420px] max-w-[95vw]">
        {/* HEADER */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Verify Patient Details</h2>

          <button onClick={onCancel} className="text-gray-500 text-xl cursor-pointer">
            <CircleX />
          </button>
        </div>

        {/* BODY */}
        <div
          className={
            isNewPatient
              ? "flex gap-4 p-4 items-start w-fit shadow-lg"
              : "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full shadow-lg"
          }
        >
          {/* LEFT - ABHA */}
          <div
            className={
              isNewPatient
                ? "rounded-lg p-3 inline-block"
                : "rounded-lg p-3 w-full"
            }
          >
            <h3 className="font-semibold mb-4 text-green-700">
              ABHA Profile Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Full Name:</b> {abhaProfile?.firstName}{" "}
                {abhaProfile?.lastName}
              </p>

              <p>
                <b>Gender:</b> {abhaProfile?.gender}
              </p>

              <p>
                <b>DOB:</b> {abhaProfile?.dob}
              </p>

              <p>
                <b>Mobile:</b> {abhaProfile?.mobile}
              </p>

              <p>
                <b>ABHA Number:</b> {abhaProfile?.abhaNumber}
              </p>

              <p>
                <b>ABHA Address:</b> {abhaProfile?.abhaAddress}
              </p>
            </div>
          </div>

          {/* RIGHT - EXISTING PATIENT */}
          {!isNewPatient && (
            <div className="rounded-lg p-3 w-full">
              <h3 className="font-semibold mb-4 text-blue-700">
                Selected Patient Details
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <b>Patient Name:</b> {patientData?.firstName}
                </p>

                <p>
                  <b>Gender:</b> {patientData?.gender}
                </p>

                <p>
                  <b>DOB:</b> {patientData?.dateOfBirth}
                </p>

                <p>
                  <b>Mobile:</b> {patientData?.mobile}
                </p>

                <p>
                  <b>MRNO / UHID:</b> {patientData?.mrNo}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md">
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientVerificationModal;
