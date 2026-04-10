import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductHighlights from "@/components/ProductHighlights";
import GutScience from "@/components/GutScience";
import FlavorSelector from "@/components/FlavorSelector";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <LoadingScreen>
      <Navbar />
      <main>
        <HeroSection />
        <FlavorSelector />
        <ProductHighlights />
        <GutScience />
        <SocialProof />
      </main>
      <Footer />
    </LoadingScreen>
  );
}
