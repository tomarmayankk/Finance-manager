import { useEffect } from "react";
import useExpenseStore from "../store/expenseStrore.js";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import ExpenseSummary from "../sections/ExpenseSummary";
import CategoryChart from "../sections/CategoryChart";
import ExpenseCalendar from "../sections/ExpenseCalendar";

const Dashboard = () => {
  const { expenses, fetchExpenses, deleteExpense } =
    useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <Link
            to="/add-expense"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Expense
          </Link>
        </div>

        {/* Sections */}
        <ExpenseSummary expenses={expenses} />
        <CategoryChart expenses={expenses} />
        <ExpenseCalendar expenses={expenses} />

        {/* Expense List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Recent Expenses
          </h2>

          {expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex justify-between items-center border p-4 rounded"
                >
                  <div>
                    <p className="font-semibold">
                      {expense.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.category} • ₹
                      {expense.amount}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteExpense(expense._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;