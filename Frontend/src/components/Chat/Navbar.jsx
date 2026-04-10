import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Settings, LogOut, Moon, Sun, ArrowLeft } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

const Navbar = ({ onLogout, onSettingsClick }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Profile slot ref for orb ascension targeting
  const profileSlotRef = useRef(null);

  // Magnetic hooks for navigation
  const homeMagnetic = useMagnetic(0.25);
  const messagesMagnetic = useMagnetic(0.25);
  const settingsMagnetic = useMagnetic(0.25);
  const logoutMagnetic = useMagnetic(0.3);
  const themeMagnetic = useMagnetic(0.3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setUserName(localStorage.getItem('userName'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      navigate('/login');
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/20'
          : 'bg-surface/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors group flex items-center justify-center border border-transparent shadow-sm hover:border-outline-variant/20"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <img src="/fluxchat_logo.png" alt="FluxChat Logo" className="w-8 h-8 object-cover rounded-lg group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block">
                <h1 className="font-headline text-2xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">
                  FluxChat
                </h1>
              </div>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-surface-container-low rounded-full px-2 border border-outline-variant/20">
            <button
              ref={homeMagnetic}
              onClick={() => handleNavigation('/')}
              className="group relative px-5 py-2.5 rounded-full hover:bg-surface-container transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 relative z-10">
                <Home className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Home
                </span>
              </div>
            </button>

            <button
              ref={messagesMagnetic}
              onClick={() => handleNavigation('/chat')}
              className="group relative px-5 py-2.5 rounded-full hover:bg-surface-container transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 relative z-10">
                <MessageSquare className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Messages
                </span>
              </div>
            </button>

            <button
              ref={settingsMagnetic}
              onClick={() => {
                if (onSettingsClick) onSettingsClick();
              }}
              className="group relative px-5 py-2.5 rounded-full hover:bg-surface-container transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 relative z-10">
                <Settings className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                  Settings
                </span>
              </div>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* User Info - Desktop */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-[16px] bg-surface-container-low border border-outline-variant/20">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-on-surface font-headline">
                  {userName || 'User'}
                </span>
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              
              {/* PROFILE SLOT */}
              <div
                id="profile-slot"
                ref={profileSlotRef}
                className="relative w-10 h-10 rounded-full bg-primary-container text-on-primary-container shadow-sm flex items-center justify-center select-none"
                title="Profile Avatar"
              >
                <span className="text-lg font-bold">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>

            {/* Logout Button - Mobile/Tablet */}
            <button
              ref={logoutMagnetic}
              onClick={handleLogoutClick}
              className="lg:hidden group relative p-3 rounded-xl hover:bg-error/10 transition-all border border-transparent"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-on-surface-variant group-hover:text-error transition-colors" />
            </button>
          </div>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-surface-container-low backdrop-blur-2xl border border-outline-variant/30 rounded-[24px] shadow-2xl max-w-sm w-full p-6 relative overflow-hidden">
            <h2 className="text-xl font-extrabold text-on-surface mb-3 font-headline">Confirm Logout</h2>
            <p className="text-on-surface-variant font-medium mb-6">Are you sure you want to securely log out of your sanctuary?</p>
            <div className="flex gap-4">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-3 bg-surface hover:bg-surface-container-high text-on-surface rounded-xl font-bold tracking-tight transition-all border border-outline-variant/20"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-3 bg-error text-on-error hover:bg-error/90 rounded-xl font-bold tracking-tight transition-all shadow-sm"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
