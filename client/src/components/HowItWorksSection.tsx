import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const steps = [
  {
    num: "001",
    title: "Harvest Plan Created",
    description: "Control wood flow, increase visibility, and minimize errors for reduction in operational and administrative costs.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696fef36e3d3f86040946044_waldo-jobs.png",
  },
  {
    num: "002",
    title: "Timber is Harvested",
    description: "Track production and inventory to gain a real time view of harvest progress.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696fef957ab5b8ecfa71192c_waldo-inventory-straight.png",
  },
  {
    num: "003",
    title: "Products Hauled",
    description: "View available loads, real-time destination changes, and verify status across multiple harvest areas.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696fef83661fe935bb1a2fe5_digital-trip-tickets-progress-vertical.png",
  },
  {
    num: "004",
    title: "Delivery is Verified",
    description: "Receive error-free load information, with improved visibility to inbound trucks, while maintaining compliance.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696fef71ad984bfce92e90be_waldo-ai-verification.png",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-neutral-50 dark:bg-neutral-900 py-20" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Our Process
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-how-it-works-title"
          >
            How Prime Cut Timber Works
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Quickly create harvest areas, invite companies, track wood loads, and manage trip tickets digitally.
            PCT ensures efficiency, accuracy, and compliance across the supply chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-visible group cursor-pointer h-full" data-testid={`card-step-${step.num}`}>
                <div className="relative overflow-hidden rounded-t-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center p-4 h-56">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-400 font-mono">{step.num}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
