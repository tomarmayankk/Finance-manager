import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useExpenseStore from "../store/expenseStrore.js";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full mb-4 p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="w-full mb-4 p-2 border rounded"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Food, Rent, etc.)"
            className="w-full mb-4 p-2 border rounded"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="w-full mb-6 p-2 border rounded"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;