import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

const Navbar = ({ onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Profile slot ref for orb ascension targeting
  const profileSlotRef = useRef(null);

  // Magnetic hooks for navigation links
  const homeMagnetic = useMagnetic(0.25);
  const messagesMagnetic = useMagnetic(0.25);
  const settingsMagnetic = useMagnetic(0.25);
  const logoutMagnetic = useMagnetic(0.3);
  const themeMagnetic = useMagnetic(0.3);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      navigate('/login');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-light backdrop-blur-md shadow-lg shadow-black/20'
          : 'glass-light backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigation('/')}
          >
            <div className="relative w-12 h-12 bg-gradient-to-br from-accent-cyan via-accent-purple to-accent-magenta rounded-2xl flex items-center justify-center shadow-glow-md group-hover:shadow-glow-lg transition-all duration-500 will-animate">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text tracking-tight">
                ChatApp
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Real-time Communication
              </p>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Home Link */}
            <button
              ref={homeMagnetic}
              onClick={() => handleNavigation('/')}
              className="group relative px-5 py-2.5 rounded-xl glass-dark border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 will-animate overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-2.5 relative z-10">
                <Home className="w-4 h-4 text-gray-400 group-hover:text-accent-cyan transition-colors duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  Home
                </span>
              </div>
            </button>

            {/* Messages Link */}
            <button
              ref={messagesMagnetic}
              onClick={() => handleNavigation('/chat')}
              className="group relative px-5 py-2.5 rounded-xl glass-dark border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 will-animate overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-2.5 relative z-10">
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-accent-cyan transition-colors duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  Messages
                </span>
              </div>
            </button>

            {/* Settings Link */}
            <button
              ref={settingsMagnetic}
              onClick={() => handleNavigation('/settings')}
              className="group relative px-5 py-2.5 rounded-xl glass-dark border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 will-animate overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-2.5 relative z-10">
                <Settings className="w-4 h-4 text-gray-400 group-hover:text-accent-cyan transition-colors duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  Settings
                </span>
              </div>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              ref={themeMagnetic}
              onClick={() => toggleDarkMode(!darkMode)}
              className="group relative p-3 rounded-xl glass-dark border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 will-animate"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-400 group-hover:text-accent-cyan transition-colors duration-300" />
              )}
            </button>

            {/* User Info - Desktop */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl glass-dark border border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-white">
                  {userName || 'User'}
                </span>
                <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              
              {/* PROFILE SLOT - Target for Orb Ascension */}
              <div
                id="profile-slot"
                ref={profileSlotRef}
                className="relative w-10 h-10 rounded-full border-2 border-accent-cyan/50 hover:border-accent-cyan transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-accent-cyan/10 to-accent-magenta/10 will-animate cursor-pointer overflow-hidden"
                onClick={handleLogout}
                title="Click to logout"
              >
                {/* Initial letter avatar */}
                <span className="text-lg font-bold gradient-text">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </span>
                
                {/* Glow ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/0 hover:border-accent-cyan/60 transition-all duration-500" />
                
                {/* Particle glow */}
                <div className="absolute inset-0 rounded-full bg-accent-cyan/5 blur-md" />
              </div>
            </div>

            {/* Logout Button - Mobile/Tablet */}
            <button
              ref={logoutMagnetic}
              onClick={handleLogout}
              className="lg:hidden group relative p-3 rounded-xl glass-dark border border-white/5 hover:border-red-500/30 transition-all duration-300 will-animate"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Border Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent opacity-50" />
    </nav>
  );
};

export default Navbar;
