import { useNavigate } from "react-router-dom";

const calculators = [
  { name: "SIP Calculator", link: "/calculators/sip" },
  { name: "EMI Calculator", link: "/calculators/emi" },
  { name: "FD Calculator", link: "/calculators/fd" },
  { name: "RD Calculator", link: "/calculators/rd" },
  { name: "Lump Sum Calculator", link: "/calculators/lumpsum" },
  { name: "PPF Calculator", link: "/calculators/ppf" },
];

const CalculatorGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-center mb-10">
          Explore Other Calculators
        </h3>

        <div className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4">
          {calculators.map((calc, index) => (
            <div
              key={index}
              onClick={() => navigate(calc.link)}
              className="cursor-pointer bg-gray-50 p-6 rounded-2xl 
                         shadow-sm hover:shadow-lg 
                         transition hover:-translate-y-1"
            >
              <h4 className="font-semibold text-lg">
                {calc.name}
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                Calculate instantly with interactive charts
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorGrid;