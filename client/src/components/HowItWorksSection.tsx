import { motion } from "framer-motion";
import { MapPin, Trees, Truck, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    num: "001",
    title: "Harvest Plan Created",
    description: "Control wood flow, increase visibility, and minimize errors for reduction in operational and administrative costs.",
    icon: MapPin,
    image: "/images/field-worker.png",
  },
  {
    num: "002",
    title: "Timber is Harvested",
    description: "Track production and inventory to gain a real time view of harvest progress.",
    icon: Trees,
    image: "/images/stacked-logs.png",
  },
  {
    num: "003",
    title: "Products Hauled",
    description: "View available loads, real-time destination changes, and verify status across multiple harvest areas.",
    icon: Truck,
    image: "/images/timber-truck.png",
  },
  {
    num: "004",
    title: "Delivery is Verified",
    description: "Receive error-free load information, with improved visibility to inbound trucks, while maintaining compliance.",
    icon: CheckCircle,
    image: "/images/timber-mill.png",
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
                <div className="relative overflow-hidden rounded-t-md">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-400 font-mono">{step.num}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="w-4 h-4 text-orange-500" />
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  </div>
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
