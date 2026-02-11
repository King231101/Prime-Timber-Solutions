import { motion } from "framer-motion";

const logos = [
  { name: "TriState", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/6970e979afd30592d7123db3_tristate.jpg" },
  { name: "Layer 13", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/6970e9a9d8c7eba7a6d619a9_Layer%2013.jpg" },
  { name: "Layer 12", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/6970e93b30ab542a40e0165a_Layer%2012.jpg" },
  { name: "Genesis Timber", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/69718fb9da12a13521016f71_Genesis-timber.jpg" },
  { name: "Superior Woodlands", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/69718f90f17defe53931ed98_superior-woodlands-co.jpg" },
  { name: "Jauquet Forest Products", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/69718f71928809e40d0d4db3_jaquet-forest-products.jpg" },
  { name: "Layer 15", src: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/6970e9907cdb3586a97bec84_Layer%2015.jpg" },
];

export default function LogoBar() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-8 border-b border-neutral-100 dark:border-neutral-800" data-testid="logo-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              data-testid={`logo-partner-${i}`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
