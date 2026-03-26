import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chat from '../components/Chat/Chat';
import { getAuthToken, removeAuthToken } from "../utils/api";
import Loader from '../components/ui/Loader';

const ChatPage = () => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get auth data from localStorage
    const storedToken = getAuthToken();
    const storedName = localStorage.getItem('userName');
    
    if (storedToken && storedName) {
      setToken(storedToken);
      setUserName(storedName);
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  if (!userName || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader size="lg" variant="pulse" text="Loading chat..." />
        </motion.div>
      </div>
    );
  }

  return <Chat userName={userName} token={token} onLogout={handleLogout} />;
};

export default ChatPage;
