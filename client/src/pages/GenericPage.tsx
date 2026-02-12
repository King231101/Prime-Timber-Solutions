import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Trees, Truck, Factory, FileText, Eye, ShieldCheck, ScanLine, Package, BookOpen, Newspaper, Puzzle, HelpCircle, MessageSquare, BarChart3, DollarSign, Globe, Lock, ClipboardCheck, Receipt, Radio, Users, Award } from "lucide-react";

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
  "harvest-management": {
    title: "Harvest Management",
    subtitle: "Solutions",
    description: "Plan, execute, and monitor harvest operations from a single platform. Coordinate loggers, truckers, and mills with real-time data and digital workflows.",
    image: "/images/forest-bg.png",
    features: [
      { icon: Trees, title: "Harvest Planning", desc: "Create detailed harvest plans with maps, boundaries, and production targets." },
      { icon: Eye, title: "Live Monitoring", desc: "Track harvest progress in real time across all active sites." },
      { icon: Users, title: "Team Coordination", desc: "Assign crews, manage schedules, and communicate changes instantly." },
    ],
  },
  "communications": {
    title: "Communications",
    subtitle: "Solutions",
    description: "Keep everyone in the loop with built-in messaging, notifications, and alerts. No more missed calls or lost messages between the field and the office.",
    image: "/images/app-devices.png",
    features: [
      { icon: MessageSquare, title: "In-App Messaging", desc: "Send messages directly to crews, drivers, and mill contacts." },
      { icon: Radio, title: "Real-Time Alerts", desc: "Push notifications for load status changes, destination updates, and more." },
      { icon: Users, title: "Team Channels", desc: "Organize conversations by harvest area, company, or project." },
    ],
  },
  "settlements": {
    title: "Settlements",
    subtitle: "Solutions",
    description: "Automate payment calculations based on verified load data. Eliminate disputes, reduce errors, and pay your teams faster with transparent settlements.",
    image: "/images/timber-mill.png",
    features: [
      { icon: DollarSign, title: "Auto Calculations", desc: "Settlement amounts calculated automatically from verified load data." },
      { icon: FileText, title: "Transparent Records", desc: "Every payment is backed by traceable, auditable load records." },
      { icon: ClipboardCheck, title: "Dispute Resolution", desc: "Quickly resolve discrepancies with complete load history and timestamps." },
    ],
  },
  "invoicing": {
    title: "Invoicing",
    subtitle: "Solutions",
    description: "Generate professional invoices directly from your load data. Streamline billing with automated calculations and digital delivery to your customers.",
    image: "/images/app-devices.png",
    features: [
      { icon: Receipt, title: "Auto-Generated Invoices", desc: "Create invoices instantly from verified load and settlement data." },
      { icon: DollarSign, title: "Flexible Billing", desc: "Bill by load, by ton, by species, or custom rate structures." },
      { icon: FileText, title: "Digital Delivery", desc: "Send invoices electronically and track payment status in real time." },
    ],
  },
  "reporting": {
    title: "Reporting",
    subtitle: "Solutions",
    description: "Generate comprehensive reports on production, deliveries, compliance, and financials. Get the insights you need to make better decisions.",
    image: "/images/timber-truck.png",
    features: [
      { icon: BarChart3, title: "Custom Reports", desc: "Build reports tailored to your specific operational needs." },
      { icon: FileText, title: "Scheduled Exports", desc: "Automate report generation and delivery on your schedule." },
      { icon: Eye, title: "Visual Dashboards", desc: "See trends, patterns, and KPIs at a glance with interactive charts." },
    ],
  },
  "ai-scale-verification": {
    title: "AI Scale Verification",
    subtitle: "Solutions",
    description: "Use AI-powered tools to automatically verify scale ticket data against load records. Catch errors before they become costly disputes.",
    image: "/images/stacked-logs.png",
    features: [
      { icon: ScanLine, title: "Smart Matching", desc: "AI automatically matches scale data to the correct load tickets." },
      { icon: ShieldCheck, title: "Error Detection", desc: "Flag discrepancies between expected and actual weights instantly." },
      { icon: Eye, title: "Confidence Scoring", desc: "See verification confidence levels for every matched record." },
    ],
  },
  "quota-control": {
    title: "Quota Control",
    subtitle: "Solutions",
    description: "Set and enforce volume quotas by species, destination, or time period. Prevent over-delivery and maintain balanced wood flow across your operations.",
    image: "/images/field-worker.png",
    features: [
      { icon: Package, title: "Volume Limits", desc: "Set quotas by species, grade, destination, or any custom criteria." },
      { icon: Eye, title: "Real-Time Tracking", desc: "Monitor quota consumption in real time as loads are delivered." },
      { icon: ShieldCheck, title: "Auto-Enforcement", desc: "Automatically prevent over-delivery with built-in quota checks." },
    ],
  },
  "analytics": {
    title: "Analytics",
    subtitle: "Solutions",
    description: "Turn your operational data into actionable insights. Analyze trends, optimize routes, and improve efficiency across your entire supply chain.",
    image: "/images/timber-mill.png",
    features: [
      { icon: BarChart3, title: "Trend Analysis", desc: "Identify production trends and seasonal patterns in your data." },
      { icon: Truck, title: "Route Optimization", desc: "Analyze delivery routes to reduce costs and improve efficiency." },
      { icon: Eye, title: "Performance Metrics", desc: "Track KPIs for crews, drivers, and operations over time." },
    ],
  },
  "chain-of-custody": {
    title: "Chain of Custody Reporting",
    subtitle: "Solutions",
    description: "Maintain full chain of custody documentation from stump to mill. Meet FSC, SFI, and PEFC certification requirements with automated tracking.",
    image: "/images/forest-bg.png",
    features: [
      { icon: ShieldCheck, title: "Full Traceability", desc: "Track every load from origin to destination with complete documentation." },
      { icon: FileText, title: "Certification Reports", desc: "Generate FSC, SFI, and PEFC compliant reports in minutes." },
      { icon: Lock, title: "Tamper-Proof Records", desc: "Immutable digital records ensure data integrity for auditors." },
    ],
  },
  "fiber-security": {
    title: "Fiber Security",
    subtitle: "Solutions",
    description: "Protect your fiber supply with advanced verification and tracking. Ensure every load comes from verified, legal sources with complete documentation.",
    image: "/images/stacked-logs.png",
    features: [
      { icon: Lock, title: "Source Verification", desc: "Verify the origin of every load with GPS and documentation checks." },
      { icon: ShieldCheck, title: "Risk Assessment", desc: "Automated risk scoring for supply chain partners and sources." },
      { icon: Globe, title: "Regulatory Compliance", desc: "Meet international fiber security standards and regulations." },
    ],
  },
  "auditing": {
    title: "Auditing",
    subtitle: "Solutions",
    description: "Be audit-ready at all times with complete, organized digital records. Simplify the audit process with one-click report generation and full traceability.",
    image: "/images/timber-truck.png",
    features: [
      { icon: ClipboardCheck, title: "Audit-Ready Data", desc: "All records are organized, timestamped, and instantly accessible." },
      { icon: FileText, title: "One-Click Reports", desc: "Generate comprehensive audit reports with a single click." },
      { icon: Eye, title: "Complete History", desc: "Full audit trail for every transaction, change, and event." },
    ],
  },
  "eudr-data-export": {
    title: "EUDR Data Export",
    subtitle: "Solutions",
    description: "Export your data in formats compliant with the EU Deforestation Regulation. Ensure your timber products meet EUDR requirements for the European market.",
    image: "/images/app-devices.png",
    features: [
      { icon: Globe, title: "EUDR Compliance", desc: "Export data in EUDR-compliant formats for EU market access." },
      { icon: MapPin, title: "Geolocation Data", desc: "Include precise GPS coordinates for harvest origin verification." },
      { icon: ShieldCheck, title: "Due Diligence", desc: "Automated due diligence documentation for regulatory submissions." },
    ],
  },
  "land-owners": {
    title: "Land Owners",
    subtitle: "Who We Serve",
    description: "Stay informed about what's happening on your land. Get real-time visibility into harvest operations, load volumes, and compliance status without being on-site.",
    image: "/images/forest-bg.png",
    features: [
      { icon: Eye, title: "Remote Visibility", desc: "Monitor harvest operations on your land from anywhere." },
      { icon: BarChart3, title: "Volume Reports", desc: "See exactly how much timber is being harvested and delivered." },
      { icon: ShieldCheck, title: "Compliance Assurance", desc: "Verify that operations meet your environmental and contractual standards." },
    ],
  },
  "certification-managers": {
    title: "Certification Managers",
    subtitle: "Who We Serve",
    description: "Streamline certification management with automated chain of custody tracking, audit-ready reports, and real-time compliance monitoring across all operations.",
    image: "/images/timber-mill.png",
    features: [
      { icon: Award, title: "Multi-Standard Support", desc: "Manage FSC, SFI, PEFC, and other certifications in one place." },
      { icon: ClipboardCheck, title: "Audit Preparation", desc: "Generate audit-ready documentation with a single click." },
      { icon: Eye, title: "Compliance Dashboard", desc: "Monitor certification compliance status across all operations in real time." },
    ],
  },
  "platform": {
    title: "The PCT Platform",
    subtitle: "Resources",
    description: "Discover how Prime Cut Timber's all-in-one digital platform is transforming forestry operations. From load tickets to settlements, everything in one place.",
    image: "/images/app-devices.png",
    features: [
      { icon: Package, title: "All-In-One Solution", desc: "Digital tickets, tracking, settlements, and compliance in one platform." },
      { icon: Truck, title: "Offline-First", desc: "Works without internet in the field and syncs automatically when connected." },
      { icon: Users, title: "Built for Teams", desc: "Tools designed for every role: loggers, truckers, land managers, and mills." },
    ],
  },
  "about-us": {
    title: "About Us",
    subtitle: "Resources",
    description: "Prime Cut Timber is on a mission to modernize the forestry industry. Learn about our team, our story, and why we're building the future of timber logistics.",
    image: "/images/forest-bg.png",
    features: [
      { icon: Trees, title: "Our Mission", desc: "Bringing digital innovation to every corner of the forestry industry." },
      { icon: Users, title: "Our Team", desc: "Built by forestry professionals and technology experts who understand your challenges." },
      { icon: Globe, title: "Our Reach", desc: "Serving forestry operations across North America and beyond." },
    ],
  },
  "solutions/integrations": {
    title: "Integrations",
    subtitle: "Solutions",
    description: "Connect PCT with your existing tools and systems. Seamless integrations with accounting software, ERP systems, and forestry management platforms.",
    image: "/images/app-devices.png",
    features: [
      { icon: Puzzle, title: "Accounting Systems", desc: "Export settlement and invoice data directly to QuickBooks, Sage, and more." },
      { icon: Puzzle, title: "ERP Connections", desc: "Integrate with enterprise resource planning systems for unified operations." },
      { icon: Puzzle, title: "Custom API", desc: "Build custom integrations with the PCT Developer API for your unique needs." },
    ],
  },
};

export default function GenericPage() {
  const [, params1] = useRoute("/solutions/:slug");
  const [, params2] = useRoute("/who-we-serve/:slug");
  const [, params3] = useRoute("/resources/:slug");

  const slug = params1?.slug || params2?.slug || params3?.slug || "";
  const prefix = params1 ? "solutions" : params2 ? "who-we-serve" : "resources";
  const fullKey = `${prefix}/${slug}`;
  const data = pageData[fullKey] || pageData[slug];

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
