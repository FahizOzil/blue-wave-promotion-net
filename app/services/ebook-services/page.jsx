import EbookServicesPage from "@/app/components/EbookServicesPage";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";


// ✅ And both wrap content like this:
export default function Home() {
  return (
    <>
    <Navbar />
    <EbookServicesPage />
      <Footer />
    </>
  );
}