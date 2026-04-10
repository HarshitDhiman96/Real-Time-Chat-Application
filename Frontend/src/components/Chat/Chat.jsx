import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatSidebar from './ChatSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Navbar from './Navbar';
import { authAPI, setAuthToken } from '../../utils/api';

const Chat = ({ userName, token, onLogout }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [socket, setSocket] = useState(null);
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

    // Close/Open mobile sidebar event listeners
    const handleCloseSidebar = () => setShowMobileSidebar(false);
    const handleOpenSidebar = () => setShowMobileSidebar(true);
    window.addEventListener('close-sidebar', handleCloseSidebar);
    window.addEventListener('open-sidebar', handleOpenSidebar);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('close-sidebar', handleCloseSidebar);
      window.removeEventListener('open-sidebar', handleOpenSidebar);
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
    <div className="flex min-h-screen bg-surface relative pt-20">
      <Navbar 
        onLogout={onLogout} 
        onSettingsClick={() => navigate('/profile')}
      />
      
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-surface-container-highest/80 backdrop-blur-md z-40 md:hidden"
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
          onChangePassword={() => navigate('/profile')}
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
    </div>
  );
};

export default Chat;
