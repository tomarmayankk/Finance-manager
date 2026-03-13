import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { register, isRegistering } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(formData);
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Start Your Journey with{" "}
            <span className="text-green-500">Finsight</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Create an account to start tracking expenses, planning investments,
            and managing your finances smarter.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p>✔ Expense tracking dashboard</p>
            <p>✔ Smart financial calculators</p>
            <p>✔ Personal finance insights</p>
          </div>
        </div>

        {/* RIGHT SIDE REGISTER CARD */}
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full mb-4 p-3 border rounded-lg"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full mb-4 p-3 border rounded-lg"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                className="w-full mb-4 p-3 border rounded-lg"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-6 p-3 border rounded-lg"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {isRegistering ? "Creating Account..." : "Register"}
              </button>

            </form>

            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-medium">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;