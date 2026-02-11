import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import PricingValueSection from "@/components/PricingValueSection";
import FAQSection from "@/components/FAQSection";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for individual loggers and small operations.",
    price: "Contact Us",
    features: [
      "Unlimited digital trip tickets",
      "Offline-first mobile app",
      "Basic reporting & exports",
      "Email support",
      "Up to 5 users",
      "1 harvest area",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Professional",
    desc: "For growing operations managing multiple harvest areas.",
    price: "Contact Us",
    features: [
      "Everything in Starter",
      "Unlimited users",
      "Unlimited harvest areas",
      "Scale ticket OCR",
      "Advanced analytics",
      "Priority 24/7 support",
      "CSV & PDF exports",
      "API access",
    ],
    cta: "Talk to Sales",
    featured: true,
  },
  {
    name: "Enterprise",
    desc: "For large timber companies and land managers at scale.",
    price: "Custom",
    features: [
      "Everything in Professional",
      "Trimble LIMS integration",
      "Caribou integration",
      "Forest Products Accounting",
      "Custom API & webhooks",
      "Dedicated account manager",
      "Custom onboarding",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-pricing">
      <Header />
      <main className="pt-16">
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">Pricing</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-pricing-page-title">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your operation. All plans include unlimited digital trip tickets and our offline-first mobile apps.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card
                    className={`p-6 h-full flex flex-col ${plan.featured ? "border-orange-500 dark:border-orange-500 ring-1 ring-orange-500/20" : ""}`}
                    data-testid={`card-plan-${plan.name.toLowerCase()}`}
                  >
                    {plan.featured && (
                      <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-2">Most Popular</div>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                    <div className="text-2xl font-bold text-foreground mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button
                        className={`w-full font-semibold ${plan.featured ? "bg-orange-600 border-orange-600 text-white" : ""}`}
                        variant={plan.featured ? "default" : "outline"}
                        data-testid={`button-plan-${plan.name.toLowerCase()}`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PricingValueSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
