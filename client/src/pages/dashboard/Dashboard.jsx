import { useEffect, useState } from "react";
import useExpenseStore from "../../store/expenseStore";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

import ExpenseSummary from "./sections/ExpenseSummary";
import SpendingInsights from "./sections/SpendingInsights";
import BudgetPrediction from "./sections/BudgetPrediction";
import AIInsights from "./sections/AIInsights";
import CategoryChart from "./sections/CategoryChart";
import { CircleArrowRight } from "lucide-react";

const Dashboard = () => {
  const { expenses, fetchExpenses, deleteExpense } = useExpenseStore();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchExpenses();
  }, []);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const filteredExpenses = expenses.filter((expense) => {
    const d = new Date(expense.date);

    return (
      d.getMonth() === currentMonth.getMonth() &&
      d.getFullYear() === currentMonth.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-6 flex-grow">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>

          <Link
            to="/add-expense"
            className="border bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Expense
          </Link>
        </div>

        {/* Summary */}
        <div className="border border-gray-300 rounded-lg p-6">
          <ExpenseSummary expenses={expenses} />
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="border border-gray-300 rounded-lg p-5">
            <SpendingInsights />
          </div>

          <div className="border border-gray-300 rounded-lg p-5">
            <BudgetPrediction />
          </div>

          <div className="border border-gray-300 rounded-lg p-5">
            <AIInsights />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10 border border-gray-300 rounded-lg p-6">
          <CategoryChart expenses={expenses} />
        </div>

        {/* Expenses Table */}
        <div className="mt-10">

          {/* Month switch */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="text-gray-500 hover:text-gray-800"
            >
              <CircleArrowRight className="rotate-180" />
            </button>

            <h2 className="text-lg font-medium text-gray-800">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={nextMonth}
              className="text-gray-500 hover:text-gray-800"
            >
              <CircleArrowRight />
            </button>
          </div>

          {/* Table Box */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-4 py-3 px-4 text-sm text-gray-500 border-b border-gray-300 bg-gray-50">
              <p>Title</p>
              <p>Category</p>
              <p>Amount</p>
              <p></p>
            </div>

            {/* Table Content */}
            {filteredExpenses.length === 0 ? (
              <p className="py-6 px-4 text-gray-500">
                No expenses this month.
              </p>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="grid grid-cols-4 py-3 px-4 border-b border-gray-300  items-center hover:bg-gray-50"
                >
                  <p>{expense.title}</p>

                  <p className="text-gray-500">
                    {expense.category}
                  </p>

                  <p className="text-red-500 font-medium">
                    ₹{expense.amount}
                  </p>

                  <button
                    onClick={() => deleteExpense(expense._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 mt-10">

      <div className="max-w-7xl mx-auto px-10 lg:px-40 flex justify-between">

        <div>
          <h3 className="text-white font-semibold text-lg">
            Finsight
          </h3>
          <p className="mt-2 text-sm">
            Smart tools to manage your finances.
          </p>
        </div>

        <p className="text-sm">
          © 2026 Finsight
        </p>

      </div>

    </footer>
    </div>
  );
};

export default Dashboard;