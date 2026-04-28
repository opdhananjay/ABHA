import { User } from "lucide-react";

const UserInfoSection = () => {
    
    return (
       <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-4"> 
            {/* User Welcome */}
            <div className="flex items-center text-gray-700 font-medium">
                
                <User size={18} className="text-gray-500" />

                <span>
                    Welcome <span className="font-semibold text-gray-900">Dhananjay</span>
                </span>

            </div>

            {/* Session ID */}
            <div className="mt-2 text-sm text-gray-500">
                Session : <span className="font-medium text-gray-700">GUID-xxx</span>
            </div>

       </div>   
    )
    
}

export default UserInfoSection;  // THIS COMPONENT IS NOT USED 