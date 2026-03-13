import Navbar from "./Navbar";
import CalculatorGrid from "./CalculatorGrid";

const CalculatorLayout = ({ title, inputs, resultBox }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="pt-24 px-10 lg:px-40">

        {/* PAGE TITLE */}
        <h2 className="text-3xl font-bold mb-8">
          {title}
        </h2>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 border rounded-xl p-8">

            <div className="grid md:grid-cols-2 gap-10">

              {/* INPUTS */}
              <div className="flex flex-col gap-6">
                {inputs}
              </div>

              {/* RESULTS */}
              <div>
                {resultBox}
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="border rounded-xl p-6 h-fit">
            <CalculatorGrid />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CalculatorLayout;