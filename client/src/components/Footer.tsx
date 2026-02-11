import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-extrabold text-orange-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                PRIME CUT TIMBER
              </span>
              <span className="text-[9px] font-bold tracking-widest text-orange-400/70 bg-orange-900/30 px-1 py-0.5 rounded-md">
                PCT
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Digital load tickets built for forestry at scale. Real-time visibility, audit-ready compliance, and control across every load.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/solutions/digital-trip-tickets"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-digital-tickets">Digital Trip Tickets</span></Link></li>
              <li><Link href="/solutions/supply-chain"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-supply-chain">Supply Chain Visibility</span></Link></li>
              <li><Link href="/solutions/compliance"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-compliance">Compliance & Reporting</span></Link></li>
              <li><Link href="/solutions/scale-ticket-ocr"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-ocr">Scale Ticket OCR</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Who We Serve</h4>
            <ul className="space-y-2">
              <li><Link href="/who-we-serve/land-managers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-land-managers">Land Managers</span></Link></li>
              <li><Link href="/who-we-serve/loggers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-loggers">Loggers</span></Link></li>
              <li><Link href="/who-we-serve/truckers"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-truckers">Truckers</span></Link></li>
              <li><Link href="/who-we-serve/mills"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-mills">Mills</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/pricing"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-pricing">Pricing</span></Link></li>
              <li><Link href="/contact"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-contact">Contact</span></Link></li>
              <li><Link href="/resources/blog"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-blog">Blog</span></Link></li>
              <li><Link href="/resources/case-studies"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-case-studies">Case Studies</span></Link></li>
              <li><Link href="/login"><span className="text-sm text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer" data-testid="footer-link-login">Login</span></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Prime Cut Timber. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-300" data-testid="link-privacy">Privacy Policy</span>
            <span className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-300" data-testid="link-terms">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
