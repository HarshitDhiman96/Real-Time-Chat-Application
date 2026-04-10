import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Paperclip } from 'lucide-react';

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      onTyping(true);
    } else {
      onTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 bg-transparent"
    >
      <form
        onSubmit={handleSubmit}
        className={`backdrop-blur-2xl border transition-all duration-300 rounded-full mx-auto max-w-5xl ${
          isFocused 
            ? 'bg-surface-container border-primary/50 shadow-md ring-2 ring-primary/20' 
            : 'bg-surface-container-lowest/80 border-outline-variant/30 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 p-2">
          {/* File Upload Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </motion.button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-transparent text-on-surface placeholder:text-outline focus:outline-none text-[15px] font-body tracking-tight"
            />
          </div>

          {/* Emoji Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all"
            title="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!message.trim()}
            whileHover={{ scale: message.trim() ? 1.05 : 1 }}
            whileTap={{ scale: message.trim() ? 0.95 : 1 }}
            className="p-3.5 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mr-1"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default MessageInput;
