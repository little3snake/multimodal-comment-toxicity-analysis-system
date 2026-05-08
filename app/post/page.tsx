import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostMainSection from "@/components/post-check/PostMainSection";

export default function PostCheckPage() {
  return (
    <main className="min-h-screen bg-white-custom">
      <Navbar />
      <PostMainSection />
      <Footer />
    </main>
  );
}