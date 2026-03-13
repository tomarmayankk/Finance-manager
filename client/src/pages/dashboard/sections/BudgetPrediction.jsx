import { useEffect } from "react";
import usePredictionStore from "../../../store/predictionStore";

const BudgetPrediction = () => {
  const { prediction, fetchPrediction, loadingPrediction } =
    usePredictionStore();

  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div className="pt-6">

      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Your Predicted Budget
      </h2>

      {loadingPrediction && (
        <p className="text-gray-500 text-sm">
          Calculating prediction...
        </p>
      )}

      {prediction && (
        <>
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            ₹ {prediction.predictedSpend}
          </p>

          <p className="text-gray-600 text-sm mb-2">
            {prediction.message}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>Last Month: ₹ {prediction.lastMonth}</p>
            <p>Average: ₹ {prediction.averageMonthlySpend}</p>
            <p>Trend: {prediction.trend}</p>
          </div>
        </>
      )}

    </div>
  );
};

export default BudgetPrediction;