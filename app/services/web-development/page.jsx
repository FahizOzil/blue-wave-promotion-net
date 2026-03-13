import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import WebDevelopmentPage from "@/app/components/WebDevelopmentPage";
import Footer from "@/app/components/layout/Footer";




export default function Home() {
  return (
  <>
    <Navbar />
     <WebDevelopmentPage />
    <Footer />
  </>
  );
}
