import { create } from "zustand";
import axiosInstance from "../api/axios";

const useExpenseStore = create((set) => ({
  expenses: [],
  isLoading: false,

  // Fetch all expenses
  fetchExpenses: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/expenses");

      set({
        expenses: res.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  // Add expense
  addExpense: async (data) => {
    try {
      const res = await axiosInstance.post("/expenses", data);

      set((state) => ({
        expenses: [res.data, ...state.expenses],
      }));

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);

      set((state) => ({
        expenses: state.expenses.filter(
          (expense) => expense._id !== id
        ),
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

export default useExpenseStore;