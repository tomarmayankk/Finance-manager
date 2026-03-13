import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AddExpense from "./pages/AddExpense";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/Profile";
import CalculatorPage from "./pages/CalculatorPage";
import Crypto from "./pages/Crypto";
import Stocks from "./pages/Stocks";
import ShareMarket from "./pages/ShareMarket";

// 🔹 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" />;
};

// 🔹 Public Route Wrapper
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/dashboard" />;
};

// 🔹 Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-lg font-semibold">Checking Authentication...</p>
  </div>
);

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return <Loader />;

  return (
    <>
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/share-market" element={<ShareMarket />} />
        <Route path="/calculators/:type" element={<CalculatorPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;