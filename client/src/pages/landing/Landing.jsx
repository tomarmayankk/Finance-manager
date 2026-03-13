import Navbar from "../../components/Navbar";

import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import WhySection from "./sections/WhySection";
import CTASection from "./sections/CTASection";
import FooterSection from "./sections/FooterSection";

const Landing = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />

      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Landing;