import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';
import { authAPI } from '../utils/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Profile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  // Attempting to retrieve email from local storage or placeholder
  const userEmail = localStorage.getItem('userEmail') || `${userName.toLowerCase()}@fluxchat.app`;
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  useGSAP(() => {
    gsap.from('.profile-container', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    });
    
    gsap.from('.stagger-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    });
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.changePassword(userName, newPassword);
      if (response.success) {
        setSuccess('Password updated successfully!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(response.message || 'Failed to change password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center pt-24 px-4 font-body">
      <div className="absolute top-6 left-6 z-10 w-full">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 px-4 py-2 bg-surface-container-low/50 hover:bg-surface-container-low text-on-surface backdrop-blur-xl border border-outline-variant/30 rounded-full font-headline text-sm font-bold shadow-sm transition-all hover:pr-5 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Previous Page</span>
        </button>
      </div>

      <div className="w-full max-w-2xl profile-container bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] shadow-2xl relative overflow-hidden">
        {/* Header background art */}
        <div className="h-40 w-full bg-gradient-to-r from-primary/80 to-tertiary/80 relative">
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-8 pb-10">
          {/* Avatar overlap */}
          <div className="stagger-item -mt-16 mb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative">
              <img 
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userName}&backgroundColor=transparent`} 
                alt="Profile Avatar" 
                className="w-32 h-32 rounded-full border-4 border-surface bg-surface-container-high object-cover shadow-xl"
              />
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-dim transition-colors border-2 border-surface shrink-0">
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </button>
            </div>
            <div className="pb-2 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold font-headline text-on-surface">{userName}</h1>
              <p className="text-on-surface-variant font-medium mt-1 flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="w-4 h-4" /> {userEmail}
              </p>
            </div>
          </div>

          {/* Details & Settings */}
          <div className="space-y-8">
            <div className="stagger-item flex flex-col gap-2">
              <h3 className="text-lg font-bold font-headline text-on-surface border-b border-outline-variant/20 pb-2">Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-surface-container-low p-4 rounded-[16px] border border-outline-variant/10">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1 block">Username</span>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-on-surface font-semibold">{userName}</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-[16px] border border-outline-variant/10">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1 block">Status</span>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-400/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-on-surface font-semibold">Active Now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stagger-item flex flex-col gap-4">
              <h3 className="text-lg font-bold font-headline text-on-surface border-b border-outline-variant/20 pb-2 flex items-center gap-2">
                <Lock className="w-5 h-5" /> Security
              </h3>
              
              <form onSubmit={handleChangePassword} className="bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 space-y-4">
                <h4 className="font-semibold text-on-surface">Change Password</h4>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1 ml-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                
                {error && <div className="p-3 bg-error/10 text-error rounded-xl text-sm font-medium">{error}</div>}
                {success && <div className="p-3 bg-tertiary/10 text-tertiary rounded-xl text-sm font-medium">{success}</div>}
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 mt-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-xl shadow-md hover:shadow-primary/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
