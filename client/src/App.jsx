import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing"; // Import Landing Page

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Checking Authentication...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <Routes>
        {/* Default Landing Route */}
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to="/dashboard" />}
        />
        {/* Auth Routes */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
export default App;