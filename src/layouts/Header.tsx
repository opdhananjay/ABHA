import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shadow-md rounded">

      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-md text-sm md:text-base">
          ABDM
        </span>

        <span className="hidden sm:block text-gray-600 text-sm md:text-base font-medium">
          Ayushman Bharat Digital Mission
        </span>
      </div>

      {/* Logout */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-medium py-1.5 px-4 rounded-md transition duration-200" onClick={handleLogout}
      >
        Logout
      </button>

    </header>
  );
};

export default Header;