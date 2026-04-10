import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { authAPI } from '../utils/api';
import FunZoneWhiteboard from '../components/Auth/FunZoneWhiteboard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      const response = await authAPI.register(formData.name, formData.email, formData.password);
      if (response.message) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main ref={container} className="flex min-h-screen bg-surface font-body text-on-surface">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 sm:left-12 z-[100] auth-left-content">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low/80 hover:bg-surface-container-low text-on-surface lg:bg-white/10 lg:hover:bg-white/20 lg:text-white backdrop-blur-xl border border-outline-variant/30 lg:border-white/20 rounded-full font-headline text-sm font-bold shadow-sm transition-all hover:pr-5 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>
      </div>

      {/* Left Side: Fun Zone Canvas */}
      <section className="hidden lg:block w-1/2 relative bg-[#0B0F19]">
        <FunZoneWhiteboard />
      </section>

      {/* Right Side: Register Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-24 bg-surface-container-lowest">
        <div className="w-full max-w-md auth-form">
          {/* Brand Logo */}
          <div className="mb-12">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/fluxchat_logo.png" alt="FluxChat Logo" className="w-8 h-8 object-cover rounded-lg group-hover:scale-105 transition-transform" />
              <span className="font-headline text-2xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">FluxChat</span>
            </Link>
            <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Create an account</h1>
            <p className="text-on-surface-variant font-body mt-2">Sign up to start chatting right away.</p>
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
                  placeholder="Choose a username" 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-xl font-body text-on-surface placeholder:text-outline focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your email" 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-xl font-body text-on-surface placeholder:text-outline focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label text-sm font-semibold text-on-surface-variant ml-1" htmlFor="password">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="Create a password" 
                  minLength={6}
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-12 text-center text-on-surface-variant font-body">
            Already have an account? 
            <Link className="font-bold text-primary hover:text-primary-dim ml-1 underline underline-offset-4 decoration-primary/30" to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
