import { useParams } from "react-router-dom";
import { useState } from "react";
import { calculators } from "../pages/calculators/calculatorConfigs";
import InputSlider from "../components/InputSlider";
import CalculatorLayout from "../components/CalculatorLayout";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const CalculatorPage = () => {
  const { type } = useParams();
  const config = calculators[type];

  if (!config) return <div>Calculator not found</div>;

  // Build initial values from config
  const initialState = {};
  config.inputs.forEach((i) => {
    initialState[i.key] = i.default;
  });

  const [values, setValues] = useState(initialState);

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  const handleChange = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  // Correct parameter order
  const result = config.formula(
    ...config.inputs.map((input) => values[input.key])
  );

  // FIXED chart data (only invested vs interest)
  const chartData = [
    {
      name: config.labels?.invested || "Invested",
      value: result.invested || 0,
    },
    {
      name: config.labels?.interest || "Interest",
      value: result.interest || 0,
    },
  ];

  // Inputs UI
  const inputs = config.inputs.map((input) => (
    <InputSlider
      key={input.key}
      label={input.label}
      value={values[input.key]}
      min={input.min}
      max={input.max}
      setValue={(val) => handleChange(input.key, val)}
    />
  ));

  const resultBox = (
    <div className="p-6">

      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">
        {config.resultTitle || "Result"}
      </h3>

      {/* Main Result */}
      <p className="text-4xl font-bold text-green-500 mb-6">
        ₹ {Math.round(result.main).toLocaleString()}
      </p>

      {/* Chart */}
      <div className="flex justify-center mb-6">
        <PieChart width={260} height={260}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={85}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Breakdown */}
      <div className="border-t pt-4 mt-4">
        {Object.entries(result).map(([key, value]) => {
          if (key === "main") return null;

          return (
            <div
              key={key}
              className="flex justify-between py-2 text-sm"
            >
              <span className="text-gray-600">
                {config.labels?.[key] || key}
              </span>

              <span className="font-semibold">
                ₹ {Math.round(value).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );

  return (
    <div className="min-h-screen">
      <CalculatorLayout
        title={config.title}
        inputs={inputs}
        resultBox={resultBox}
      />
    </div>
  );
};
export default CalculatorPage;