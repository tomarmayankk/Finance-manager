import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState({ USD: 1, EUR: 0.93, INR: 83 });

  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "NFLX"];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=8070fd2b32b24bf29f51df236acd4f42`
            );
            const data = await res.json();

            const base = parseFloat(data.close) || 0;
            const chart = Array.from({ length: 5 }, (_, i) =>
              base + (Math.random() - 0.5) * (base * 0.02)
            );
            const isUp = parseFloat(data.change) >= 0;

            return { ...data, chart, isUp };
          })
        );

        setStocks(results);
        setFilteredStocks(results);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.log("Failed to fetch rates, using fallback.");
      }
    };

    fetchStocks();
    fetchRates();
  }, []);

  // Safe search filter
  useEffect(() => {
    const filtered = stocks.filter(
      (stock) => stock.symbol && stock.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [search, stocks]);

  if (loading) return <p className="p-6">Loading stocks...</p>;

  const convert = (value) => {
    if (currency === "USD") return value * amount;
    if (currency === "EUR") return value * amount * (rates.EUR || 0.93);
    if (currency === "INR") return value * amount * (rates.INR || 83);
    return value;
  };

  return (
    <div className="min-h-screen p-6 px-44">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 pt-20 from-neutral-900">Stock Market</h1>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex border rounded-xl overflow-hidden w-full md:w-80">
          <input
            type="text"
            placeholder="Search symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 items-center border rounded-xl p-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-1 rounded-xl w-24 focus:outline-none"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border p-1 rounded-xl focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <span className="font-semibold">{convert(1).toFixed(2)} {currency}</span>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="rounded-xl overflow-hidden border border-gray-300">
        <div className="grid grid-cols-6 p-2 px-4 font-semibold text-gray-600 bg-gray-200 border-b border-gray-300">
          <span>Symbol</span>
          <span>Price</span>
          <span>Change</span>
          <span>%</span>
          <span>Converted</span>
          <span>Chart</span>
        </div>

        {filteredStocks.map((stock, index) => {
          const chartData = {
            labels: ["1","2","3","4","5"],
            datasets: [
              {
                data: stock.chart,
                borderColor: stock.isUp ? "#16a34a" : "#dc2626",
                backgroundColor: "transparent",
                borderWidth: 2,
                tension: 0,
                pointRadius: 0
              }
            ]
          };

          return (
            <div
              key={index}
              className="grid grid-cols-6 p-4 border-b border-gray-300 items-center hover:bg-gray-50 transition"
            >
              <span className="font-medium">{stock.symbol || "-"}</span>
              <span>${Number(stock.close || 0).toFixed(2)}</span>
              <span className={parseFloat(stock.change) >= 0 ? "text-green-600" : "text-red-600"}>
                {stock.change || "-"}
              </span>
              <span className={parseFloat(stock.percent_change) >= 0 ? "text-green-600" : "text-red-600"}>
                {stock.percent_change || "-"}%
              </span>
              <span>${convert(Number(stock.close || 0)).toFixed(2)}</span>
              <div className="h-12">
                <Line
                  data={chartData}
                  options={{
                    plugins:{ legend:{display:false} },
                    scales:{ x:{display:false}, y:{display:false} }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stocks;