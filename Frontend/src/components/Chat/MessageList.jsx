import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const prevMessageCount = useRef(messages.length);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  // Check if user is scrolled to bottom
  const checkIfAtBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    
    const threshold = 50; // pixels from bottom
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    return scrollHeight - scrollTop - clientHeight <= threshold;
  };

  // Smooth scroll to bottom using GSAP
  const scrollToBottom = (immediate = false) => {
    const container = messagesContainerRef.current;
    const target = messagesEndRef.current;
    
    if (!container || !target) return;
    
    if (immediate) {
      container.scrollTop = container.scrollHeight;
      return;
    }
    
    // Calculate scroll distance
    const scrollDistance = container.scrollHeight - container.clientHeight - container.scrollTop;
    
    // Only animate if there's significant distance to scroll
    if (scrollDistance > 100) {
      // Premium smooth scroll with GSAP
      gsap.to(container, {
        scrollTop: container.scrollHeight,
        duration: 0.8,
        ease: "power4.out",
        overwrite: true
      });
    } else if (scrollDistance > 0) {
      // Short quick scroll for small distances
      gsap.to(container, {
        scrollTop: container.scrollHeight,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });
    }
  };

  // Handle scroll events to track user position
  const handleScroll = () => {
    setIsUserAtBottom(checkIfAtBottom());
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // New message arrived
    if (messages.length > prevMessageCount.current) {
      // Show indicator if new message and user scrolled up
      if (!isUserAtBottom) {
        setShowNewMessageIndicator(true);
        setTimeout(() => setShowNewMessageIndicator(false), 3000);
      }
      
      // Auto-scroll only if user was at bottom or it's their own message
      if (isUserAtBottom) {
        scrollToBottom(false);
      }
      
      prevMessageCount.current = messages.length;
    }
  }, [messages, typingUsers, isUserAtBottom]);

  // Scroll to bottom button for when user has scrolled up
  const handleJumpToBottom = () => {
    scrollToBottom(false);
    setShowNewMessageIndicator(false);
  };

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-12 custom-scrollbar bg-transparent relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Messages */}
        <div className="flex flex-col justify-end min-h-full">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              currentUser={currentUser}
            />
          ))}

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <div className="px-5 py-3 bg-surface-container-high rounded-[20px] rounded-bl-sm border border-outline-variant/30 shadow-sm backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDuration: '0.6s', animationDelay: '0s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-primary-dim animate-bounce"
                      style={{ animationDuration: '0.6s', animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-tertiary animate-bounce"
                      style={{ animationDuration: '0.6s', animationDelay: '0.4s' }}
                    />
                  </div>
                  <span className="text-[13px] text-on-surface-variant font-semibold tracking-tight">
                    {typingUsers.length === 1 
                      ? `${typingUsers[0]} is typing...`
                      : `${typingUsers.join(', ')} are typing...`
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Scroll to Bottom Button / New Message Indicator */}
      {!isUserAtBottom && showNewMessageIndicator && (
        <button
          onClick={handleJumpToBottom}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[100] 
                     px-6 py-3 bg-primary backdrop-blur-xl 
                     border border-primary-dim rounded-full 
                     text-on-primary font-bold text-[13px] tracking-tight
                     shadow-md hover:shadow-lg hover:bg-primary-dim
                     transition-all duration-300 hover:scale-105
                     flex items-center gap-2 will-animate cursor-pointer"
        >
          <span>New message</span>
          <svg 
            className="w-4 h-4 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MessageList;
