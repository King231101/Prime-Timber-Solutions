import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, FileSpreadsheet, FileOutput, Code, Database, Printer } from "lucide-react";

const integrations = [
  {
    icon: Database,
    name: "Trimble LIMS",
    description: "Export all of your trip tickets and job reports seamlessly into LIMS.",
  },
  {
    icon: FileText,
    name: "Caribou",
    description: "Export to Caribou Software to connect your forestry operations.",
  },
  {
    icon: FileOutput,
    name: "Forest Products Accounting",
    description: "Export your job and trip ticket information into the Forest Products Accounting format.",
  },
  {
    icon: FileSpreadsheet,
    name: "CSV Export",
    description: "Export your job and trip ticket information into customizable CSV reports.",
  },
  {
    icon: Printer,
    name: "PDF Export",
    description: "Export your job and trip ticket information into customizable PDF reports.",
  },
  {
    icon: Code,
    name: "Custom API",
    description: "Utilize PCT's Developer API to connect all of your forestry data in one place.",
  },
];

export default function IntegrationsSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-20" data-testid="integrations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            PCT Integrations
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-integrations-title"
          >
            Fully Integrates With Your Workflow
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Annual plans include unlimited collaboration for your entire project team, with fixed pricing you can count on from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group cursor-pointer hover-elevate" data-testid={`card-integration-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-orange-500">
                      <span className="text-xs font-semibold">Learn more</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
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
