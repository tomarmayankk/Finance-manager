import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ExpenseCalendar = ({ expenses }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.toDateString() ===
        selectedDate.toDateString()
      );
    });
  }, [selectedDate, expenses]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Expense Calendar
      </h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <div className="mt-4">
        <h3 className="font-semibold">
          Expenses on {selectedDate.toDateString()}
        </h3>

        {selectedDateExpenses.length === 0 ? (
          <p className="text-gray-500">
            No expenses on this date.
          </p>
        ) : (
          selectedDateExpenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between border p-3 rounded mt-2"
            >
              <span>{expense.title}</span>
              <span>₹{expense.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseCalendar;