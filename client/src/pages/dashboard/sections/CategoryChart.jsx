import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryChart = ({ expenses }) => {

  const data = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });

    return Object.keys(map).map((k) => ({
      name: k,
      value: map[k],
    }));
  }, [expenses]);

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  if (!data.length) return null;

  return (
    <div className="pt-6">

      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Category Distribution
      </h2>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CategoryChart;