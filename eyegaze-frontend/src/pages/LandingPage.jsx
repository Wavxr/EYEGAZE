import Navbar from "../components/landing page/Navbar";
import HeroSection from "../components/landing page/HeroSection";
import HowItWorks from "../components/landing page/HowItWorks";
import FeaturesSection from "../components/landing page/FeaturesSection";
import UseCases from "../components/landing page/UseCases";
import PricingSection from "../components/landing page/PricingSection";
import Testimonials from "../components/landing page/Testimonials";
import FAQSection from "../components/landing page/FAQSection";
import Footer from "../components/landing page/Footer";

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <UseCases />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}