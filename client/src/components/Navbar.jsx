import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // clears backend cookie if implemented
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        FinanceTracker
      </Link>

      <div className="flex items-center gap-6">
        
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
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;