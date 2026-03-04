import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CalculatorGrid from "../../components/CalculatorGrid";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, years]);

  const calculateEMI = () => {
    if (!principal || !rate || !years) return;

    const P = principal;
    const r = rate / 12 / 100;
    const n = years * 12;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi,
      totalPayment,
      totalInterest,
    });
  };

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: result
          ? [principal, result.totalInterest]
          : [0, 0],
        backgroundColor: ["#2563eb", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(num));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">

        {/* LEFT SIDE — EMI CALCULATOR */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
          
          {/* INPUTS */}
          <div>
            <h2 className="text-3xl font-bold mb-10">EMI Calculator</h2>

            {/* Loan Amount */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium">Loan Amount</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-40 p-2 border rounded-lg text-right"
                />
              </div>

              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Interest Rate */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-40 p-2 border rounded-lg text-right"
                />
              </div>

              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Loan Tenure */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium">Loan Tenure (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-40 p-2 border rounded-lg text-right"
                />
              </div>

              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* RESULTS */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {result && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Monthly EMI
                </h3>

                <p className="text-4xl font-bold text-blue-600 mb-8">
                  ₹ {formatNumber(result.emi)}
                </p>

                <div className="space-y-3 mb-10">
                  <div className="flex justify-between">
                    <span>Total Payment</span>
                    <span>₹ {formatNumber(result.totalPayment)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span>₹ {formatNumber(result.totalInterest)}</span>
                  </div>
                </div>

                <Pie data={chartData} />
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — EXPLORE OTHER CALCULATORS */}
        <div>
          <CalculatorGrid />
        </div>

      </div>
    </div>
  );
};

export default EmiCalculator;