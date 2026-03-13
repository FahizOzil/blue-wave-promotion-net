import Image from "next/image";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ServicesPage from "../components/ServicesPage";



export default function Home() {
  return (
  <>
    <Navbar />
    <ServicesPage /> 

    <Footer />
  </>
  );
}
