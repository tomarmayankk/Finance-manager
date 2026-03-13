import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const calculators = [
  { name: "SIP Calculator", path: "/calculators/sip" },
  { name: "EMI Calculator", path: "/calculators/emi" },
  { name: "FD Calculator", path: "/calculators/fd" },
  { name: "RD Calculator", path: "/calculators/rd" },
  { name: "Lump Sum Calculator", path: "/calculators/lumpsum" },

  // New Calculators
  { name: "PPF Calculator", path: "/calculators/ppf" },
  { name: "Inflation Calculator", path: "/calculators/inflation" },
  { name: "Step-Up SIP Calculator", path: "/calculators/stepupsip" },
];

const CalculatorsDropdown = () => {
  return (
    <div className="relative group">
      {/* Button */}
      <button
        className="flex items-center gap-1 text-gray-700 
                   hover:text-blue-600 font-medium transition"
      >
        Calculators
        <ChevronDown size={16} className="mt-[2px]" />
      </button>

      {/* Dropdown Menu */}
      <div
        className="absolute left-0 mt-3 w-60 bg-white rounded-xl shadow-xl 
                   border border-gray-100
                   opacity-0 invisible translate-y-2
                   group-hover:opacity-100 
                   group-hover:visible 
                   group-hover:translate-y-0
                   transition-all duration-200 z-50"
      >
        <div className="py-2">
          {calculators.map((calc, index) => (
            <Link
              key={index}
              to={calc.path}
              className="block px-5 py-3 text-sm text-gray-700 
                         hover:bg-gray-50 hover:text-blue-600 
                         transition"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsDropdown;