import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Landing from "./pages/Landing";

// 🔥 Calculator Imports
import SipCalculator from "./pages/calculators/SipCalculator";
import EmiCalculator from "./pages/calculators/EmiCalculator";
import FdCalculator from "./pages/calculators/FdCalculator";
import RdCalculator from "./pages/calculators/RdCalculator";
import LumpSumCalculator from "./pages/calculators/LumpSumCalculator";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">
          Checking Authentication...
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <Routes>
        {/* ✅ Landing ALWAYS accessible */}
        <Route path="/" element={<Landing />} />

        {/* 🔥 PUBLIC CALCULATOR ROUTES */}
        <Route path="/calculators/sip" element={<SipCalculator />} />
        <Route path="/calculators/emi" element={<EmiCalculator />} />
        <Route path="/calculators/fd" element={<FdCalculator />} />
        <Route path="/calculators/rd" element={<RdCalculator />} />
        <Route path="/calculators/lumpsum" element={<LumpSumCalculator />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-expense"
          element={authUser ? <AddExpense /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;