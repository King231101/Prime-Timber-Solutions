import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-950" data-testid="hero-section">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-md mb-6">
              Digital Forestry Solutions
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid="text-hero-title"
            >
              Digital Load Tickets{" "}
              <span className="text-orange-500">Built for Forestry</span>{" "}
              at Scale
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8 max-w-lg" data-testid="text-hero-subtitle">
              Real-time visibility, audit-ready compliance, and control across every load, from stump to mill.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/#how-it-works">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-orange-600 border-orange-600 text-white font-semibold text-base px-8"
                  data-testid="button-see-how"
                >
                  See How It Works
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 bg-white/5 backdrop-blur-sm font-semibold text-base px-8"
                  data-testid="button-talk-expert-hero"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Talk to an Expert
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-neutral-400">1,200+ Forestry Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-neutral-400">800+ Harvest Areas</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://cdn.prod.website-files.com/6804566cfd0cbde4d4166890/696fe95234a3c98edcfe41ee_digital-trip-tickets-progress.png"
                alt="Prime Cut Timber digital platform on devices"
                className="w-full rounded-md"
                data-testid="img-hero-devices"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-600/15 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
