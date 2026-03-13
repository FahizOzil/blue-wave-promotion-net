// ✅ Both files already have these imports at the top:
import Navbar from "@/app/components/layout/Navbar";
import AppDevPage from "@/app/components/AppDevPage";
import Footer from "@/app/components/layout/Footer";

// ✅ And both wrap content like this:
export default function Home() {
  return (
    <>
      <Navbar />
      <AppDevPage /> 
      <Footer />
    </>
  );
}