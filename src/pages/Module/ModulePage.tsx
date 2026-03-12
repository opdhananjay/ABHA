import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ModulePage = () => {

    const navigate = useNavigate();

    const [selectedModule,setSelectedModule] = useState<string | null>(null);

    const handleRedirection = (moduleName:string) => {
        if(moduleName === "registration"){
            navigate('/registration');
        }
        else if(moduleName === "getdetails"){
            navigate('/getdetails');
        }
    }

    return (

        <div className="bg-gray-100 flex flex-col md:flex-row gap-4 items-center justify-center min-h-screen w-full">
            
        {
            !selectedModule && (
                <>
                      {/* Registration */}
                        <div
                            className="flex flex-col items-center justify-center border w-48 h-32 rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg hover:border-green-700 hover:scale-105 transition"
                            onClick={() => setSelectedModule("Registration")}
                        >

                            <span className="text-4xl mb-2">📝</span>

                            <h2 className="font-semibold text-green-700">
                             Registration
                            </h2>

                        </div>

                        {/* M2 */}
                        <div
                            className="flex flex-col items-center justify-center border w-48 h-32 rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg hover:border-blue-700 hover:scale-105 transition"
                            onClick={() => setSelectedModule("M2")}
                        >

                            <span className="text-4xl mb-2">📊</span>

                            <h2 className="font-semibold text-blue-700">
                            Sharing Data
                            </h2>

                        </div>

                        {/* M3 */}
                        <div
                            className="flex flex-col items-center justify-center border w-48 h-32 rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg hover:border-gray-700 hover:scale-105 transition"
                            onClick={() => setSelectedModule("M3")}
                        >

                            <span className="text-4xl mb-2">⚙️</span>

                            <h2 className="font-semibold text-gray-700">
                            Retriving Data
                            </h2>

                        </div>

                </>
            )
        }

        {
            selectedModule === "Registration" && (
                <div className="flex flex-col items-center gap-6 w-full px-4">

                <h2 className="text-xl font-semibold text-gray-700 text-center">
                    Registration Module
                </h2>

                <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center justify-center">

                    {/* Register */}
                    <div className="flex flex-col items-center justify-center border w-full max-w-xs md:w-48 h-32 rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg hover:border-blue-600 transition" onClick={()=>{
                        handleRedirection('registration');
                    }}>

                        <span className="text-3xl mb-2">📝</span>

                        <p className="font-medium text-gray-700">
                            New
                        </p>

                    </div>

                    {/* Verify */}
                    <div className="flex flex-col items-center justify-center border w-full max-w-xs md:w-48 h-32 rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg hover:border-green-600 transition" onClick={()=>{
                        handleRedirection("getdetails");
                    }}>

                        <span className="text-3xl mb-2">✔️</span>

                        <p className="font-medium text-gray-700">
                            Get Details
                        </p>

                    </div>

                </div>

                <button
                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setSelectedModule(null)}
                >
                    Back
                </button>

                </div>
            )
        }

        {
            selectedModule === "M2" && (
                <div className="flex flex-col items-center gap-6 w-full px-4">

                <h2 className="text-xl font-semibold text-gray-700 text-center">
                    M2 Module
                </h2>

                <button
                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setSelectedModule(null)}
                >
                    Back
                </button>

                </div>
            )
        }

        {
            selectedModule === "M3" && (
                <div className="flex flex-col items-center gap-6 w-full px-4">

                <h2 className="text-xl font-semibold text-gray-700 text-center">
                    M3 Module
                </h2>

                <button
                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setSelectedModule(null)}
                >
                    Back
                </button>

                </div>
            )
        }

        </div>
    );

};

export default ModulePage;