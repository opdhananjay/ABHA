import { SearchCheck } from "lucide-react";
import { useEffect, useState } from "react";
import useABDM from "../../hooks/useABDM";
import toast from "react-hot-toast";

type Props = {
  transactionId: string;
  onComplete?: (data: any) => void;
};

const AbhaSection = ({ transactionId, onComplete }: Props) => {

  const { getSuggestedAbhaIds, createCustomAbhaId, error } = useABDM();

  const [txnId] = useState(transactionId || "");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [custom, setCustom] = useState("");
  const [suggestedAbhaIds, setSuggestedAbhaIds] = useState<string[]>([]);

  // 🔹 Fetch Suggestions
  const getSuggestedAbhaId = async () => {

    if (!txnId) {
      toast.error("Transaction Id missing");
      return;
    }

    const response = await getSuggestedAbhaIds({ txnId });

    if (!response || !response.success) {
      toast.error(error || "Failed to fetch ABHA addresses");
      return;
    }

    try {
      const parsed = JSON.parse(response.data);

      if (parsed.success) {
        setSuggestedAbhaIds(parsed.abhaAddressList || []);
      } else {
        toast.error(parsed.message || "Failed to fetch suggestions");
      }
    } catch (err) {
      console.error("Parse error", err);
    }
  };

  useEffect(() => {
    getSuggestedAbhaId();
  }, []);

  // 🔹 Create ABHA
  const createAbhaId = async () => {

    const finalAddress = selectedAddress || custom.trim();

    if (!finalAddress) {
      toast.error("Please select or enter ABHA address");
      return;
    }

    const response = await createCustomAbhaId({
      txnId,
      abhaAddress: finalAddress,
    });

    if (!response || !response.success) {
      toast.error(error || "Failed to create ABHA ID");
      return;
    }

    try {
      const parsed = JSON.parse(response.data);

      if (parsed.success) {
        toast.success(parsed.message || "ABHA created successfully");

        onComplete?.(parsed); // 🔥 important
      } else {
        toast.error(parsed.message || "Failed to create ABHA");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="space-y-5">

      {/* Title */}
      <h2 className="text-sm font-medium text-gray-700">
        Choose your ABHA Address
      </h2>

      {/* Suggestions */}
      <div className="max-h-[180px] overflow-y-auto rounded-lg border divide-y">
        {suggestedAbhaIds.length > 0 ? (
          suggestedAbhaIds.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="abha"
                value={item}
                checked={selectedAddress === item}
                onChange={() => {
                  setSelectedAddress(item);
                  setCustom("");
                }}
                className="accent-blue-600"
              />
              <span className="text-sm">{item}</span>
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-400 p-3">
            No suggestions available
          </p>
        )}
      </div>

      {/* OR */}
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        OR
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* Custom Input */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Create your own address</p>

        <div className="flex">
          <input
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value.replace(/\s/g, ""));
              setSelectedAddress("");
            }}
            placeholder="Enter username"
            className="w-full border rounded-l-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-600">
            @abdm
          </span>
        </div>

        {/* Availability UI (static for now) */}
        {/* {availabilityMsg && (
          <span className="text-xs text-gray-600">
            {availabilityMsg}
          </span>
        )} */}
      </div>

      {/* Button */}
      <button
        disabled={!selectedAddress && !custom}
        onClick={createAbhaId}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
      >
        Continue
      </button>

    </div>
  );
};

export default AbhaSection;