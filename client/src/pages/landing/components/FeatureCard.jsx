import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, desc, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-sm text-gray-600">{desc}</p>
    </div>
  );
};

export default FeatureCard;