import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Crypto = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [rates, setRates] = useState({ USD: 1, EUR: 0.93, INR: 83 });
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    // fetch crypto
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        // generate mini chart for each coin
        const withChart = data.map((coin) => {
          const base = coin.current_price || 0;
          const chart = Array.from({ length: 5 }, (_, i) =>
            base + (Math.random() - 0.5) * (base * 0.02)
          );
          const isUp = coin.price_change_percentage_24h >= 0;
          return { ...coin, chart, isUp };
        });

        setCoins(withChart);
        setFilteredCoins(withChart);
      });

    // fetch currency rates
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates || rates);
        setLoading(false);
      });
  }, []);

  // safe search filter
  useEffect(() => {
    const filtered = coins.filter(
      (coin) => coin.name && coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [search, coins]);

  if (loading) return <p className="p-6">Loading data...</p>;

  const converted =
    currency === "USD"
      ? Number(amount)
      : currency === "EUR"
      ? Number(amount) * (rates.EUR || 0.93)
      : Number(amount) * (rates.INR || 83);

  return (
    <div className="min-h-screen p-6 px-44">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 pt-20">Crypto Market</h1>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        {/* Search Bar */}
        <div className="flex border overflow-hidden rounded-xl w-full md:w-80">
          <input
            type="text"
            placeholder="Search crypto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Currency Converter */}
        <div className="flex gap-2 items-center border rounded-xl p-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
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
          <span className="font-semibold">{converted.toFixed(2)} {currency}</span>
        </div>
      </div>

      {/* Crypto Table */}
      <div className="rounded-xl overflow-hidden border border-gray-300">
        {/* Table Header */}
        <div className="grid grid-cols-6 p-2 px-4 font-semibold text-gray-600 bg-gray-200 border-b border-gray-300">
          <span>Coin</span>
          <span>Price</span>
          <span>24h Change</span>
          <span>Market Cap</span>
          <span>Rank</span>
          <span>Chart</span>
        </div>

        {filteredCoins.map((coin, index) => {
          const chartData = {
            labels: ["1","2","3","4","5"],
            datasets: [
              {
                data: coin.chart,
                borderColor: coin.isUp ? "#16a34a" : "#dc2626",
                backgroundColor: "transparent",
                borderWidth: 2,
                tension: 0,
                pointRadius: 0
              }
            ]
          };

          return (
            <div
              key={coin.id || index}
              className="grid grid-cols-6 p-4 border-b border-gray-300 items-center hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span className="font-medium">{coin.name || "-"}</span>
              </div>

              <span>${coin.current_price?.toLocaleString() || "-"}</span>

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2) || "-"}%
              </span>

              <span>${coin.market_cap?.toLocaleString() || "-"}</span>

              <span>#{coin.market_cap_rank || "-"}</span>

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

export default Crypto;