import { useState } from "react";
import { Search, UserPlus, Link2 } from "lucide-react";

type Props = {
  onComplete?: (data: any) => void;
};

const UhIdLink = ({ onComplete }: Props) => {

  const [mode, setMode] = useState<"NEW" | "EXISTING">("NEW");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const results = [
    { id: "MR-2024-1001", name: "Rahul Kumar" },
    { id: "MR-2024-1002", name: "Anil Sharma" }
  ];

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

      {/* NEW UHID */}
      {mode === "NEW" && (
        <div className="space-y-3">

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

      {/* EXISTING UHID */}
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter UHID or Name"
              className="w-full md:w-1/2 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Results */}
          <div className="border rounded-md max-h-40 overflow-y-auto divide-y">

            {results
              .filter(
                (r) =>
                  r.name.toLowerCase().includes(search.toLowerCase()) ||
                  r.id.toLowerCase().includes(search.toLowerCase())
              )
              .map((r) => (
                <label
                  key={r.id}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    checked={selected === r.id}
                    onChange={() => setSelected(r.id)}
                    className="accent-blue-600"
                  />

                  <div className="text-sm">
                    <p className="text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.id}</p>
                  </div>
                </label>
              ))}

          </div>

          {/* Action */}
          <button
            disabled={!selected}
            onClick={() => onComplete?.({ type: "EXISTING", uhid: selected })}
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