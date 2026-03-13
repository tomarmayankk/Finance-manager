import { useEffect } from "react";
import useInsightStore from "../../../store/insightStore";

const SpendingInsights = () => {
  const { spendingInsights, fetchInsights, loading } =
    useInsightStore();

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="pt-6">

      <h2 className="text-lg font-medium text-gray-800 mb-3">
        AI Spending Insights
      </h2>

      {loading && (
        <p className="text-gray-500 text-sm">
          Analyzing your spending...
        </p>
      )}

      {spendingInsights && (
        <>
          <p className="text-gray-700 text-sm mb-3">
            {spendingInsights.insight}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>This Month: ₹ {spendingInsights.thisMonth}</p>
            <p>Last Month: ₹ {spendingInsights.lastMonth}</p>
            <p>Top Category: {spendingInsights.topCategory}</p>
          </div>
        </>
      )}

    </div>
  );
};

export default SpendingInsights;