import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { authAPI, setAuthToken } from '../../utils/api';
import './Chat.css';

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
  const messagesEndRef = useRef(null);
  const welcomeShownRef = useRef(false);

  useEffect(() => {
    // Ensure token is set in API headers
    if (token) {
      setAuthToken(token);
    }

    // Connect to socket.io server
    // Use environment variable for Socket URL, fallback to deployed backend
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://real-time-chat-application-hxoe.onrender.com';
    
    const newSocket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
      withCredentials: true,
      transports: ['websocket', 'polling'], // Ensure both transports are available
    });

    // Join the chat with username
    newSocket.emit('join', userName);

    // Listen for user list updates
    newSocket.on('userList', (userList) => {
      // Ensure the current user is always in the list
      const allUsers = Array.isArray(userList) ? [...userList] : [];
      if (!allUsers.includes(userName)) {
        allUsers.push(userName);
      }
      setUsers(allUsers);
      
      // Add welcome message when user list is first received (only once)
      if (!welcomeShownRef.current && allUsers.length > 0) {
        welcomeShownRef.current = true;
        const welcomeMessage = {
          type: 'system',
          text: `Welcome to the chat room, ${userName}!`,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    });

    // Listen for user joined events
    newSocket.on('userJoined', (joinedUserName) => {
      // Create a system message for user joining
      const systemMessage = {
        type: 'system',
        text: `${joinedUserName} has joined the chat room`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    // Listen for user left events
    newSocket.on('userLeft', (leftUserName) => {
      // Create a system message for user leaving
      const systemMessage = {
        type: 'system',
        text: `${leftUserName} has left the chat room`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    // Listen for chat messages
    newSocket.on('chatMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing events
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

    // Listen for stop typing events
    newSocket.on('userStopTyping', (data) => {
      setTypingUsers((prev) => prev.filter((u) => u !== data.userName));
    });

    setSocket(newSocket);

    // Handle page reload/unload - disconnect socket
    const handleBeforeUnload = () => {
      if (newSocket && newSocket.connected) {
        newSocket.disconnect();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (newSocket && newSocket.connected) {
        newSocket.disconnect();
      }
      newSocket.close();
    };
  }, [userName, token]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

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

    // Validation
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
      setPasswordError(
        err.response?.data?.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.close();
    }
    onLogout();
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>Online Users</h2>
          <div className="user-count">{users.length}</div>
        </div>
        <UserList users={users} currentUser={userName} />
        <button 
          onClick={() => setShowChangePassword(true)} 
          className="change-password-button"
        >
          Change Password
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button 
                className="modal-close" 
                onClick={() => {
                  setShowChangePassword(false);
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordError('');
                  setPasswordSuccess('');
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="change-password-form">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  minLength={6}
                  required
                />
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
              {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="chat-main">
        <div className="chat-header">
          <h1>Chat Room</h1>
          <div className="user-info">
            <span className="user-badge">{userName}</span>
          </div>
        </div>

        <MessageList
          ref={messagesEndRef}
          messages={messages}
          currentUser={userName}
          typingUsers={typingUsers}
        />

        <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
      </div>
    </div>
  );
};

export default Chat;

