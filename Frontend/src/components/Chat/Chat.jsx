import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatSidebar from './ChatSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Navbar from './Navbar';
import { authAPI, setAuthToken } from '../../utils/api';

const Chat = ({ userName, token, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    // Theme handling
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Ensure token is set in API headers
    if (token) {
      setAuthToken(token);
    }

    // Connect to socket.io server
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://real-time-chat-application-hxoe.onrender.com';
    
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    newSocket.emit('join', userName);

    newSocket.on('userList', (userList) => {
      const allUsers = Array.isArray(userList) ? [...userList] : [];
      if (!allUsers.includes(userName)) {
        allUsers.push(userName);
      }
      setUsers(allUsers);
      
      if (allUsers.length > 0 && messages.length === 0) {
        const welcomeMessage = {
          type: 'system',
          text: `Welcome to the chat room, ${userName}!`,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    });

    newSocket.on('userJoined', (joinedUserName) => {
      const systemMessage = {
        type: 'system',
        text: `${joinedUserName} has joined the chat room`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    newSocket.on('userLeft', (leftUserName) => {
      const systemMessage = {
        type: 'system',
        text: `${leftUserName} has left the chat room`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    newSocket.on('chatMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('userTyping', (data) => {
      if (data.userName !== userName) {
        setTypingUsers((prev) => {
          if (!prev.includes(data.userName)) {
            return [...prev, data.userName];
          }
          return prev;
        });
      }
    });

    newSocket.on('userStopTyping', (data) => {
      setTypingUsers((prev) => prev.filter((u) => u !== data.userName));
    });

    setSocket(newSocket);

    const handleBeforeUnload = () => {
      if (newSocket && newSocket.connected) {
        newSocket.disconnect();
      }
    };

    // Close mobile sidebar event listener
    const handleCloseSidebar = () => setShowMobileSidebar(false);
    window.addEventListener('close-sidebar', handleCloseSidebar);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('close-sidebar', handleCloseSidebar);
      if (newSocket && newSocket.connected) {
        newSocket.disconnect();
      }
      newSocket.close();
    };
  }, [userName, token]);

  const sendMessage = (text) => {
    if (socket && text.trim()) {
      const message = {
        userName,
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      socket.emit('chatMessage', message);
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      if (isTyping) {
        socket.emit('typing', { userName });
      } else {
        socket.emit('stopTyping', { userName });
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await authAPI.changePassword(userName, newPassword);
      if (response.success) {
        setPasswordSuccess('Password changed successfully!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setShowChangePassword(false);
          setPasswordSuccess('');
        }, 2000);
      } else {
        setPasswordError(response.message || 'Failed to change password');
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-deep-space relative pt-20">
      <Navbar 
        onLogout={onLogout} 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
      />
      
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md z-40 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
      
      <div className={`fixed md:relative z-50 transition-transform duration-300 ${
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <ChatSidebar 
          users={users} 
          currentUser={userName} 
          onLogout={onLogout}
          onChangePassword={() => setShowChangePassword(true)}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-[calc(100vh-5rem)] overflow-hidden">
        <MessageList
          messages={messages}
          currentUser={userName}
          typingUsers={typingUsers}
        />
        <div className="flex-shrink-0 z-10 w-full relative">
          <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
        </div>
      </div>

      {showChangePassword && (
        <div className="fixed inset-0 bg-[#0B0F19]/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-[#151D33]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full p-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60px] bg-gradient-to-r from-transparent via-[#D500F9]/20 to-transparent blur-[20px] pointer-events-none" />
            
            <h2 className="text-2xl font-extrabold text-white mb-8 tracking-tight">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-tight">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  minLength={6}
                  required
                  className="w-full px-5 py-3.5 rounded-[16px] border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 transition-all font-medium tracking-tight"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-tight">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  minLength={6}
                  required
                  className="w-full px-5 py-3.5 rounded-[16px] border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#D500F9] focus:outline-none focus:ring-1 focus:ring-[#D500F9]/50 transition-all font-medium tracking-tight"
                />
              </div>
              {passwordError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-[16px] text-sm font-medium tracking-tight">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-500/10 border border-green-500/20 text-[#00E5FF] px-5 py-3 rounded-[16px] text-sm font-medium tracking-tight">
                  {passwordSuccess}
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                  className="flex-1 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-[16px] font-bold tracking-tight transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-5 py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-[16px] font-bold tracking-tight shadow-[0_0_15px_rgba(213,0,249,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? 'Changing...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
