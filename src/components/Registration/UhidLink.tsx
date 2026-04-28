import { useState } from "react";
import { Search, UserPlus, Link2 } from "lucide-react";

const UhIdLink = () => {

  const [mode, setMode] = useState<"NEW" | "EXISTING">("NEW");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([
    { id: "MR-2024-1001", name: "Rahul Kumar" },
    { id: "MR-2024-1002", name: "Anil Sharma" }
  ]);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-2">

      <div className="space-y-4">

        <div className="flex flex-col md:flex-row gap-3">

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={mode === "NEW"}
              onChange={() => setMode("NEW")}
            />
            Create NEW UHID
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={mode === "EXISTING"}
              onChange={() => setMode("EXISTING")}
            />
            Link with EXISTING UHID
          </label>

        </div>

        {mode === "NEW" && (
          <div className="bg-gray-50 p-3 rounded-md">

            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <UserPlus size={15} />
              <span className="text-sm">
                Create new UHID for patient
              </span>
            </div>

            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
              Create UHID & Complete
            </button>

          </div>
        )}

        {mode === "EXISTING" && (
          <div className="bg-gray-50 p-3 rounded-md space-y-3">

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                <Search size={13} />
                Search Patient
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter UHID / Name"
                className="w-full md:w-1/2 border rounded-md px-2 py-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">

              {results
                .filter(
                  (r) =>
                    r.name.toLowerCase().includes(search.toLowerCase()) ||
                    r.id.toLowerCase().includes(search.toLowerCase())
                )
                .map((r) => (
                  <label
                    key={r.id}
                    className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer hover:bg-white"
                  >
                    <input
                      type="radio"
                      checked={selected === r.id}
                      onChange={() => setSelected(r.id)}
                    />
                    <span className="text-sm">
                      {r.name} ({r.id})
                    </span>
                  </label>
                ))}

            </div>

            <button
              disabled={!selected}
              className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md disabled:opacity-50 hover:bg-green-700 transition flex items-center gap-2"
            >
              <Link2 size={13} />
              Link UHID & Complete
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default UhIdLink;