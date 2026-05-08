import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Opportunities";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#F3F5F8]">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}