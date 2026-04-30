import { useState, useEffect } from "react";
import { Search, UserPlus, Link2 } from "lucide-react";
import useABDM from "../../hooks/useABDM";

type Props = {
  patinetName:string;
  abhaAddress: string;
  abhaNumber: string;
  onComplete?: (data: any) => void;
};

const UhIdLink = ({ patinetName , abhaAddress, abhaNumber, onComplete }: Props) => {

  const { getPatient } = useABDM();

  const [mode, setMode] = useState<"NEW" | "EXISTING">("NEW");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  //  API CALL WITH DEBOUNCE
  useEffect(() => {

    if (search.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await getPatient(search);

        if (res && res.success) {
          setResults(res.data || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      }

      setLoading(false);

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  return (
    <div className="bg-white rounded-md p-4 space-y-5">

      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={mode === "NEW"}
            onChange={() => setMode("NEW")}
            className="accent-blue-600"
          />
          Create New UHID
        </label>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={mode === "EXISTING"}
            onChange={() => setMode("EXISTING")}
            className="accent-blue-600"
          />
          Link Existing UHID
        </label>
      </div>

      {/* ================= NEW UHID ================= */}
      {mode === "NEW" && (
        <div className="space-y-3">

          {/* Patient Info */}
          <div className="bg-gray-50 border rounded-md p-3 text-sm space-y-1">
            <p className="text-gray-700">
              <span className="font-medium">Patient:</span> {patinetName}
            </p>
            <p className="text-gray-500 text-xs">
              ABHA: {abhaAddress}
            </p>
          </div>

          {/* Existing text */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <UserPlus size={14} />
            A new UHID will be created for this patient.
          </div>

          <button
            onClick={() => onComplete?.({ type: "NEW" })}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Create UHID & Continue
          </button>

        </div>
      )}

      {/* ================= EXISTING UHID ================= */}
      {mode === "EXISTING" && (
        <div className="space-y-4">

          {/* Search */}
          <div>
            <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
              <Search size={14} />
              Search Patient
            </label>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected(null); // reset selection
              }}
              placeholder="Enter Name / MRNO / Mobile"
              className="w-full md:w-1/2 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Results */}
          <div className="border rounded-md max-h-40 overflow-y-auto divide-y">

            {loading && (
              <p className="text-sm text-gray-500 p-2">Searching...</p>
            )}

            {!loading && results.length === 0 && search.length >= 3 && (
              <p className="text-sm text-gray-400 p-2">No results found</p>
            )}

            {results.map((r: any) => (
              <label
                key={r.mrNo}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  checked={selected === r.mrNo}
                  onClick={() =>
                    setSelected(prev => (prev === r.mrNo ? null : r.mrNo))
                  }
                  readOnly
                  className="accent-blue-600"
                />

                <div className="text-sm">
                  <p className="text-gray-800">{r.firstName}</p>
                  <p className="text-xs text-gray-500">{r.mrNo}</p>
                </div>
              </label>
            ))}

          </div>

          {/* Action */}
          <button
            disabled={!selected}
            onClick={() =>
              onComplete?.({
                type: "EXISTING",
                mrNo: selected
              })
            }
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md disabled:opacity-50 flex items-center gap-2"
          >
            <Link2 size={14} />
            Link UHID & Continue
          </button>

        </div>
      )}

    </div>
  );
};

export default UhIdLink;