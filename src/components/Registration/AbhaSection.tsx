import { SearchCheck } from "lucide-react";
import { useEffect, useState } from "react";
import useABDM from "../../hooks/useABDM";
import toast from "react-hot-toast";

type Props = {
  transactionId:string;
  onComplete?:(data:any) => void;
}

const AbhaSection = ({ transactionId,onComplete }:Props) => {
    
  const [txnId, setTxnId] = useState(transactionId || ""); // Local  
  const { getSuggestedAbhaIds,checkAbhaIdAvailable,createCustomAbhaId,error} = useABDM();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [custom, setCustom] = useState("");
  const [suggestedAbhaIds,setSuggestedAbhaIds] = useState([]);

  const getSuggestedAbhaId = async () => {
    
    if(transactionId == ""){
      toast.error("Failed to fetch abha address transaction Id.");
      return;
    }

    const dataToSend = {
      txnId:txnId
    }

    const response = await getSuggestedAbhaIds(dataToSend);

    if(!response || !response.success){
      toast.error(error || "Failed to fetch abha address.");
      return;
    }

    try{

      const parsed = JSON.parse(response.data);

      if(parsed.success){

        const allAbhaIds = parsed.abhaAddressList;

        setSuggestedAbhaIds(allAbhaIds);

        toast.success(parsed.message || 'fetch succesfully')
      }
      else{
        toast.error(parsed.message || "failed to fetch abha addresses");
      }

    }
    catch(err:any){
      console.error("Error", err);
    }
  }

  useEffect(()=>{
    getSuggestedAbhaId();
  },[])

  const createAbhaId = async (e:any) => {  
    
    e.preventDefault();

    if(custom === ""){
      toast.error("Kindly use abha id");
      return;
    }

    const dataToSend = {
      txnId:txnId,
      abhaAddress:custom.trim()
    }

    const response = await createCustomAbhaId(dataToSend);
    
    if(!response || !response.success){
      toast.error(error || "Failed to create abha id");
      return;
    }

    try{

      const parsed = JSON.parse(response.data);

      if(parsed.success){
        toast.success(parsed.message);
      }
      else{
        toast.error(parsed.message || "Failed to create abha address");
      }

    }
    catch(err:any){
      console.error("Error ",err);
    }

  }

  const searchAbhaAddress = async () => {

  }

  return (
    <div className="space-y-5">

      {/* Title */}
      <h2 className="text-sm font-medium text-gray-700">
        Choose your ABHA Address
      </h2>

      {/* Suggestions */}
      <div className="max-h-[180px] overflow-y-auto rounded-lg divide-y">
        {["rahul@abdm", "rahul123@abdm", "rahul.kumar@abdm","rahul@abdm", "rahul123@abdm", "rahul.kumar@abdm"].map((item, i) => (
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
                setCustom(item);
                //setCustom(""); 
              }}
              className="accent-blue-600"
            />
            <span className="text-sm">{item}</span>
          </label>
        ))}
      </div>

      {/* OR Divider */}
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
              setCustom(e.target.value);
              setSelectedAddress(""); // unselect radio
            }}
            placeholder="Enter username"
            className="w-full border rounded-l-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-600">
            @abdm
          </span>
        </div>

        {/* Example availability (static for now) */}
        {custom && (
            <span className="flex items-center gap-1 text-green-600 text-xs">
                <SearchCheck size={14} /> Available
            </span>
        )}
      </div>

      {/* Action Button */}
      <button
        disabled={!selectedAddress && !custom} onClick={createAbhaId}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
      >
        Create ABHA Address
      </button>

    </div>
  );
};

export default AbhaSection;