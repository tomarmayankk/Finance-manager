import { create } from "zustand";
import axiosInstance from "../api/axios";

const useInsightStore = create((set) => ({
  spendingInsights: null,
  aiInsights: [],
  loading: false,
  error: null,

  // Spending insights
  fetchInsights: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get("/insights/spending-insights");

      set({
        spendingInsights: res.data,
        loading: false
      });

    } catch (error) {
      console.error("Error fetching insights:", error);

      set({
        error: "Failed to fetch insights",
        loading: false
      });
    }
  },

  // AI generated insights
  fetchAIInsights: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get("/insights/ai-insights");

      set({
        aiInsights: res.data.insights || [],
        loading: false
      });

    } catch (error) {
      console.error("AI Insight error:", error);

      set({
        error: "Failed to load AI insights",
        loading: false
      });
    }
  }
}));

export default useInsightStore;