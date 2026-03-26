import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, LogIn } from 'lucide-react';
import { authAPI, setAuthToken } from '../utils/api';
import OrbAscension from '../components/Auth/OrbAscension';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

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
        
        // Trigger orb ascension animation
        setShowOrb(true);
        
        // Navigate after animation completes
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
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D500F9]/10 rounded-full filter blur-[120px]" />
      </div>
        
      {/* Orb Ascension Animation */}
      {showOrb && <OrbAscension onComplete={() => console.log('Orb ascension complete')} />}
        
      {/* Login Card */}
      <div className="relative z-10 max-w-[500px] w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00E5FF] to-[#D500F9] rounded-[20px] flex items-center justify-center shadow-[0_0_20px_rgba(213,0,249,0.4)]">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
              ChatApp
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card rounded-[32px] p-10 sm:p-12 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <LogIn className="w-10 h-10 text-[#00E5FF]" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Welcome Back!
            </h2>
            <p className="text-gray-400 text-[17px]">
              Sign in to continue chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[15px] font-semibold text-gray-300 mb-3 tracking-wide">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="w-full px-5 py-4 rounded-[16px] border border-white/10 bg-[#151D33]/50 text-white text-[17px] focus:border-[#00E5FF] focus:ring-4 focus:ring-[#00E5FF]/20 transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[15px] font-semibold text-gray-300 mb-3 tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength={6}
                className="w-full px-5 py-4 rounded-[16px] border border-white/10 bg-[#151D33]/50 text-white text-[17px] focus:border-[#00E5FF] focus:ring-4 focus:ring-[#00E5FF]/20 transition-all outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-3.5 rounded-[12px] text-[15px] font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 mt-4 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-[20px] font-bold text-lg hover:shadow-[0_0_25px_rgba(213,0,249,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-tight"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-[16px]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#00E5FF] font-bold hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
