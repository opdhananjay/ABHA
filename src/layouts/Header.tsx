import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUnit } from "../context/UnitContext";
import { LogOut } from "lucide-react";

const Header = () => {

  const { units,selectedUnit } = useUnit();
  const navigate = useNavigate();
  const {logout} = useAuth();
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
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm md:text-base font-medium py-1 px-3 sm:px-4 rounded-md transition cursor-pointer"
      >
        Logout
        <LogOut size={16} />
      </button>

    </header>
  );
};

export default Header;