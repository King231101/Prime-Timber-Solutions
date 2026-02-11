import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Headphones, ShieldCheck, WifiOff, Smartphone, Cloud } from "lucide-react";

const features = [
  { icon: Users, title: "Unlimited Users", desc: "Our platform supports unlimited users per account, making it easy to scale and collaborate without restrictions." },
  { icon: Headphones, title: "Unlimited 24/7 Support", desc: "We offer unlimited 24/7 support to ensure you always have the help you need, whenever you need it." },
  { icon: ShieldCheck, title: "Security & Privacy", desc: "We prioritize data security and privacy with end-to-end encryption and strict access controls to protect user information." },
  { icon: WifiOff, title: "Works Offline", desc: "Our apps are designed to be offline-first, ensuring full functionality even without an internet connection." },
  { icon: Smartphone, title: "Android & iOS Apps", desc: "We offer both Android and iPhone apps to provide a seamless experience across all mobile devices." },
  { icon: Cloud, title: "Cloud-Based", desc: "We are a cloud-based platform, enabling secure access and synchronization from anywhere, at any time." },
];

export default function PricingValueSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20" data-testid="pricing-value-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Pricing
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-pricing-title"
          >
            Included Value with Every Plan
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Annual plans include unlimited collaboration for your entire project team, with fixed pricing you can count on from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full text-center" data-testid={`card-pricing-feature-${i}`}>
                <div className="w-12 h-12 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
