import { motion } from 'framer-motion';
import { Users, LogOut, Key, X } from 'lucide-react';

const ChatSidebar = ({ users, currentUser, onLogout, onChangePassword }) => {
  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-72 bg-surface border-r border-outline-variant/20 flex flex-col h-[calc(100vh-5rem)] flex-shrink-0 hidden md:flex"
    >
      {/* Header */}
      <div className="p-6 border-b border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-primary-container rounded-[12px] flex items-center justify-center text-on-primary-container"
            >
              <Users className="w-5 h-5" />
            </motion.div>
            <h2 className="text-[17px] font-extrabold text-on-surface font-headline tracking-tight">
              Online Users
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary text-on-primary text-[11px] font-bold rounded-full">
              {users.length}
            </span>
            {/* Close button for mobile */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('close-sidebar'))}
              className="md:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-2">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-[16px] transition-all cursor-pointer group ${
                user === currentUser
                  ? 'bg-surface-container-high border border-outline-variant/30'
                  : 'hover:bg-surface-container-low border border-transparent'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-[12px] flex items-center justify-center text-on-primary font-extrabold text-sm shadow-sm transition-all duration-300">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-tertiary border-[3px] border-surface rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-on-surface text-[14px] tracking-tight truncate group-hover:text-primary transition-all duration-300">
                  {user}
                </div>
                {user === currentUser && (
                  <div className="text-[11px] text-primary font-semibold tracking-wide uppercase">
                    You
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-outline-variant/20 space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onChangePassword}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-low text-on-surface hover:bg-surface-container rounded-[16px] font-bold tracking-tight transition-all border border-transparent"
        >
          <Key className="w-4 h-4 text-primary" />
          Change Password
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-error/10 text-error hover:bg-error/20 rounded-[16px] font-bold tracking-tight transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;
