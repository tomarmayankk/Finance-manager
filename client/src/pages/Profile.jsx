import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { authUser, logout } = useAuthStore();

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Navbar />

      <div className="pt-24 max-w-3xl mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          My Profile
        </h1>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          {/* Name */}
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-800 font-medium">{authUser.name}</span>
          </div>

          {/* Email */}
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-800 font-medium">{authUser.email}</span>
          </div>

          {/* Age */}
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500">Age</span>
            <span className="text-gray-800 font-medium">{authUser.age || "-"}</span>
          </div>

          {/* Phone */}
          <div className="flex justify-between pb-3">
            <span className="text-gray-500">Phone</span>
            <span className="text-gray-800 font-medium">{authUser.phone || "-"}</span>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;