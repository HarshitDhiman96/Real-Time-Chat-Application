import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, LogIn, ArrowLeft } from 'lucide-react';
import { authAPI, setAuthToken } from '../utils/api';
import OrbAscension from '../components/Auth/OrbAscension';
import FunZoneWhiteboard from '../components/Auth/FunZoneWhiteboard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const container = useRef();

  useGSAP(() => {
    gsap.from('.auth-left-content > *', {
      x: -30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
    gsap.from('.auth-form > *', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2
    });
  }, { scope: container });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.name, formData.password);
      if (response.success) {
        setAuthToken(response.accesstoken);
        localStorage.setItem('userName', formData.name);
        
        setShowOrb(true);
        
        setTimeout(() => {
          navigate('/chat');
        }, 2000);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main ref={container} className="flex min-h-screen bg-surface font-body text-on-surface">
      {showOrb && <OrbAscension onComplete={() => console.log('Orb ascension complete')} />}
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 sm:left-12 z-[100] auth-left-content">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low/50 hover:bg-surface-container-low text-on-surface backdrop-blur-xl border border-outline-variant/30 rounded-full font-headline text-sm font-bold shadow-sm transition-all hover:pr-5 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>
      </div>
      
      {/* Left Side: Fun Zone Canvas */}
      <section className="hidden lg:block w-1/2 relative bg-[#0B0F19]">
        <FunZoneWhiteboard />
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-24 bg-surface-container-lowest">
        <div className="w-full max-w-md auth-form">
          {/* Brand Logo */}
          <div className="mb-12">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/fluxchat_logo.png" alt="FluxChat Logo" className="w-8 h-8 object-cover rounded-lg group-hover:scale-105 transition-transform" />
              <span className="font-headline text-2xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">FluxChat</span>
            </Link>
            <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Welcome back</h1>
            <p className="text-on-surface-variant font-body mt-2">Log in to your sanctuary to continue.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label text-sm font-semibold text-on-surface-variant ml-1" htmlFor="name">Username</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your username" 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-xl font-body text-on-surface placeholder:text-outline focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block font-label text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                <a className="font-label text-xs font-bold text-primary hover:text-primary-dim transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-transparent rounded-xl font-body text-on-surface placeholder:text-outline focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl text-sm font-medium text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-12 text-center text-on-surface-variant font-body">
            Don't have an account? 
            <Link className="font-bold text-primary hover:text-primary-dim ml-1 underline underline-offset-4 decoration-primary/30" to="/register">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
