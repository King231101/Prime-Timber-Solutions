import { motion } from "framer-motion";

const benefits = [
  {
    tag: "PCT",
    title: "One Shared Source of Truth",
    description: "Everyone sees the same ticket, at the same time. No paper slips, no re-entry, no disputes. Trust goes up. Operations move faster.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/697fb64efcb938640a0e0b4b_waldo-inventory-tilted.png",
  },
  {
    tag: "PCT",
    title: "Real-Time Visibility (Without Phone Calls)",
    description: "See every load as it moves from stump to scale. Track pickup, delivery, volume, and destination in real time — no calls or paperwork.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696febb0eaa313675d8c978c_waldo-inventory-graph-tilted.png",
  },
  {
    tag: "PCT",
    title: "Built for the Field — Offline, Fast and Simple",
    description: "Built for the cab and the landing, not the office. Create, haul, and deliver tickets in seconds — even with no cell service.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696febd55e916d92d2b09453_digital-trip-tickets-create.png",
  },
  {
    tag: "PCT",
    title: "Fewer Errors, Less Rework",
    description: "No lost slips. No handwriting issues. No manual data entry across systems. PCT reads, verifies, and attaches scale data directly to each load ticket.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696feba36c909755618ad87d_scale-slip-ocr.png",
  },
  {
    tag: "PCT",
    title: "Audit-Ready by Default",
    description: "Every ticket is timestamped, geotagged, and traceable from stump to scale. Generate audit-ready reports for FSC, SFI, PEFC, and EUDR in minutes.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696feb920b4e6fa024ce38d0_waldo-trip-ticket-details-tilted.png",
  },
  {
    tag: "PCT",
    title: "Foundation for Everything Downstream",
    description: "Settlements, reporting, compliance, integrations — all start with a clean ticket.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/697fb559793f6f3cf91ddaa2_computer-trip-ticket-export.png",
  },
  {
    tag: "PCT",
    title: "Works Across Every Supply Chain",
    description: "Built to work in every forestry region across the U.S. and Canada. PCT supports any wood sort, destination, unit of measure, and flow.",
    image: "https://cdn.prod.website-files.com/6804566cfd0cbde4d41668f7/696feda371d14b9d2cbfb505_waldo-desktop-maps.png",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Prime Cut Timber
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-benefits-title"
          >
            The Benefits of PCT's E-Ticket
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Digital trip tickets that replace paper, reduce errors, and give every stakeholder real-time visibility — from stump to mill.
          </p>
        </motion.div>

        <div className="space-y-8">
          {benefits.map((benefit, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-12`}
                data-testid={`benefit-item-${i}`}
              >
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-md bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center p-6">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="max-w-full h-auto object-contain max-h-80"
                    />
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold tracking-wider uppercase text-orange-500">{benefit.tag}</span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
