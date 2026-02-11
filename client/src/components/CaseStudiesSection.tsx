import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    category: "Land Owner / Land Manager",
    company: "Lyme Great Lakes Timberlands",
    description: "Lyme Great Lakes Timberlands partnered with PCT to digitize field operations across 600,000 acres, eliminating paper tickets, streamlining compliance, and integrating with LIMS for faster, more accurate, and transparent forest management.",
    image: "/images/forest-bg.png",
  },
  {
    category: "Trucking",
    company: "Rowlee Farms Trucking",
    description: "PCT enabled Rowlee Farms to go fully paperless with an offline-first mobile platform that streamlined load tracking, improved payment speed, and reduced admin work and disputes.",
    image: "/images/timber-truck.png",
  },
  {
    category: "Logging",
    company: "Sanville Logging",
    description: "Sanville Logging adopted PCT to replace lost paper tickets and streamline multi-crew operations with real-time, offline-capable digital tools that improved accuracy, transparency, and efficiency in the woods.",
    image: "/images/stacked-logs.png",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20" data-testid="case-studies-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            PCT's Clients
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-case-studies-title"
          >
            Case Studies — In the Field Success
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-visible group cursor-pointer h-full hover-elevate" data-testid={`card-case-study-${i}`}>
                <div className="relative overflow-hidden rounded-t-md">
                  <img
                    src={cs.image}
                    alt={cs.company}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-orange-300 bg-neutral-900/60 px-2 py-1 rounded-md backdrop-blur-sm">
                      {cs.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2">{cs.company}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {cs.description}
                  </p>
                  <div className="flex items-center gap-1 text-orange-500">
                    <span className="text-xs font-semibold">Read Case Study</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
