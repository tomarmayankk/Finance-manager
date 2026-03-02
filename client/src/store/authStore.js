import { create } from "zustand";
import toast from "react-hot-toast";
import  axiosInstance  from "../api/axios";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("authUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const useAuthStore = create((set) => ({
  authUser: getStoredUser(),
  isLoggingIn: false,
  isRegistering: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axiosInstance.get("/auth/check");
      const user = res.data;

      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async ({ name, email, age, phone, password }) => {
    set({ isRegistering: true });

    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        age,
        phone,
        password,
      });

      const user = res.data.user; // ✅ correct extraction

      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));

      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async ({ email, password }) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user; // ✅ correct extraction

      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      localStorage.removeItem("authUser");

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },
}));

export default useAuthStore;