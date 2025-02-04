// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "../components/FeaturesSection";
import UseCases from "../components/UseCases";
import PricingSection from "../components/PricingSection";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

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