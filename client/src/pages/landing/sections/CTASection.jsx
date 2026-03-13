import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-green-500 text-white text-center">

      <h2 className="text-3xl font-bold">
        Ready to Take Control of Your Finances?
      </h2>

      <button
        onClick={() => navigate("/register")}
        className="mt-8 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold"
      >
        Create Free Account
      </button>

    </section>
  );
};

export default CTASection;