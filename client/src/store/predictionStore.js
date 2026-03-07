import { create } from "zustand";
import axiosInstance from "../api/axios"; // your axios instance

const usePredictionStore = create((set) => ({
  prediction: null,
  loadingPrediction: false,

  fetchPrediction: async () => {
    try {
      set({ loadingPrediction: true });
      const res = await axiosInstance.get("predictions/budget-prediction");
      set({
        prediction: res.data,
        loadingPrediction: false
      });

    } catch (error) {
      console.error("Prediction error:", error);
      set({ loadingPrediction: false });
    }
  }
}));

export default usePredictionStore;