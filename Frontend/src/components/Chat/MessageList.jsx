import { forwardRef } from 'react';
import './Chat.css';

const MessageList = forwardRef(({ messages, currentUser, typingUsers }, ref) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => {
        // Handle system messages (join/leave notifications)
        if (message.type === 'system') {
          return (
            <div key={index} className="system-message">
              <span className="system-message-text">{message.text}</span>
            </div>
          );
        }
        
        // Handle regular chat messages
        return (
          <div
            key={index}
            className={`message ${message.userName === currentUser ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="message-username">{message.userName}</span>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="message-content">{message.text}</div>
          </div>
        );
      })}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <div className="typing-loader">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <span className="typing-text">
            {typingUsers.length === 1
              ? `${typingUsers[0]} is typing...`
              : `${typingUsers.length} users are typing...`}
          </span>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;

