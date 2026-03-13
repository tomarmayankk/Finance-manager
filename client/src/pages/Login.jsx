import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
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

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Welcome Back to <span className="text-green-500">Finsight</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Track your expenses, plan investments, and take control of your financial future.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p>✔ Expense tracking</p>
            <p>✔ Smart investment calculators</p>
            <p>✔ Financial insights</p>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Login to your account
            </h2>

            <form onSubmit={handleSubmit}>
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
                disabled={isLoggingIn}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-600 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;