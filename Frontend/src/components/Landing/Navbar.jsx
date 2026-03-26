import { Link } from 'react-router-dom';
import { MessageSquare, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transition background from 0% to 80% opacity based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(11, 15, 25, 0)', 'rgba(11, 15, 25, 0.8)']
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      style={{ backgroundColor: headerBackground, borderColor: headerBorder, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 bg-gradient-to-br from-[#D500F9] to-[#00E5FF] rounded-[14px] flex items-center justify-center neon-magenta group-hover:neon-cyan transition-all duration-300"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Aetheri
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium relative group tracking-tight"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D500F9] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium relative group tracking-tight"
            >
              Platform
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D500F9] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium hidden sm:block tracking-tight"
            >
              Login
            </Link>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                to="/register"
                className="hidden sm:inline-flex px-8 py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-[20px] font-bold text-[15px] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(213,0,249,0.5)] hover:scale-[1.02] transition-all duration-300 border border-white/20 tracking-tight"
              >
                Try Now
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl absolute w-full"
        >
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#features" 
              className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </a>
            <Link
              to="/login"
              className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-full font-semibold text-center shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Now
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
