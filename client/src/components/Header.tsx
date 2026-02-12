import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const solutionsColumns = [
  {
    heading: "HARVEST OPS",
    items: [
      { label: "Digital Tickets", href: "/solutions/digital-trip-tickets" },
      { label: "Harvest Management", href: "/solutions/harvest-management" },
      { label: "Communications", href: "/solutions/communications" },
      { label: "Scale Slip OCR", href: "/solutions/scale-ticket-ocr" },
    ],
  },
  {
    heading: "FINANCE",
    items: [
      { label: "Settlements", href: "/solutions/settlements" },
      { label: "Integrations", href: "/solutions/integrations" },
      { label: "Invoicing", href: "/solutions/invoicing" },
    ],
  },
  {
    heading: "INTELLIGENCE",
    items: [
      { label: "Reporting", href: "/solutions/reporting" },
      { label: "AI Scale Verification", href: "/solutions/ai-scale-verification" },
      { label: "Quota Control", href: "/solutions/quota-control" },
      { label: "Analytics", href: "/solutions/analytics" },
    ],
  },
  {
    heading: "SECURITY & COMPLIANCE",
    items: [
      { label: "Chain of Custody Reporting", href: "/solutions/chain-of-custody" },
      { label: "Fiber Security", href: "/solutions/fiber-security" },
      { label: "Auditing", href: "/solutions/auditing" },
      { label: "EUDR Data Export", href: "/solutions/eudr-data-export" },
    ],
  },
];

const solutionsMobileItems = solutionsColumns.flatMap((col) =>
  col.items.map((item) => ({ label: item.label, href: item.href, desc: "" }))
);

const whoWeServeItems = [
  { label: "Land Owners", href: "/who-we-serve/land-owners", desc: "" },
  { label: "Land Managers", href: "/who-we-serve/land-managers", desc: "" },
  { label: "Loggers", href: "/who-we-serve/loggers", desc: "" },
  { label: "Truckers", href: "/who-we-serve/truckers", desc: "" },
  { label: "Mills", href: "/who-we-serve/mills", desc: "" },
  { label: "Certification Managers", href: "/who-we-serve/certification-managers", desc: "" },
];

const resourcesItems = [
  { label: "Platform", href: "/resources/platform", desc: "" },
  { label: "Case Studies", href: "/resources/case-studies", desc: "" },
  { label: "Integrations", href: "/resources/integrations", desc: "" },
  { label: "About Us", href: "/resources/about-us", desc: "" },
  { label: "FAQ's", href: "/resources/faq", desc: "" },
];

function SolutionsMegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
      className="fixed top-[4.5rem] bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 overflow-hidden"
      style={{ width: "min(56rem, calc(100vw - 2rem))", left: "50%", transform: "translateX(-50%)" }}
      data-testid="solutions-mega-menu"
    >
      <div className="bg-neutral-900 dark:bg-neutral-800 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-lg font-extrabold text-orange-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            PRIME CUT TIMBER
          </span>
          <span className="text-sm text-neutral-300">The Forestry Platform For All</span>
        </div>
        <Link href="/resources/platform">
          <Button
            variant="default"
            className="bg-orange-600 border-orange-600 text-white font-semibold rounded-md"
            onClick={onClose}
            data-testid="button-discover-platform"
          >
            Discover the Platform
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-0 px-6 py-6">
        {solutionsColumns.map((col) => (
          <div key={col.heading}>
            <div className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mb-3">
              {col.heading}
            </div>
            <div className="space-y-1">
              {col.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    onClick={onClose}
                    data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleDropdownMenu({ items, isOpen, onClose }: { items: typeof whoWeServeItems; isOpen: boolean; onClose: () => void }) {
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
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-lg z-50 py-3 overflow-hidden"
      data-testid="dropdown-menu"
    >
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div
            className="px-5 py-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            onClick={onClose}
            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {item.label}
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
            <div className="flex items-center gap-2.5 cursor-pointer" data-testid="logo">
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3L4 9v12h16V9l-8-6z" />
                  <path d="M12 3v6" />
                  <path d="M8 21V13h8v8" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  PRIME CUT
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-orange-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  TIMBER
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" data-testid="desktop-nav">
            <div className="relative">
              <button
                className={navLinkClass}
                onClick={() => toggleDropdown("solutions")}
                data-testid="nav-solutions"
              >
                Solutions <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>
              <SolutionsMegaMenu isOpen={activeDropdown === "solutions"} onClose={() => setActiveDropdown(null)} />
            </div>

            <div className="relative">
              <button
                className={navLinkClass}
                onClick={() => toggleDropdown("who-we-serve")}
                data-testid="nav-who-we-serve"
              >
                Who We Serve <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "who-we-serve" ? "rotate-180" : ""}`} />
              </button>
              <SimpleDropdownMenu items={whoWeServeItems} isOpen={activeDropdown === "who-we-serve"} onClose={() => setActiveDropdown(null)} />
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
              <SimpleDropdownMenu items={resourcesItems} isOpen={activeDropdown === "resources"} onClose={() => setActiveDropdown(null)} />
            </div>

            <Link href="/contact">
              <span className={navLinkClass} data-testid="nav-contact">Contact</span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-wrap">
            <a href="tel:+14078135384" className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300" data-testid="phone-link">
              <Phone className="w-4 h-4 text-orange-500" />
              (407) 813-5384
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
            <MobileDropdown label="Solutions" items={solutionsMobileItems} />
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
              <a href="tel:+14078135384" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-orange-500" />
                (407) 813-5384
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

function MobileDropdown({ label, items }: { label: string; items: { label: string; href: string; desc: string }[] }) {
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
