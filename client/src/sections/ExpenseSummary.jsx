import { useMemo } from "react";

const ExpenseSummary = ({ expenses }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  }, [expenses]);

  const totalExpense = useMemo(() => {
    return currentMonthExpenses.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
  }, [currentMonthExpenses]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold">
        This Month's Expense: ₹{totalExpense}
      </h2>
    </div>
  );
};

export default ExpenseSummary;