import { motion } from "framer-motion";

export default function WhatWeDoSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20" data-testid="what-we-do-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            What We Do
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-what-we-do-title"
          >
            Prime Cut Timber digitizes the trip ticket,{" "}
            <span className="text-orange-600">Simplifying your operations</span> and providing
            Time-Saving, Error-Free, and Secure Chain Of Custody.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto" data-testid="text-what-we-do-desc">
            PCT connects and unifies your data across the timber supply chain into one platform,
            providing real-time transparency, streamlining operations, and driving profitability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
