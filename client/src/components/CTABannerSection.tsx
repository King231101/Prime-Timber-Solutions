import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTABannerSection() {
  return (
    <section className="py-16 px-4" data-testid="cta-banner-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-md bg-neutral-900 py-14 px-6 text-center"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)`,
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid="text-cta-banner-title"
            >
              Questions on Features, Pricing or Demo Request?
            </h3>
            <p className="text-neutral-400 text-sm mb-1">Call us Today!</p>
            <a
              href="tel:+14078135384"
              className="text-orange-500 text-xl sm:text-2xl font-bold"
              data-testid="link-cta-phone"
            >
              (407) 813-5384
            </a>
            <p className="text-neutral-500 text-sm mt-3 mb-6">or</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-neutral-600 text-white bg-transparent backdrop-blur-sm"
                  data-testid="button-cta-talk-expert"
                >
                  Talk To An Expert
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  className="bg-orange-500 border-orange-500 text-white"
                  data-testid="button-cta-view-pricing"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
