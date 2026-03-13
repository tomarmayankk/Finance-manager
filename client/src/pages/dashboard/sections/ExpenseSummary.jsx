import { useMemo } from "react";

const ExpenseSummary = ({ expenses }) => {
  const now = new Date();

  const total = useMemo(() => {
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((a, b) => a + b.amount, 0);
  }, [expenses]);

  return (
    <div className="py-6 flex justify-between">
      <p className="text-gray-600">
        Total Expenses (This Month)
      </p>

      <p className="text-2xl font-semibold text-gray-800">
        ₹ {total.toLocaleString()}
      </p>
    </div>
  );
};

export default ExpenseSummary;