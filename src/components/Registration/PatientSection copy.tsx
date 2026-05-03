type Props = {
    profile: any;
    onComplete?: (data:any) => void;
}

const PatinetSection = ({ profile, onComplete }: Props) => {

  return (
    <>
      <div className="bg-white border-gray-200">

        <div className="text-xs text-gray-500 px-03 py-2 mb-2">
          Patient details are fetched from Aadhaar.
        </div>

        <form className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                readOnly
                value={profile?.firstName || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Middle Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                readOnly
                value={profile?.middleName || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                readOnly
                value={profile?.lastName || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Gender (READONLY FIX) */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Gender
              </label>

              <div className="flex items-center gap-6 pointer-events-none opacity-70">

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile?.gender === "M"}
                    readOnly
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile?.gender === "F"}
                    readOnly
                  />
                  Female
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={profile?.gender !== "M" && profile?.gender !== "F"}
                    readOnly
                  />
                  Other
                </label>

              </div>
            </div>

          </div>

          {/* DOB + Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <input
                type="text"
                readOnly
                value={profile?.dateOfBirth || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Mobile
              </label>

              <input
                type="text"
                readOnly
                value={profile?.mobile || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

          </div>

         {/* UHID + ABHA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* UHID */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40 text-sm font-medium text-gray-700">
                UHID
                </label>

                <input
                type="text"
                readOnly
                value={profile?.uhid || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
            </div>

            {/* ABHA Number */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40 text-sm font-medium text-gray-700">
                ABHA No.
                </label>

                <input
                type="text"
                readOnly
                value={profile?.abhaNumber || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
            </div>

            {/* ✅ NEW FIELD → ABHA Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40 text-sm font-medium text-gray-700">
                ABHA Address
                </label>

                <input
                type="text"
                readOnly
                value={profile?.abhaAddress || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
            </div>

        </div>

          {/* Address */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              readOnly
              value={`${profile?.address?.line || ""}, ${profile?.address?.district || ""}, ${profile?.address?.state || ""} - ${profile?.address?.pincode || ""}`}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 max-h-32"
            />
          </div>

          {/* District / State / Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                District
              </label>

              <input
                type="text"
                readOnly
                value={profile?.address?.district || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                readOnly
                value={profile?.address?.state || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Pincode
              </label>

              <input
                type="text"
                readOnly
                value={profile?.address?.pincode || ""}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

          </div>

          {/* Continue */}
          <div>
            <button
              type="button"
              onClick={() => onComplete?.(profile)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Continue
            </button>
          </div>

        </form>

      </div>
    </>
  );
};

export default PatinetSection;