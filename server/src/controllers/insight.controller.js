import Expense from "../models/expense.model.js";

export const getInsights = async (req, res) => {
  try {

    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId }).lean();

    if (!expenses.length) {
      return res.json({
        insight: "Add some expenses to generate insights."
      });
    }

    const now = new Date();

    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    const categoryMap = {};

    expenses.forEach(exp => {

      const date = new Date(exp.date);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (month === thisMonth && year === thisYear) {
        thisMonthTotal += exp.amount;

        if (!categoryMap[exp.category]) {
          categoryMap[exp.category] = 0;
        }

        categoryMap[exp.category] += exp.amount;
      }

      if (month === lastMonth && year === lastMonthYear) {
        lastMonthTotal += exp.amount;
      }

    });

    // find top category
    let topCategory = null;
    let topValue = 0;

    for (const cat in categoryMap) {
      if (categoryMap[cat] > topValue) {
        topValue = categoryMap[cat];
        topCategory = cat;
      }
    }

    const topCategoryPercent = thisMonthTotal
      ? ((topValue / thisMonthTotal) * 100).toFixed(1)
      : 0;

    const change = lastMonthTotal
      ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1)
      : 0;

    let insight = "Your spending looks stable.";

    if (topCategory) {
      insight = `You spent ${topCategoryPercent}% of your money on ${topCategory}.`;
    }

    if (change > 0) {
      insight += ` Your spending increased by ${change}% compared to last month.`;
    } else if (change < 0) {
      insight += ` Your spending decreased by ${Math.abs(change)}% compared to last month.`;
    }

    res.json({
      thisMonth: thisMonthTotal,
      lastMonth: lastMonthTotal,
      change,
      topCategory,
      topCategoryPercent,
      insight
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const generateInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });

    if (!expenses.length) {
      return res.json({
        insights: ["Add more expenses to generate insights."]
      });
    }

    const insights = [];

    // TOTAL SPEND
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // CATEGORY ANALYSIS
    const categoryTotals = {};

    expenses.forEach((exp) => {
      if (!categoryTotals[exp.category]) {
        categoryTotals[exp.category] = 0;
      }
      categoryTotals[exp.category] += exp.amount;
    });

    // biggest category
    const biggestCategory = Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b
    );

    insights.push(
      `Your biggest spending category is ${biggestCategory} (₹${categoryTotals[biggestCategory]}).`
    );

    // detect overspending
    const avgSpend = total / expenses.length;

    const highExpenses = expenses.filter(
      (exp) => exp.amount > avgSpend * 1.5
    );

    if (highExpenses.length) {
      insights.push(
        `You had ${highExpenses.length} unusually high expenses recently.`
      );
    }

    // suggested monthly budget
    const suggestedBudget = Math.round(total * 0.9);

    insights.push(
      `Suggested monthly budget: ₹${suggestedBudget}`
    );

    res.json({
      insights
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};