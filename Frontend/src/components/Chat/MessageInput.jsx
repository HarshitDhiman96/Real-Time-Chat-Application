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
      className="p-4"
    >
      <form
        onSubmit={handleSubmit}
        className={`glass-dark backdrop-blur-xl border border-white/10 rounded-[32px] mx-auto max-w-5xl transition-all duration-300 ${
          isFocused ? 'shadow-[0_0_30px_rgba(0,229,255,0.15)] border-[#00E5FF]/40 bg-[#151D33]/90' : 'shadow-lg bg-[#0E1424]/90'
        }`}
      >
        <div className="flex items-center gap-3 p-2">
          {/* File Upload Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
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
              className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-[15px] tracking-tight"
            />
          </div>

          {/* Emoji Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-gray-400 hover:text-[#00E5FF] hover:bg-white/5 rounded-full transition-all"
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
            className="p-3.5 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-full shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(213,0,249,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mr-1"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default MessageInput;
