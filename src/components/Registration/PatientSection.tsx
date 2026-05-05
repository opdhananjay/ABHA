import { useEffect, useState } from "react";
import Select from "react-select";
import useMaster from "../../hooks/useMaster";
import toast from "react-hot-toast";

type Props = {
  profile: any;
  aadhar:string;
  onComplete?: (data: any) => void;
  isCompleted?: boolean;
};

const PatinetSection = ({
  profile,
  aadhar,
  onComplete,
  isCompleted
}: Props) => {

  const patientProfile =
    profile?.profile || {};

  const patientAddress =
    patientProfile?.address || {};

  const {
    salutations,
    states,
    districts,
    cities,
    countries,
    getSalutations,
    getStates,
    getDistricts,
    getCities,
    getCountries,
  } = useMaster();

  const [isLocked, setIsLocked] = useState(isCompleted || false);

  const [formData, setFormData] =
    useState<any>({
      ...profile,
      email: patientProfile?.email || "",
      aadhar:patientProfile?.aadhar || "",
      salutationId:patientProfile?.salutationId || "",
      stateId:patientProfile?.stateId || "",
      districtId:patientProfile?.districtId || "",
      cityId:patientProfile?.cityId || "",
      countryId:patientProfile?.countryId || "",
    });

  // ---------------- LOAD MASTER DATA ----------------
  useEffect(() => {
    const loadMasterData = async () => {
      await Promise.all([
        getSalutations(),
        getStates(),
        getDistricts(),
        getCities(),
        getCountries(),
      ]);
    };

    loadMasterData();
  }, []);

  // ---------------- AUTO MAP ----------------
  useEffect(() => {
    if (
      !profile ||
      salutations.length === 0 ||
      states.length === 0 ||
      districts.length === 0 ||
      countries.length === 0
    ) {
      return;
    }

    setFormData((prev: any) => {
      if (prev?.countryId) return prev;

      const matchedSalutation =
        salutations.find(
          (item: any) =>
            item.defGender?.toUpperCase() ===
              patientProfile?.gender?.toUpperCase() &&
            item.status === "A"
        );

      const matchedState =
        states.find(
          (item: any) =>
            item.text?.toLowerCase().trim() ===
            patientAddress?.state
              ?.toLowerCase()
              ?.trim()
        );

      const matchedDistrict =
        districts.find(
          (item: any) =>
            item.text?.toLowerCase().trim() ===
            patientAddress?.district
              ?.toLowerCase()
              ?.trim()
        );

      const matchedCountry =
        countries.find(
          (item: any) =>
            item.text
              ?.toLowerCase()
              ?.includes("india")
        );

      return {
        ...prev,
        salutationId:
          matchedSalutation?.value || "",
        stateId:
          matchedState?.value || "",
        districtId:
          matchedDistrict?.value || "",
        countryId:
          matchedCountry?.value || "",
      };
    });
  }, [
    profile,
    salutations,
    states,
    districts,
    countries,
  ]);

  const formatOptions = (
    data: any[]
  ) =>
    data.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  // ---------------- VALIDATION ----------------
  const handleContinue = () => {
    if (!formData?.salutationId) {
      toast.error(
        "Please select salutation"
      );
      return;
    }

    if (!formData?.email?.trim()) {
      toast.error(
        "Please enter email"
      );
      return;
    }

    if (!aadhar && !formData?.aadhar) {
      toast.error(
          "Please enter Aadhaar number"
      );
      return;
    }

    if (!formData?.stateId) {
      toast.error(
        "Please select state"
      );
      return;
    }

    if (!formData?.districtId) {
      toast.error(
        "Please select district"
      );
      return;
    }

    if (!formData?.cityId) {
      toast.error(
        "Please select city"
      );
      return;
    }

    setIsLocked(true);

    onComplete?.(formData);
  };

  return (
    <div className="bg-white border-gray-200">

      <div className="text-xs text-gray-500 py-2 mb-2">
        Patient details are fetched from Aadhaar.
      </div>

      <form className="space-y-4">

        {/* SALUTATION */}
        <DropdownField
          label="Salutation"
          options={formatOptions(
            salutations.filter(
              (x: any) =>
                x.status === "A"
            )
          )}
          value={formData?.salutationId}
          onChange={(value: any) =>
            setFormData({
              ...formData,
              salutationId: value,
            })
          }
        />

        {/* NAME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            value={
              patientProfile?.firstName
            }
          />

          <InputField
            label="Middle Name"
            value={
              patientProfile?.middleName
            }
          />

          <InputField
            label="Last Name"
            value={
              patientProfile?.lastName
            }
          />

          <InputField
            label="DOB"
            value={
              patientProfile?.dateOfBirth
            }
          />

          <InputField
            label="Mobile"
            value={
              patientProfile?.mobile
            }
          />

          <InputField
            label="ABHA Number"
            value={
              profile?.abhaNumber
            }
          />

          <InputField
            label="ABHA Address"
            value={
              profile?.abhaAddress
            }
          />

          <InputField
            label="Gender"
            value={
              patientProfile?.gender === "M"
                ? "Male"
                : patientProfile?.gender === "F"
                ? "Female"
                : patientProfile?.gender === "O"
                ? "Other"
                : ""
            }
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            value={formData?.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            className="flex-1 border rounded-md px-3 py-2"
          />
        </div>

        {!aadhar && (
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Aadhaar Number
            </label>

            <input
              type="text"
              maxLength={12}
              value={formData?.aadhar || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  aadhar: e.target.value
                })
              }
              className="flex-1 border rounded-md px-3 py-2"
              placeholder="Enter Aadhaar Number"
            />
          </div>
        )}


        {/* ADDRESS */}
        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Address
          </label>

          <textarea
            readOnly
            value={`${patientAddress?.line || ""}, ${patientAddress?.district || ""}, ${patientAddress?.state || ""}`}
            className="flex-1 border rounded-md px-3 py-2 bg-gray-100"
          />
        </div>

        {/* DROPDOWNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <DropdownField
            label="State"
            options={formatOptions(
              states
            )}
            value={
              formData?.stateId
            }
            onChange={(value: any) =>
              setFormData({
                ...formData,
                stateId: value,
              })
            }
          />

          <DropdownField
            label="District"
            options={formatOptions(
              districts
            )}
            value={
              formData?.districtId
            }
            onChange={(value: any) =>
              setFormData({
                ...formData,
                districtId: value,
              })
            }
          />

          <DropdownField
            label="City"
            options={formatOptions(
              cities
            )}
            value={
              formData?.cityId
            }
            onChange={(value: any) =>
              setFormData({
                ...formData,
                cityId: value,
              })
            }
          />

          <InputField
            label="Country"
            value="India"
          />
        </div>

        <InputField
          label="Pincode"
          value={
            patientAddress?.pincode
          }
        />

        <button
          type="button"
          onClick={
            handleContinue
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Continue
        </button>

      </form>
    </div>
  );
};

export default PatinetSection;


// ---------------- INPUT ----------------
const InputField = ({
  label,
  value,
}: any) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
    <label className="md:w-40 text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      readOnly
      value={value || ""}
      className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
    />
  </div>
);


// ---------------- DROPDOWN ----------------
const DropdownField = ({
  label,
  options,
  value,
  onChange,
}: any) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
    <label className="md:w-40 text-sm font-medium text-gray-700">
      {label}
    </label>

    <Select
      className="flex-1"
      options={options}
      value={options.find(
        (item: any) =>
          item.value === value
      )}
      onChange={(selected: any) =>
        onChange(
          selected?.value
        )
      }
    />
  </div>
);