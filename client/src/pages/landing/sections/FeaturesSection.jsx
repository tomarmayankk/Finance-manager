import FeatureCard from "../components/FeatureCard";
import { features } from "../data/featuresData";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-10 lg:px-40">

        <h2 className="text-3xl font-bold text-center">
          Powerful Tools in Finsight
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 border border-gray-200 rounded-xl p-6">

          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;