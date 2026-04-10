import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-outline-variant/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/fluxchat_logo.png" alt="FluxChat Logo" className="w-10 h-10 object-cover rounded-[14px]" />
              <span className="text-xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300 font-headline">FluxChat</span>
            </Link>
            <p className="text-on-surface-variant max-w-sm mb-8">
              A high-end, editorial-inspired communication sanctuary for teams that value clarity and performance.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">link</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h4 className="font-headline font-bold text-on-background mb-6 uppercase tracking-wider text-sm">Product</h4>
            <div className="flex flex-col gap-4">
              <Link to="/features" className="text-on-surface-variant hover:text-primary transition-colors">Features</Link>
              <Link to="/security" className="text-on-surface-variant hover:text-primary transition-colors">Security</Link>
              <Link to="/pricing" className="text-on-surface-variant hover:text-primary transition-colors">Pricing</Link>
            </div>
          </div>

          {/* Links Group 2 */}
          <div>
            <h4 className="font-headline font-bold text-on-background mb-6 uppercase tracking-wider text-sm">Company</h4>
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link>
              <Link to="/careers" className="text-on-surface-variant hover:text-primary transition-colors">Careers</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} FluxChat. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
