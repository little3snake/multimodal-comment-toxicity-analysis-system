import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextMainSection from "@/components/text-check/TextMainSection";

export default function TextCheckPage() {
  return (
    <main className="min-h-screen bg-silver">
      <Navbar />
      <TextMainSection />
      <Footer />
    </main>
  );
}