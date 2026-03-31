const AadharDetails = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
        <label className="md:w-40 text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          className="flex-1 border border-gray-300 rounded-md px-3 py-2
                            focus:ring-2 focus:ring-green-500 outline-none max-h-32 min-h-12"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            District
          </label>

          <input
            placeholder="District"
            type="text"
            className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            State
          </label>

          <input
            placeholder="State"
            type="text"
            className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Pincode
          </label>

          <input
            placeholder="Pincode"
            type="text"
            className="flex-1 border rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AadharDetails;
