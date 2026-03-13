import { useEffect } from "react";
import useInsightStore from "../../../store/insightStore";

const AIInsights = () => {
  const { aiInsights, fetchAIInsights, loading } =
    useInsightStore();

  useEffect(() => {
    fetchAIInsights();
  }, []);

  return (
    <div className="pt-6">

      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Insights
      </h2>

      {loading && (
        <p className="text-gray-500 text-sm">
          Loading Smart insights...
        </p>
      )}

      {!loading && aiInsights && (
        <ul className="space-y-2 text-sm text-gray-700">
          {aiInsights.map((i, index) => (
            <li key={index}>• {i}</li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default AIInsights;