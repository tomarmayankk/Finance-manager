import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

import Navbar from "../components/Navbar";

const ShareMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "d6o2pq1r01qsfaqqq9j0d6o2pq1r01qsfaqqq9jg";

  const stockSymbols = [
    "NSE:RELIANCE",
    "NSE:TCS",
    "NSE:INFY",
    "NSE:HDFCBANK",
    "NSE:SBIN",
    "NSE:ITC",
    "NSE:ICICIBANK",
    "NSE:TATASTEEL"
  ];

  const indexSymbols = ["NSE:NIFTY", "NSE:BANKNIFTY"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stock data
        const stockResults = await Promise.all(
          stockSymbols.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await res.json();

            // Create jagged mini chart
            const isUp = data.d >= 0;
            const base = data.c;
            const chart = Array.from({ length: 5 }, (_, i) =>
              base + (Math.random() - 0.5) * (base * 0.02) // 2% fluctuation
            );

            return {
              symbol: symbol.replace("NSE:", ""),
              price: data.c,
              change: data.d,
              percent: data.dp,
              chart,
              isUp,
            };
          })
        );

        setStocks(stockResults);

        const sorted = [...stockResults].sort((a, b) => b.percent - a.percent);
        setGainers(sorted.slice(0, 4));
        setLosers([...sorted].reverse().slice(0, 4));

        // Fetch indices
        const indexResults = await Promise.all(
          indexSymbols.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await res.json();
            const isUp = data.d >= 0;
            const base = data.c;
            const chart = Array.from({ length: 5 }, (_, i) =>
              base + (Math.random() - 0.5) * (base * 0.02)
            );
            return {
              symbol: symbol.replace("NSE:", ""),
              price: data.c,
              change: data.d,
              percent: data.dp,
              chart,
              isUp,
            };
          })
        );

        setIndices(indexResults);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const Card = ({ title, data }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-3">{title}</h2>
      {data.map((stock, i) => {
        const chartData = {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {
              data: stock.chart,
              borderColor: stock.isUp ? "#16a34a" : "#dc2626",
              borderWidth: 2,
              tension: 0, // jagged line
              pointRadius: 0,
              backgroundColor: "transparent",
            },
          ],
        };

        return (
          <div key={i} className="flex justify-between items-center border-b py-2">
            <span className="font-medium">{stock.symbol}</span>
            <span>₹{stock.price}</span>
            <span
              className={stock.percent >= 0 ? "text-green-600" : "text-red-600"}
            >
              {stock.change} ({stock.percent}%)
            </span>
            <div className="w-20 h-12">
              <Line
                data={chartData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading) return <p className="p-6">Loading Market...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Share Market Today</h1>

        {/* INDICES */}
        <Card title="Market Indices" data={indices} />

        {/* Other Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Top Gainers" data={gainers} />
          <Card title="Top Losers" data={losers} />
          <Card title="Most Active" data={stocks.slice(0, 4)} />
        </div>
      </div>
    </div>
  );
};

export default ShareMarket;