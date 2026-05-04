import { useEffect, useState } from "react";
import { Search, UserPlus, Link2 } from "lucide-react";
import useABDM from "../../hooks/useABDM";
import toast from "react-hot-toast";
import {
  formatDOB,
  calculateAge
} from "../../utils/patientHelpers";

type Props = {
  profile: any;
  aadhar: string;
  abhaAddress: string;
  abhaNumber: string;
  onComplete?: (data: any) => void;
};

const UhIdLink = ({
  profile,
  aadhar,
  abhaAddress,
  abhaNumber,
  onComplete
}: Props) => {
  const {
    getPatient,
    getPatinetByMrno,
    savePatient
  } = useABDM();

  const [mode, setMode] = useState<
    "NEW" | "EXISTING"
  >("NEW");

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState<string | null>(
      null
    );

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const patientName = `${profile?.firstName || ""} ${
    profile?.lastName || ""
  }`.trim();

  // ================= SEARCH PATIENT =================
  useEffect(() => {
    if (search.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(
      async () => {
        setLoading(true);

        try {
          const res =
            await getPatient(
              search
            );

          if (
            res &&
            res.success
          ) {
            setResults(
              res.data || []
            );
          } else {
            setResults([]);
          }
        } catch (err) {
          console.error(err);
          setResults([]);
        }

        setLoading(false);
      },
      500
    );

    return () =>
      clearTimeout(timer);
  }, [search]);

  // ================= VALIDATION =================
  const validateCommon =
    () => {
      if (!profile) {
        toast.error(
          "Patient profile missing"
        );
        return false;
      }

      if (!abhaNumber) {
        toast.error(
          "ABHA Number missing"
        );
        return false;
      }

      if (!abhaAddress) {
        toast.error(
          "ABHA Address missing"
        );
        return false;
      }

      if(!localStorage.getItem("user")){
        toast.error('Kindly login again');
        return false;
      }

      if(!localStorage.getItem("user")){
        toast.error('Kindly select unit');
        return false;
      }

      return true;
    };

  // ================= PREPARE SAVE PAYLOAD =================
  const handlePrepareData = (
    patientData: any,
    tranMode: number
  ) => {
    const profileData =
      patientData || {};

    const address =
      patientData?.address || {};

    return {
      // Existing patient only
      mrNo:
        tranMode === 2
          ? patientData?.mrNo
          : null,

      // =========================
      // ABDM DATA (Readonly)
      // =========================
      patfname:
        profileData?.firstName || "",

      patlname:
        profileData?.lastName || "",

      patdob: formatDOB(
        profileData?.dateOfBirth
      ),

      patsex:
        profileData?.gender || "",

      patmobile:
        profileData?.mobile || "",

      pataddr1:
        address?.line || "",

      zip:
        address?.pincode || "",

      abhaNumber,
      abhaAddress,

      identityNumber:
        aadhar || "",

      // =========================
      // USER FILLED FIELDS
      // =========================
      patemail:
        profileData?.email || "",

      salutation:
        profileData?.salutationId || "",

      districtid:
        profileData?.districtId || "",

      regionid:
        profileData?.stateId || "",

      cityid:
        profileData?.cityId || "",

      // India default
      countryid: "079",

      // Optional fields
      maritalStatus:
        profileData?.maritalStatus || "",

      occupation:
        profileData?.occupation || "",

      religion:
        profileData?.religion || "",

      bloodGroup:
        profileData?.bloodGroup || "",

      // =========================
      // SYSTEM FIELDS
      // =========================
      patage:
        calculateAge(
          profileData?.dateOfBirth
        ),

      userID:
        localStorage.getItem(
          "user"
        ),

      appUnitSelection:
        localStorage.getItem(
          "selectedUnit"
        ),

      tranMode
    };
  };

  // ================= COMMON SAVE =================
  const handleSaveAction =
    async (
      payload: any
    ) => {
      try {
        const response =
          await savePatient(
            payload
          );

        if (!response || !response.success) {
          toast.error(
            "Failed to save patient"
          );
           return;
        }

        toast.success(
          response.message ||
            "UHID linked successfully"
        );

        onComplete?.(
          response.data
        );

      } 
      catch (err) {
        console.error(err);
        toast.error(
          "Something went wrong"
        );
      }
    };

  // ================= CREATE NEW =================
  const handleCreateNewUHID =
    async () => {
      if (
        !validateCommon()
      )
        return;
      console.log('profile uhid',profile)
      const payload =
        handlePrepareData(
          profile,
          1
        );
      console.log('payload payload',payload)

      await handleSaveAction(
        payload
      );
    };

  // ================= LINK EXISTING =================
  const handleLinkUHID =
    async () => {
      if (
        !validateCommon()
      )
        return;

      if (!selected) {
        toast.error(
          "Please select patient"
        );
        return;
      }

      try {
        const response =
          await getPatinetByMrno(
            selected
          );

        if (
          !response ||
          !response.success
        ) {
          toast.error(
            "Failed to fetch patient details"
          );
          return;
        }

        const payload =
          handlePrepareData(
            response.data,
            2
        );

        console.log('payload',payload);

        await handleSaveAction(
          payload
        );
      } 
      catch (err) {
        console.error(err);
        toast.error(
          "Failed to link patient"
        );
      }
    };

  return (
    <div className="bg-white rounded-md p-4 space-y-5">

      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={
              mode === "NEW"
            }
            onChange={() =>
              setMode("NEW")
            }
            className="accent-blue-600"
          />
          Create New UHID
        </label>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={
              mode ===
              "EXISTING"
            }
            onChange={() =>
              setMode(
                "EXISTING"
              )
            }
            className="accent-blue-600"
          />
          Link Existing UHID
        </label>
      </div>

      {/* ================= NEW ================= */}
      {mode === "NEW" && (
        <div className="space-y-3">

          <div className="bg-gray-50 border rounded-md p-3 text-sm space-y-1">
            <p>
              <span className="font-medium">
                Patient:
              </span>{" "}
              {
                patientName
              }
            </p>

            <p className="text-xs text-gray-500">
              ABHA:{" "}
              {
                abhaAddress
              }
            </p>
          </div>

          <div className="text-sm text-gray-600 flex items-center gap-2">
            <UserPlus size={14} />
            A new UHID will be created for this patient.
          </div>

          <button
            onClick={
              handleCreateNewUHID
            }
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Create UHID &
            Continue
          </button>
        </div>
      )}

      {/* ================= EXISTING ================= */}
      {mode ===
        "EXISTING" && (
        <div className="space-y-4">

          <div className="bg-gray-50 border rounded-md p-3 text-sm space-y-1">
            <p>
              <span className="font-medium">
                Patient:
              </span>{" "}
              {
                patientName
              }
            </p>

            <p className="text-xs text-gray-500">
              ABHA:{" "}
              {
                abhaAddress
              }
            </p>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <Search size={14} />
              Search Patient
            </label>

            <input
              value={
                search
              }
              onChange={(
                e
              ) => {
                setSearch(
                  e.target
                    .value
                );
                setSelected(
                  null
                );
              }}
              placeholder="Enter Name / MRNO / Mobile"
              className="w-full md:w-1/2 border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Search Results */}
          <div className="border rounded-md max-h-40 overflow-y-auto divide-y">

            {loading && (
              <p className="p-2 text-sm text-gray-500">
                Searching...
              </p>
            )}

            {!loading &&
              results.length ===
                0 &&
              search.length >=
                3 && (
                <p className="p-2 text-sm text-gray-400">
                  No results
                  found
                </p>
              )}

            {results.map(
              (
                item: any
              ) => (
                <label
                  key={
                    item.mrNo
                  }
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={
                      selected ===
                      item.mrNo
                    }
                    onClick={() =>
                      setSelected(
                        (
                          prev
                        ) =>
                          prev ===
                          item.mrNo
                            ? null
                            : item.mrNo
                      )
                    }
                    readOnly
                    className="accent-blue-600"
                  />

                  <div className="text-sm">
                    <p>
                      {
                        item.firstName
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {
                        item.mrNo
                      }
                    </p>
                  </div>
                </label>
              )
            )}
          </div>

          <button
            disabled={
              !selected
            }
            onClick={
              handleLinkUHID
            }
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md disabled:opacity-50 flex items-center gap-2"
          >
            <Link2 size={14} />
            Link UHID &
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default UhIdLink;