import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUnit } from "../context/UnitContext";
import { LogOut, User } from "lucide-react";

const Header = () => {

  const { units,selectedUnit } = useUnit();
  const navigate = useNavigate();
  const {logout,user} = useAuth();
  const selectedUnitObject = units.find(u => u.id === selectedUnit);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const handleUnitChange = () => {
    navigate("/unitsubscription");
  };

  return (
    <header className="w-full min-h-[64px] bg-white flex items-center justify-between px-3 sm:px-4 md:px-8 py-2 shadow-md">

      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Unit Selector */}
        {
          selectedUnitObject?.name && (
            <button
              onClick={handleUnitChange}
              className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 rounded-md transition max-w-[140px] sm:max-w-none truncate"
            >
              <span className="font-medium truncate">
                {selectedUnitObject?.name || "Select Unit"}
              </span>

              <span className="text-[10px] sm:text-xs">▼</span>
            </button>
          )
        }
        

        {/* Logo */}
        <div className="flex items-center gap-1 sm:gap-2">

          <span className="bg-green-100 text-green-800 font-semibold px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm md:text-base">
            ABDM
          </span>

          <span className="hidden md:block text-gray-600 text-sm md:text-base font-medium">
            Ayushman Bharat Digital Mission
          </span>

        </div>

      </div>

      {/* Logout */}
      <div className="flex items-center gap-3">

        {/* User Info */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
          <User size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-800">
            {user}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded-md hover:bg-red-100 text-red-600 transition cursor-pointer"
          title="Logout"
        >
          <LogOut size={18} />
        </button>

      </div>


      

    </header>
  );
};

export default Header;