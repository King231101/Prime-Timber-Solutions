import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "PCT transformed our operations, making mill ticket tracking seamless and saving hundreds of hours in the office. It's user-friendly, cost-effective, and essential in today's market.",
    name: "Bryce Jauquet",
    company: "Jauquet Forest Products LLC",
    image: "/images/testimonial-1.png",
  },
  {
    quote: "PCT has been a major asset by improving truck efficiency and saving time. With instant access to load information, we've eliminated the need for flipping through slips and gained immediate updates, even from the office.",
    name: "Dylan Rowlee",
    company: "Rowlee Farms Trucking, VT",
    image: "/images/testimonial-2.png",
  },
  {
    quote: "PCT solves an old industry problem by providing real-time visibility from woods to mill. It enables timely decisions, builds trust with supply chain transparency, and comes with incredible customer service.",
    name: "Bill O'Brion",
    company: "Lyme Great Lakes Timberlands",
    image: "/images/testimonial-3.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-20" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Customer Testimonials
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-testimonials-title"
          >
            Trusted by 1,200 Forestry Professionals Managing Over 800 Harvest Areas Nationwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col" data-testid={`card-testimonial-${i}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <Avatar>
                    <AvatarImage src={t.image} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company}</div>
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
