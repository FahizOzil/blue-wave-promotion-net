import GraphicsDesigningPage from "@/app/components/GraphicsDesigningPage";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";


// ✅ And both wrap content like this:
export default function Home() {
  return (
    <>
    <Navbar />
      <GraphicsDesigningPage /> 
      <Footer />
    </>
  );
}