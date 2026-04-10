import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MessageBubble = ({ message, currentUser }) => {
  const bubbleRef = useRef(null);
  const usernameRef = useRef(null);
  const isOwnMessage = message.userName === currentUser;
  const isSystemMessage = message.type === 'system';

  useEffect(() => {
    if (!bubbleRef.current) return;

    // Animate message bubble on mount
    if (isSystemMessage) {
      // System messages: subtle scale and fade
      gsap.fromTo(bubbleRef.current,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6,
          ease: "power3.out"
        }
      );
    } else {
      // Regular messages: spring animation with bounce
      gsap.fromTo(bubbleRef.current,
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 20 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: isOwnMessage ? 0 : 0.05 // Slight delay for incoming messages
        }
      );

      // Animate username if not own message
      if (usernameRef.current && !isOwnMessage) {
        gsap.fromTo(usernameRef.current,
          { opacity: 0, x: -10 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1
          }
        );
      }
    }
  }, [isOwnMessage, isSystemMessage]);

  if (isSystemMessage) {
    return (
      <div ref={bubbleRef} className="flex justify-center my-6">
        <div className="px-5 py-2 bg-surface-container-low border border-outline-variant/20 rounded-full text-on-surface-variant text-[13px] font-medium shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={bubbleRef}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-6 will-animate`}
    >
      <div className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${isOwnMessage ? 'order-1' : 'order-2'}`}>
        {/* Username */}
        {!isOwnMessage && (
          <div 
            ref={usernameRef}
            className="text-[13px] font-semibold text-on-surface-variant mb-1.5 ml-1 tracking-tight"
          >
            {message.userName}
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={`px-6 py-4 shadow-sm transition-all will-animate font-body ${
            isOwnMessage
              ? 'bg-primary text-on-primary rounded-[20px] rounded-br-sm'
              : 'bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-[20px] rounded-bl-sm hover:bg-surface-variant'
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words tracking-tight">
            {message.text}
          </p>
        </div>

        {/* Timestamp */}
        <div className={`text-[11px] font-medium text-on-surface-variant/70 mt-2 ${isOwnMessage ? 'text-right mr-2' : 'ml-2'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
