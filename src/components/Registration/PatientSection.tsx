import { useEffect, useState } from "react";
import Select from "react-select";
import useMaster from "../../hooks/useMaster";

type Props = {
  profile: any;
  onComplete?: (data: any) => void;
};

const PatinetSection = ({
  profile,
  onComplete,
}: Props) => {
  
  const {
    states,
    districts,
    cities,
    countries,
    getStates,
    getDistricts,
    getCities,
    getCountries,
  } = useMaster();

  const [formData, setFormData] =
    useState<any>(profile);

  // ================= LOAD MASTER DATA =================
  useEffect(() => {
    getStates();
    getDistricts();
    getCities();
    getCountries();
  }, []);

  // ================= AUTO MAP ABDM DATA =================
  useEffect(() => {
    if (!profile) return;

    const matchedState =
      states.find(
        (item: any) =>
          item.text
            ?.toLowerCase()
            .trim() ===
          profile?.address?.state
            ?.toLowerCase()
            .trim()
      );

    const matchedDistrict =
      districts.find(
        (item: any) =>
          item.text
            ?.toLowerCase()
            .trim() ===
          profile?.address?.district
            ?.toLowerCase()
            .trim()
      );

    const matchedCountry =
      countries.find(
        (item: any) =>
          item.text
            ?.toLowerCase()
            .trim() === "india"
      );

    setFormData((prev: any) => ({
      ...prev,
      email: prev?.email || "",
      stateId:
        matchedState?.value || "",
      districtId:
        matchedDistrict?.value ||
        "",
      countryId:
        matchedCountry?.value ||
        "",
      cityId:
        prev?.cityId || "",
    }));
  }, [
    states,
    districts,
    countries,
    profile,
  ]);

  return (
    <>
      <div className="bg-white border-gray-200">

        <div className="text-xs text-gray-500 px-03 py-2 mb-2">
          Patient details are fetched from Aadhaar.
        </div>

        <form className="space-y-4">

          {/* NAME SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                readOnly
                value={
                  profile?.firstName || ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                readOnly
                value={
                  profile?.middleName ||
                  ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                readOnly
                value={
                  profile?.lastName || ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Gender
              </label>

              <div className="flex items-center gap-6 pointer-events-none opacity-70">

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={
                      profile?.gender ===
                      "M"
                    }
                    readOnly
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={
                      profile?.gender ===
                      "F"
                    }
                    readOnly
                  />
                  Female
                </label>

              </div>
            </div>
          </div>

          {/* DOB + Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                DOB
              </label>
              <input
                readOnly
                value={
                  profile?.dateOfBirth ||
                  ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                readOnly
                value={
                  profile?.mobile || ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

          </div>

          {/* EMAIL */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={
                formData?.email || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              placeholder="Enter email"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* ABHA DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                ABHA Number
              </label>
              <input
                readOnly
                value={
                  profile?.abhaNumber ||
                  ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40 text-sm font-medium text-gray-700">
                ABHA Address
              </label>
              <input
                readOnly
                value={
                  profile?.abhaAddress ||
                  ""
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

          </div>

          {/* ADDRESS */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              readOnly
              value={`${profile?.address?.line || ""}, ${profile?.address?.district || ""}, ${profile?.address?.state || ""} - ${profile?.address?.pincode || ""}`}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* DROPDOWNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* State */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                State
              </label>

              <Select
                options={states.map(
                  (item: any) => ({
                    label:
                      item.text,
                    value:
                      item.value,
                  })
                )}
                value={states
                  .map(
                    (
                      item: any
                    ) => ({
                      label:
                        item.text,
                      value:
                        item.value,
                    })
                  )
                  .find(
                    (
                      item: any
                    ) =>
                      item.value ===
                      formData?.stateId
                  )}
                onChange={(
                  selected: any
                ) =>
                  setFormData({
                    ...formData,
                    stateId:
                      selected?.value,
                  })
                }
              />
            </div>

            {/* District */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                District
              </label>

              <Select
                options={districts.map(
                  (item: any) => ({
                    label:
                      item.text,
                    value:
                      item.value,
                  })
                )}
                value={districts
                  .map(
                    (
                      item: any
                    ) => ({
                      label:
                        item.text,
                      value:
                        item.value,
                    })
                  )
                  .find(
                    (
                      item: any
                    ) =>
                      item.value ===
                      formData?.districtId
                  )}
                onChange={(
                  selected: any
                ) =>
                  setFormData({
                    ...formData,
                    districtId:
                      selected?.value,
                  })
                }
              />
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                City
              </label>

              <Select
                options={cities.map(
                  (item: any) => ({
                    label:
                      item.text,
                    value:
                      item.value,
                  })
                )}
                onChange={(
                  selected: any
                ) =>
                  setFormData({
                    ...formData,
                    cityId:
                      selected?.value,
                  })
                }
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>

              <Select
                options={countries.map(
                  (item: any) => ({
                    label:
                      item.text,
                    value:
                      item.value,
                  })
                )}
                value={countries
                  .map(
                    (
                      item: any
                    ) => ({
                      label:
                        item.text,
                      value:
                        item.value,
                    })
                  )
                  .find(
                    (
                      item: any
                    ) =>
                      item.value ===
                      formData?.countryId
                  )}
                onChange={(
                  selected: any
                ) =>
                  setFormData({
                    ...formData,
                    countryId:
                      selected?.value,
                  })
                }
              />
            </div>

          </div>

          {/* PINCODE */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">
              Pincode
            </label>

            <input
              readOnly
              value={
                profile?.address
                  ?.pincode || ""
              }
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* CONTINUE */}
          <div>
            <button
              type="button"
              onClick={() =>
                onComplete?.(
                  formData
                )
              }
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