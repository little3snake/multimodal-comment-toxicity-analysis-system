import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageMainSection from "@/components/image-check/ImageMainSection";

export default function ImageCheckPage() {
  return (
    <main className="min-h-screen bg-silver">
      <Navbar />
      <ImageMainSection />
      <Footer />
    </main>
  );
}