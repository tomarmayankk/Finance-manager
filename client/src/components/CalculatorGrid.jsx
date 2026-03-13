import { useNavigate } from "react-router-dom";

const calculators = [
  { name: "SIP Calculator", link: "/calculators/sip" },
  { name: "EMI Calculator", link: "/calculators/emi" },
  { name: "FD Calculator", link: "/calculators/fd" },
  { name: "RD Calculator", link: "/calculators/rd" },
  { name: "Lump Sum Calculator", link: "/calculators/lumpsum" },
  { name: "PPF Calculator", link: "/calculators/ppf" },
  { name: "Inflation Calculator", link: "/calculators/inflation" },
  { name: "Step-Up SIP Calculator", link: "/calculators/stepupsip" },
];

const CalculatorGrid = () => {
  const navigate = useNavigate();

  return (
    <div>

      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        Explore Other Calculators
      </h3>

      <div className="flex flex-col">

        {calculators.map((calc, index) => (
          <div
            key={index}
            onClick={() => navigate(calc.link)}
            className="py-3 border-b cursor-pointer 
                       text-gray-700 hover:text-green-600 
                       hover:bg-gray-50 px-2 transition"
          >
            {calc.name}
          </div>
        ))}

      </div>

    </div>
  );
};

export default CalculatorGrid;