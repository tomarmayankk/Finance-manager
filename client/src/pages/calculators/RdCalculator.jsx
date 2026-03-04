import { useState } from "react";

const RdCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateRD = () => {
    const P = Number(monthlyDeposit);
    const r = Number(rate) / 400; // quarterly
    const n = Number(years) * 4;

    if (!P || !r || !n) return;

    const maturity =
      P * n +
      (P * n * (n + 1) * r) / 2;

    const invested = P * n;
    const interest = maturity - invested;

    setResult({
      maturity: maturity.toFixed(2),
      interest: interest.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">RD Calculator</h2>

        <input type="number" placeholder="Monthly Deposit (₹)"
          className="w-full p-2 border rounded mb-4"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(e.target.value)} />

        <input type="number" placeholder="Annual Interest Rate (%)"
          className="w-full p-2 border rounded mb-4"
          value={rate}
          onChange={(e) => setRate(e.target.value)} />

        <input type="number" placeholder="Time (Years)"
          className="w-full p-2 border rounded mb-4"
          value={years}
          onChange={(e) => setYears(e.target.value)} />

        <button onClick={calculateRD}
          className="w-full bg-blue-600 text-white p-2 rounded-lg">
          Calculate
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p><strong>Total Interest:</strong> ₹ {result.interest}</p>
            <p><strong>Maturity Amount:</strong> ₹ {result.maturity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RdCalculator;