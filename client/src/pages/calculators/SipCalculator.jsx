import { useState } from "react";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [years, setYears] = useState("");

  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const P = Number(monthlyInvestment);
    const r = Number(annualRate) / 12 / 100;
    const n = Number(years) * 12;

    if (!P || !r || !n) return;

    const totalValue =
      P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const investedAmount = P * n;
    const estimatedReturns = totalValue - investedAmount;

    setResult({
      totalValue: totalValue.toFixed(2),
      investedAmount: investedAmount.toFixed(2),
      estimatedReturns: estimatedReturns.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          SIP Calculator
        </h2>

        <input
          type="number"
          placeholder="Monthly Investment (₹)"
          className="w-full p-2 border rounded mb-4"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Expected Annual Return (%)"
          className="w-full p-2 border rounded mb-4"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Time Period (Years)"
          className="w-full p-2 border rounded mb-4"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />

        <button
          onClick={calculateSIP}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Invested Amount:</strong> ₹ {result.investedAmount}
            </p>
            <p className="mb-2">
              <strong>Estimated Returns:</strong> ₹ {result.estimatedReturns}
            </p>
            <p>
              <strong>Total Value:</strong> ₹ {result.totalValue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SipCalculator;