import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import SetupStepsSection from "@/components/SetupStepsSection";
import PricingValueSection from "@/components/PricingValueSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FAQSection from "@/components/FAQSection";
import ImageCarouselSection from "@/components/ImageCarouselSection";
import AwardsSection from "@/components/AwardsSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <LogoBar />
        <WhatWeDoSection />
        <HowItWorksSection />
        <BenefitsSection />
        <IntegrationsSection />
        <SetupStepsSection />
        <PricingValueSection />
        <TestimonialsSection />
        <CaseStudiesSection />
        <ImageCarouselSection />
        <FAQSection />
        <AwardsSection />
        <BlogPreviewSection />
      </main>
      <Footer />
    </div>
  );
}
