import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import CalculatorsDropdown from "./CalculatorsDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 px-44 py-4 flex justify-between items-center z-50">
      
      {/* Left Side: Logo + Navigation */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Finsight
        </Link>

        {/* Stocks & Crypto Links */}
        <Link
          to="/stocks"
          className="text-gray-600 hover:text-blue-600"
        >
          Stocks
        </Link>
        <Link
          to="/crypto"
          className="text-gray-600 hover:text-blue-600"
        >
          Crypto
        </Link>
      </div>

      {/* Right Side: Calculators & Auth */}
      <div className="flex items-center gap-6">
        {/* Calculators Dropdown */}
        <CalculatorsDropdown />

        {authUser ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Login/SignUp
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;