import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "You'll receive our product updates." });
      setEmail("");
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-orange-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3L4 9v12h16V9l-8-6z" />
                  <path d="M12 3v6" />
                  <path d="M8 21V13h8v8" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-extrabold tracking-tight text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  PRIME CUT
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-orange-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  TIMBER
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              The Forestry Platform that Benefits the Entire Supply Chain.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <a href="tel:+14078135384" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors" data-testid="footer-phone">
                (407) 813-5384
              </a>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <a href="mailto:support@primecuttimber.com" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors" data-testid="footer-email">
                support@primecuttimber.com
              </a>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-orange-500" />
              <a href="mailto:sales@primecuttimber.com" className="text-sm text-neutral-400 hover:text-orange-400 transition-colors" data-testid="footer-email-sales">
                sales@primecuttimber.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-neutral-400 hover:text-orange-400 transition-colors" data-testid="footer-facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-orange-400 transition-colors" data-testid="footer-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Who We Serve</h4>
            <ul className="space-y-2">
              <li><Link href="/who-we-serve/land-owners"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-land-owners">Land Owners</span></Link></li>
              <li><Link href="/who-we-serve/land-managers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-land-managers">Land Managers</span></Link></li>
              <li><Link href="/who-we-serve/loggers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-loggers">Loggers</span></Link></li>
              <li><Link href="/who-we-serve/truckers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-truckers">Truckers</span></Link></li>
              <li><Link href="/who-we-serve/mills"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-mills">Mills</span></Link></li>
              <li><Link href="/who-we-serve/certification-managers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-certification-managers">Certification Managers</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Our Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/solutions/scale-ticket-ocr"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Scale Slip OCR</span></Link></li>
              <li><Link href="/solutions/communications"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Communications</span></Link></li>
              <li><Link href="/solutions/auditing"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Auditing</span></Link></li>
              <li><Link href="/solutions/invoicing"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Invoicing</span></Link></li>
              <li><Link href="/solutions/fiber-security"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Fiber Security</span></Link></li>
              <li><Link href="/solutions/ai-scale-verification"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">AI Scale Verification</span></Link></li>
              <li><Link href="/solutions/quota-control"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Quota Control</span></Link></li>
            </ul>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider invisible">Solutions</h4>
                <ul className="space-y-2">
                  <li><Link href="/solutions/chain-of-custody"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Chain of Custody Reporting</span></Link></li>
                  <li><Link href="/solutions/eudr-data-export"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">EUDR Data Export</span></Link></li>
                  <li><Link href="/solutions/reporting"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Reporting</span></Link></li>
                  <li><Link href="/solutions/analytics"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Analytics</span></Link></li>
                  <li><Link href="/solutions/settlements"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Settlements</span></Link></li>
                  <li><Link href="/solutions/integrations"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Integrations</span></Link></li>
                  <li><Link href="/solutions/harvest-management"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Harvest Management</span></Link></li>
                  <li><Link href="/solutions/digital-trip-tickets"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer">Digital Tickets</span></Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/resources/about-us"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-about">About us</span></Link></li>
                  <li><Link href="/resources/case-studies"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-case-studies">Case Studies</span></Link></li>
                  <li><Link href="/contact"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-book-demo">Book a Demo</span></Link></li>
                  <li><Link href="/pricing"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-pricing">Pricing</span></Link></li>
                  <li><Link href="/resources/integrations"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-integrations">Integrations</span></Link></li>
                  <li><Link href="/resources/faq"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-faq">FAQ's</span></Link></li>
                  <li><Link href="/contact"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-contact">Contact Us</span></Link></li>
                  <li><Link href="/login"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-login">Login</span></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-newsletter-heading">
              Subscribe to our newsletter to get product updates.
            </h3>
            <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 w-full lg:w-64"
                required
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                variant="default"
                className="bg-orange-600 border-orange-600 text-white font-semibold whitespace-nowrap"
                data-testid="button-newsletter-signup"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} Prime Cut Timber, Inc.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-300" data-testid="link-terms">Terms and conditions</span>
              <span className="text-xs text-neutral-500">|</span>
              <span className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-300" data-testid="link-privacy">Privacy policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
