import { motion } from "framer-motion";

const logos = [
  "TriState Timber Co.",
  "Genesis Timber",
  "Superior Woodlands",
  "Jauquet Forest Products",
  "Pacific Ridge Logging",
  "Northern Pine Industries",
  "Cedar Valley Forestry",
  "Mountain Peak Lumber",
];

export default function LogoBar() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-8 border-b border-neutral-100 dark:border-neutral-800" data-testid="logo-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-neutral-300 dark:text-neutral-600 tracking-wider uppercase whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid={`logo-partner-${i}`}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
