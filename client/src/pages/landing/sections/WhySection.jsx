const WhySection = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-6xl mx-auto px-10 text-center">

        <h2 className="text-3xl font-bold">
          Built for Simplicity. Designed for Security.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 text-left">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg">
              Secure Authentication
            </h4>
            <p className="mt-2 text-gray-600 text-sm">
              JWT based login keeps your financial data safe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg">
              Accurate Calculations
            </h4>
            <p className="mt-2 text-gray-600 text-sm">
              Industry standard formulas for calculators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg">
              Future Ready
            </h4>
            <p className="mt-2 text-gray-600 text-sm">
              Upcoming stock and crypto tracking tools.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default WhySection;