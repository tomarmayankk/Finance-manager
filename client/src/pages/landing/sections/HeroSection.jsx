import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CurrencyCarousel from "../components/CurrencyCarousel";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-48 pb-24">
      <div className="max-w-7xl mx-auto px-10 lg:px-40 grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            Take Control of Your Financial Future
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Finsight helps you track expenses, calculate investments,
            and manage your finances — all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/calculators/sip")}
              className="border px-6 py-3 rounded-xl font-semibold"
            >
              Try Calculators
            </button>
          </div>
        </motion.div>

        <CurrencyCarousel />

      </div>
    </section>
  );
};

export default HeroSection;