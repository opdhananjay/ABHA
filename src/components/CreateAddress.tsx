import type { ICreateAddressProps } from "../types/general.types";

const CreateAddress = ({ suggestedAddresses, selectedAddress, onSelectAddress, customAddress, onCustomAddressChange, onSubmit, loading }:ICreateAddressProps) => {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-6">

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        Suggested Addresses
      </h2>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col gap-3">
        
        {["abhauser1@gmail.com", "abhauser2@gmail.com", "abhauser3@gmail.com"].map((email, index) => (
          <label
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition"
          >
            <input type="radio" name="address"
                className="accent-blue-600"
                value={email}
                checked={selectedAddress === email}
                onChange={()=> onSelectAddress(email)}
             />
            <span className="text-gray-700">{email}</span>
          </label>
        ))}

      </div>

      {/* Input + Button */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter new address"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customAddress}
          onChange={(e)=>onCustomAddressChange(e.target.value)}
        />
        <button onClick={onSubmit} disabled={loading} className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          {loading ? "Creating..." : "Create ABHA Address"}
        </button>
      </div>

    </div>
  );
};

export default CreateAddress;