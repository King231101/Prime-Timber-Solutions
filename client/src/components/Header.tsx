import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const solutionsItems = [
  { label: "Digital Trip Tickets", href: "/solutions/digital-trip-tickets", desc: "Replace paper with real-time digital load tickets" },
  { label: "Supply Chain Visibility", href: "/solutions/supply-chain", desc: "Track every load from stump to mill" },
  { label: "Compliance & Reporting", href: "/solutions/compliance", desc: "Audit-ready reports for FSC, SFI, PEFC" },
  { label: "Scale Ticket OCR", href: "/solutions/scale-ticket-ocr", desc: "Automated scale slip reading and verification" },
  { label: "Inventory Management", href: "/solutions/inventory", desc: "Real-time harvest and inventory tracking" },
];

const whoWeServeItems = [
  { label: "Land Managers", href: "/who-we-serve/land-managers", desc: "Control wood flow and increase visibility" },
  { label: "Loggers", href: "/who-we-serve/loggers", desc: "Track production and inventory in real time" },
  { label: "Truckers", href: "/who-we-serve/truckers", desc: "View loads and verify status across harvests" },
  { label: "Mills", href: "/who-we-serve/mills", desc: "Receive error-free load information" },
];

const resourcesItems = [
  { label: "Case Studies", href: "/resources/case-studies", desc: "See how forestry companies use PCT" },
  { label: "Blog", href: "/resources/blog", desc: "Product updates and industry insights" },
  { label: "Integrations", href: "/resources/integrations", desc: "Connect with your existing workflow" },
  { label: "FAQ", href: "/resources/faq", desc: "Frequently asked questions" },
];

function DropdownMenu({ items, isOpen, onClose }: { items: typeof solutionsItems; isOpen: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-lg z-50 py-2 overflow-hidden"
      data-testid="dropdown-menu"
    >
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div
            className="px-4 py-3 hover-elevate cursor-pointer"
            onClick={onClose}
            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-sm font-semibold text-foreground">{item.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinkClass = "relative flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200 cursor-pointer transition-colors duration-200 hover:text-orange-600 dark:hover:text-orange-400 py-2";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-sm border-b border-neutral-100 dark:border-neutral-800"
          : "bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="logo">
              <span className="text-2xl font-extrabold tracking-tight text-orange-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                PRIME CUT TIMBER
              </span>
              <span className="text-[10px] font-bold tracking-widest text-orange-500/70 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/40">
                PCT
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 flex-wrap" data-testid="desktop-nav">
            <div className="relative">
              <button
                className={navLinkClass}
                onClick={() => toggleDropdown("solutions")}
                data-testid="nav-solutions"
              >
                Solutions <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu items={solutionsItems} isOpen={activeDropdown === "solutions"} onClose={() => setActiveDropdown(null)} />
            </div>

            <div className="relative">
              <button
                className={navLinkClass}
                onClick={() => toggleDropdown("who-we-serve")}
                data-testid="nav-who-we-serve"
              >
                Who We Serve <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "who-we-serve" ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu items={whoWeServeItems} isOpen={activeDropdown === "who-we-serve"} onClose={() => setActiveDropdown(null)} />
            </div>

            <Link href="/pricing">
              <span className={navLinkClass} data-testid="nav-pricing">Pricing</span>
            </Link>

            <div className="relative">
              <button
                className={navLinkClass}
                onClick={() => toggleDropdown("resources")}
                data-testid="nav-resources"
              >
                Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu items={resourcesItems} isOpen={activeDropdown === "resources"} onClose={() => setActiveDropdown(null)} />
            </div>

            <Link href="/contact">
              <span className={navLinkClass} data-testid="nav-contact">Contact</span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-wrap">
            <a href="tel:+19062815000" className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300" data-testid="phone-link">
              <Phone className="w-4 h-4 text-orange-500" />
              (906) 281-5000
            </a>
            <Link href="/contact">
              <Button variant="default" className="bg-orange-600 border-orange-600 text-white font-semibold rounded-md" data-testid="button-talk-expert">
                Talk To An Expert
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="font-semibold rounded-md" data-testid="button-login">
                LOGIN
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-neutral-700 dark:text-neutral-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 shadow-lg" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-1">
            <MobileDropdown label="Solutions" items={solutionsItems} />
            <MobileDropdown label="Who We Serve" items={whoWeServeItems} />
            <Link href="/pricing">
              <div className="py-3 px-3 text-sm font-medium text-neutral-700 dark:text-neutral-200" data-testid="mobile-nav-pricing">
                Pricing
              </div>
            </Link>
            <MobileDropdown label="Resources" items={resourcesItems} />
            <Link href="/contact">
              <div className="py-3 px-3 text-sm font-medium text-neutral-700 dark:text-neutral-200" data-testid="mobile-nav-contact">
                Contact
              </div>
            </Link>
            <div className="pt-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800">
              <a href="tel:+19062815000" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-orange-500" />
                (906) 281-5000
              </a>
              <Link href="/contact">
                <Button variant="default" className="w-full bg-orange-600 border-orange-600 text-white font-semibold" data-testid="mobile-button-expert">
                  Talk To An Expert
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full font-semibold mt-2" data-testid="mobile-button-login">
                  LOGIN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileDropdown({ label, items }: { label: string; items: typeof solutionsItems }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-3 px-3 text-sm font-medium text-neutral-700 dark:text-neutral-200"
        onClick={() => setOpen(!open)}
        data-testid={`mobile-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-4 mb-2 space-y-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="py-2 px-3 text-sm text-neutral-600 dark:text-neutral-300" data-testid={`mobile-dropdown-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
