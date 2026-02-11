import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who pays & how much is it?",
    a: "Pricing is flexible and depends on your operation size. We offer plans that scale with your needs, from individual loggers to large timber companies managing hundreds of harvest areas. Contact us for a personalized quote.",
  },
  {
    q: "How do you handle compliance and security?",
    a: "PCT uses end-to-end encryption, strict access controls, and automatic audit trails. Every ticket is timestamped and geotagged, making it easy to generate compliance reports for FSC, SFI, PEFC, and EUDR standards.",
  },
  {
    q: "Can everyone see my data?",
    a: "No. PCT uses role-based access controls so you decide exactly who sees what. Your data is private by default, and you control sharing permissions across your supply chain partners.",
  },
  {
    q: "Do I have to use paper tickets?",
    a: "Not with PCT. We completely replace paper trip tickets with digital ones that are faster, more accurate, and accessible from any device. No more lost slips or illegible handwriting.",
  },
  {
    q: "Will it work offline?",
    a: "Yes! PCT is built offline-first. Create, haul, and deliver tickets even without cell service. Everything syncs automatically when you're back online.",
  },
  {
    q: "How hard is it to get set up? Will you help?",
    a: "Setup is simple and we handle most of it for you. Our team provides hands-on onboarding, training, and ongoing support to make sure your crew is comfortable from day one.",
  },
  {
    q: "Will this work with my other systems?",
    a: "Yes. PCT integrates with Trimble LIMS, Caribou, Forest Products Accounting, and offers CSV/PDF exports plus a custom API for connecting to any system you use.",
  },
  {
    q: "Will my truckers or loggers use it?",
    a: "Absolutely. PCT is designed for the field, not the office. The interface is simple enough that anyone can learn it in minutes, and it works on any smartphone — Android or iPhone.",
  },
  {
    q: "We are not tech people — how hard is it?",
    a: "PCT is built for forestry professionals, not tech experts. The app is intuitive, requires minimal training, and our support team is available 24/7 to help with anything.",
  },
  {
    q: "How does this thing work?",
    a: "It's simple: create a harvest plan, track timber as it's cut, manage loads digitally as they're hauled, and verify deliveries at the mill. Everything is tracked in real-time on one platform.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-20" data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Questions
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-neutral-200 dark:border-neutral-700 rounded-md px-4 overflow-hidden" data-testid={`faq-item-${i}`}>
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-orange-600 transition-colors py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
