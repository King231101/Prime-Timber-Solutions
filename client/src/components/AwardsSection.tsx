import { motion } from "framer-motion";

const awards = [
  {
    title: "Excellence in Digital Forestry",
    image: "/images/award-recognition.png",
  },
  {
    title: "Outstanding Achievement Award",
    image: "/images/award-achievement.png",
  },
  {
    title: "Processing Excellence Certification",
    image: "/images/award-processing.png",
  },
];

export default function AwardsSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-20" data-testid="awards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Recognized & Certified
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-awards-title"
          >
            Awards & Certifications
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            Prime Cut Timber is recognized for excellence in digital forestry operations, supply chain innovation, and regulatory compliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-md p-4 shadow-sm border border-neutral-200 dark:border-neutral-700" data-testid={`card-award-${i}`}>
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <p className="text-sm font-semibold text-foreground mt-4">{award.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
