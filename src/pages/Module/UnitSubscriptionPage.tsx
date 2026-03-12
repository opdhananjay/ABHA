import { useNavigate } from "react-router-dom";
import { useUnit } from "../../context/UnitContext";
import { useState } from "react";

const UnitSubscriptionPage = () => {

    const {units,selectedUnit,setSelectedUnit} = useUnit();
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleCountinue = () => {
        
        if(!selectedUnit){
            setError("Please Select Unit");
            return;
        }

        setError("");
        navigate('/module');
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">

                    <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                         Select Unit
                    </h2>

                    <div className="flex flex-col gap-4">

                    <div className="relative">

                        <select value={selectedUnit || ""} onChange={(e)=>{
                            setSelectedUnit(e.target.value)
                        }}
                            className="w-full border rounded-md px-4 py-3 pr-10
                                    appearance-none bg-white
                                    focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select Unit</option>

                            {units.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                            ))}

                        </select>

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>

                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button onClick={handleCountinue}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition"
                    >
                        Continue
                    </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default UnitSubscriptionPage;