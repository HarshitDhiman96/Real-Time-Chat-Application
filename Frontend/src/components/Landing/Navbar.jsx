import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/fluxchat_logo.png" alt="FluxChat Logo" className="w-10 h-10 object-cover rounded-[14px]" />
            <span className="text-xl font-bold tracking-tighter text-indigo-700 font-headline">FluxChat</span>
          </Link>
          
          <div className="hidden md:flex gap-6 font-headline text-sm font-semibold tracking-tight">
            <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="text-on-surface-variant hover:text-primary transition-colors duration-200">How it works</a>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <Link to="/login" className="hidden sm:block font-headline text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors duration-200">
            Login
          </Link>
          
          <Link to="/register" className="hidden sm:block bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-2.5 rounded-full font-headline text-sm font-semibold tracking-tight hover:opacity-90 scale-95 active:scale-90 transition-all shadow-md">
            Get Started
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl absolute w-full transition-colors duration-300">
          <div className="px-6 py-6 space-y-4 font-headline">
            <a href="#features" onClick={closeMobileMenu} className="block text-on-surface-variant hover:text-primary font-semibold py-2">Features</a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="block text-on-surface-variant hover:text-primary font-semibold py-2">How it works</a>
            <Link to="/login" className="block text-on-surface-variant hover:text-primary font-semibold py-2">Login</Link>
            <Link to="/register" className="block px-6 py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full font-semibold text-center shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
