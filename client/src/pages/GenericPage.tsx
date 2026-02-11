import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Trees, Truck, Factory, FileText, Eye, ShieldCheck, ScanLine, Package, BookOpen, Newspaper, Puzzle, HelpCircle } from "lucide-react";

const pageData: Record<string, { title: string; subtitle: string; description: string; image: string; features: { icon: any; title: string; desc: string }[] }> = {
  "digital-trip-tickets": {
    title: "Digital Trip Tickets",
    subtitle: "Solutions",
    description: "Replace paper trip tickets with digital ones that are faster, more accurate, and accessible from any device. Create, haul, and deliver tickets in seconds.",
    image: "/images/app-devices.png",
    features: [
      { icon: FileText, title: "Instant Creation", desc: "Create digital tickets in seconds from any device, even offline." },
      { icon: Eye, title: "Real-Time Tracking", desc: "Track every load from pickup to delivery with live status updates." },
      { icon: ShieldCheck, title: "Audit-Ready", desc: "Every ticket is timestamped, geotagged, and fully traceable." },
    ],
  },
  "supply-chain": {
    title: "Supply Chain Visibility",
    subtitle: "Solutions",
    description: "See every load as it moves through your supply chain. Track pickup, delivery, volume, and destination in real time without phone calls or paperwork.",
    image: "/images/timber-truck.png",
    features: [
      { icon: Eye, title: "Live Dashboard", desc: "Monitor all active loads and their status on a single dashboard." },
      { icon: MapPin, title: "GPS Tracking", desc: "Know exactly where every load is at any point in the supply chain." },
      { icon: Trees, title: "Multi-Site", desc: "Manage visibility across multiple harvest areas simultaneously." },
    ],
  },
  "compliance": {
    title: "Compliance & Reporting",
    subtitle: "Solutions",
    description: "Generate audit-ready reports for FSC, SFI, PEFC, and EUDR in minutes. All load data is verified, traceable, and ready when auditors ask.",
    image: "/images/timber-mill.png",
    features: [
      { icon: ShieldCheck, title: "Certification Ready", desc: "Meet FSC, SFI, PEFC, and EUDR requirements automatically." },
      { icon: FileText, title: "One-Click Reports", desc: "Generate comprehensive compliance reports in minutes." },
      { icon: Eye, title: "Full Traceability", desc: "Every ticket includes complete chain of custody data." },
    ],
  },
  "scale-ticket-ocr": {
    title: "Scale Ticket OCR",
    subtitle: "Solutions",
    description: "Automatically read, verify, and attach scale data directly to each load ticket. No manual data entry, no handwriting issues, no lost slips.",
    image: "/images/stacked-logs.png",
    features: [
      { icon: ScanLine, title: "Auto-Read", desc: "OCR technology reads scale tickets automatically with high accuracy." },
      { icon: ShieldCheck, title: "Verification", desc: "Data is cross-verified against load tickets to catch errors." },
      { icon: FileText, title: "Digital Archive", desc: "All scale data is stored digitally and linked to load records." },
    ],
  },
  "inventory": {
    title: "Inventory Management",
    subtitle: "Solutions",
    description: "Track production and inventory in real time to gain a live view of harvest progress across all your operations.",
    image: "/images/field-worker.png",
    features: [
      { icon: Package, title: "Live Inventory", desc: "See real-time inventory levels across all harvest areas." },
      { icon: Eye, title: "Progress Tracking", desc: "Monitor harvest progress against plans and targets." },
      { icon: Trees, title: "Wood Sort Management", desc: "Manage different wood sorts, species, and grades efficiently." },
    ],
  },
  "land-managers": {
    title: "Land Managers",
    subtitle: "Who We Serve",
    description: "Control wood flow, increase visibility, and minimize errors for reduction in operational and administrative costs across your timberlands.",
    image: "/images/forest-bg.png",
    features: [
      { icon: MapPin, title: "Harvest Planning", desc: "Create and manage harvest plans with integrated maps and data." },
      { icon: Eye, title: "Full Visibility", desc: "See every load moving across your timberlands in real time." },
      { icon: ShieldCheck, title: "Compliance", desc: "Meet certification requirements with automatic audit trails." },
    ],
  },
  "loggers": {
    title: "Loggers",
    subtitle: "Who We Serve",
    description: "Track production and inventory to gain a real-time view of harvest progress. Simple, offline-first tools built for the landing.",
    image: "/images/stacked-logs.png",
    features: [
      { icon: Trees, title: "Production Tracking", desc: "Log every load and track production against targets." },
      { icon: FileText, title: "Digital Tickets", desc: "Create and manage tickets from your phone, even offline." },
      { icon: Package, title: "Inventory", desc: "Real-time view of what's on the landing and what's been hauled." },
    ],
  },
  "truckers": {
    title: "Truckers",
    subtitle: "Who We Serve",
    description: "View available loads, real-time destination changes, and verify status across multiple harvest areas. No more flipping through paper slips.",
    image: "/images/timber-truck.png",
    features: [
      { icon: Truck, title: "Load Management", desc: "See available loads and pick up with a single tap." },
      { icon: MapPin, title: "Destinations", desc: "Get real-time destination updates and routing information." },
      { icon: FileText, title: "Instant Records", desc: "Digital proof of delivery and load verification." },
    ],
  },
  "mills": {
    title: "Mills",
    subtitle: "Who We Serve",
    description: "Receive error-free load information with improved visibility to inbound trucks while maintaining compliance and streamlining operations.",
    image: "/images/timber-mill.png",
    features: [
      { icon: Factory, title: "Inbound Visibility", desc: "See what trucks are coming and when they'll arrive." },
      { icon: ScanLine, title: "Scale Integration", desc: "Automatic scale ticket reading and verification." },
      { icon: ShieldCheck, title: "Quality Control", desc: "Verify load data matches orders and specifications." },
    ],
  },
  "case-studies": {
    title: "Case Studies",
    subtitle: "Resources",
    description: "See how forestry companies across North America are using PCT to transform their operations.",
    image: "/images/forest-bg.png",
    features: [
      { icon: BookOpen, title: "Real Results", desc: "Learn how companies saved time and reduced errors." },
      { icon: Trees, title: "Industry Insights", desc: "Best practices from leading forestry operations." },
      { icon: Eye, title: "ROI Stories", desc: "See the measurable impact of going digital." },
    ],
  },
  "blog": {
    title: "Blog",
    subtitle: "Resources",
    description: "Product updates, features, and thoughts on the timber industry from the PCT team.",
    image: "/images/stacked-logs.png",
    features: [
      { icon: Newspaper, title: "Product Updates", desc: "Stay up to date with the latest PCT features." },
      { icon: Trees, title: "Industry News", desc: "Insights and analysis on the forestry sector." },
      { icon: BookOpen, title: "Best Practices", desc: "Tips and guides for optimizing your operations." },
    ],
  },
  "integrations": {
    title: "Integrations",
    subtitle: "Resources",
    description: "PCT integrates with the tools you already use. Connect your workflow and keep your data flowing.",
    image: "/images/app-devices.png",
    features: [
      { icon: Puzzle, title: "Trimble LIMS", desc: "Export trip tickets and job reports into LIMS seamlessly." },
      { icon: Puzzle, title: "Caribou", desc: "Connect your forestry operations with Caribou Software." },
      { icon: Puzzle, title: "Custom API", desc: "Build custom integrations with the PCT Developer API." },
    ],
  },
  "faq": {
    title: "FAQ",
    subtitle: "Resources",
    description: "Frequently asked questions about PCT, pricing, setup, and how it works.",
    image: "/images/field-worker.png",
    features: [
      { icon: HelpCircle, title: "Getting Started", desc: "Everything you need to know to get up and running." },
      { icon: ShieldCheck, title: "Security", desc: "How we protect your data and ensure privacy." },
      { icon: Truck, title: "Field Use", desc: "How PCT works in the cab, on the landing, and at the mill." },
    ],
  },
};

export default function GenericPage() {
  const [, params1] = useRoute("/solutions/:slug");
  const [, params2] = useRoute("/who-we-serve/:slug");
  const [, params3] = useRoute("/resources/:slug");

  const slug = params1?.slug || params2?.slug || params3?.slug || "";
  const data = pageData[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
          <Link href="/"><Button variant="default" className="bg-orange-600 border-orange-600 text-white">Back to Home</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid={`page-${slug}`}>
      <Header />
      <main className="pt-16">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.image})` }} />
          <div className="absolute inset-0 bg-neutral-900/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold tracking-wider uppercase text-orange-400 mb-3 block">{data.subtitle}</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-page-title">
                {data.title}
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl">{data.description}</p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button variant="default" size="lg" className="bg-orange-600 border-orange-600 text-white font-semibold" data-testid="button-page-cta">
                    Talk to an Expert <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.features.map((feature, i) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}>
                  <Card className="p-6 h-full" data-testid={`card-feature-${i}`}>
                    <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              Join 1,200+ forestry professionals who trust PCT for their digital operations.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button variant="default" size="lg" className="bg-orange-600 border-orange-600 text-white font-semibold" data-testid="button-cta-bottom">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="font-semibold" data-testid="button-back-home">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
