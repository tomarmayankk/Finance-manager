import Expense from "../models/expense.model.js";

export const predictNextMonth = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ user: userId });

    if (!expenses.length) {
      return res.json({
        predictedSpend: 0,
        message: "Add more expenses to generate predictions"
      });
    }

    // group expenses by month
    const monthlyData = {};

    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData[key]) {
        monthlyData[key] = 0;
      }

      monthlyData[key] += exp.amount;
    });

    const months = Object.keys(monthlyData).sort();

    const values = months.map(m => monthlyData[m]);

    const lastMonth = values[values.length - 1] || 0;

    const average =
      values.reduce((a, b) => a + b, 0) / values.length;

    // simple trend detection
    let trend = "stable";

    if (values.length >= 2) {
      const prev = values[values.length - 2];

      if (lastMonth > prev) trend = "increasing";
      if (lastMonth < prev) trend = "decreasing";
    }

    // simple prediction model
    let predictedSpend = average;

    if (trend === "increasing") {
      predictedSpend = lastMonth * 1.08;
    }

    if (trend === "decreasing") {
      predictedSpend = lastMonth * 0.95;
    }

    let message = "Your spending is stable.";

    if (trend === "increasing") {
      message = "Your spending may increase next month.";
    }

    if (trend === "decreasing") {
      message = "Your spending may decrease next month.";
    }

    res.json({
      predictedSpend: Math.round(predictedSpend),
      trend,
      lastMonth: Math.round(lastMonth),
      averageMonthlySpend: Math.round(average),
      message
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};