import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useExpenseStore from "../store/expenseStore";
import Navbar from "../components/Navbar";

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStore();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExpense({
        ...formData,
        amount: Number(formData.amount),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-24 px-6">

        {/* Form Box */}
        <div className="border border-gray-200 rounded-lg p-8 w-full max-w-md">

          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Add Expense
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category (Food, Rent, etc.)"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full border border-green-500 text-green-600 py-2 rounded-md hover:bg-green-50 transition"
            >
              Add Expense
            </button>

          </form>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-sm text-gray-500 text-center">
        <p>
          Built by Mayank Tomar • Personal Finance Tracker
        </p>
      </footer>

    </div>
  );
};

export default AddExpense;