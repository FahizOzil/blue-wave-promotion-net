import Image from "next/image";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesOverview from "./components/ServicesOverView";
import Footer from "./components/layout/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import WorkSection from "./components/WorkSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
  <>
    <Navbar />
    <HeroSection />
    <ServicesOverview />
    <WhyChooseUs />
    <WorkSection />
    <TestimonialsSection />
    <ContactSection />

    <Footer />
  </>
  );
}
