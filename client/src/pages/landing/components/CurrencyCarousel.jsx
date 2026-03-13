import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleArrowLeft } from "lucide-react";

const CurrencyCarousel = () => {
  const [rates, setRates] = useState(null);
  const [index, setIndex] = useState(0);

  const currencyList = ["USD", "EUR", "INR", "GBP", "JPY"];

  useEffect(() => {
    const fetchRates = async () => {
      const res = await fetch("https://cdn.moneyconvert.net/api/latest.json");
      const data = await res.json();
      setRates(data.rates);
    };

    fetchRates();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % currencyList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? currencyList.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % currencyList.length);
  };

  if (!rates) return <div>Loading...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm mx-auto text-center relative">
      <h3 className="font-semibold mb-6">Live Exchange Rates</h3>

      {/* Arrow Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-2xl"
      >
        <CircleArrowLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-2xl"
      >
        <CircleArrowLeft className="rotate-180" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-gray-500 text-sm">{currencyList[index]}</p>

        <p className="text-4xl font-bold text-green-500 mt-2">
          {rates[currencyList[index]].toFixed(4)}
        </p>
      </motion.div>
    </div>
  );
};

export default CurrencyCarousel;