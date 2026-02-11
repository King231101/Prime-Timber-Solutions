import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, FileCheck, HeadphonesIcon } from "lucide-react";

const steps = [
  { num: "01", title: "Setup Company", desc: "Create, or claim your company; invite your network, set your permissions.", icon: Building2 },
  { num: "02", title: "Set Up Harvest", desc: "Create products, add destinations, integrate maps, share files.", icon: MapPin },
  { num: "03", title: "Run Tickets", desc: "Add wood, pick up & drop off loads, reconcile & pay.", icon: FileCheck },
  { num: "04", title: "Support", desc: "Ensure long-term success with dedicated support and free updates.", icon: HeadphonesIcon },
];

export default function SetupStepsSection() {
  return (
    <section className="relative overflow-hidden py-20" data-testid="setup-steps-section">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/forest-bg.png)" }}
      />
      <div className="absolute inset-0 bg-neutral-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-400 mb-3 block">
            Our Process
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-setup-title"
          >
            Simple Supply Chain Setup{" "}
            <span className="text-orange-400">With Zero Downtime</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
              data-testid={`setup-step-${step.num}`}
            >
              <div className="text-5xl font-extrabold text-orange-500/30 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {step.num}
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase text-orange-400 mb-1">Step</div>
              <div className="w-12 h-12 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-neutral-300 mb-6">Let's work together.</p>
          <Link href="/contact">
            <Button
              variant="default"
              size="lg"
              className="bg-orange-600 border-orange-600 text-white font-semibold text-base px-10"
              data-testid="button-get-quote"
            >
              Get Free Quote
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
