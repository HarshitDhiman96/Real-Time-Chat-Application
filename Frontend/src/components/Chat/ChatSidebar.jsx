import { motion } from 'framer-motion';
import { Users, LogOut, Key, X } from 'lucide-react';

const ChatSidebar = ({ users, currentUser, onLogout, onChangePassword }) => {
  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-72 bg-[#0B0F19]/80 backdrop-blur-3xl border-r border-white/10 flex flex-col h-[calc(100vh-5rem)] flex-shrink-0 hidden md:flex"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-br from-[#651FFF] to-[#00E5FF] rounded-[12px] flex items-center justify-center shadow-[0_0_15px_rgba(101,31,255,0.4)]"
            >
              <Users className="w-5 h-5 text-white" />
            </motion.div>
            <h2 className="text-[17px] font-extrabold text-white tracking-tight">
              Online Users
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gradient-to-r from-[#D500F9] to-[#651FFF] text-white text-[11px] font-bold rounded-full shadow-[0_0_10px_rgba(213,0,249,0.3)]">
              {users.length}
            </span>
            {/* Close button for mobile */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('close-sidebar'))}
              className="md:hidden p-1.5 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white"
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
              whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className={`flex items-center gap-3 p-3 rounded-[16px] transition-all cursor-pointer group ${
                user === currentUser
                  ? 'bg-[#151D33]/80 border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#651FFF] to-[#D500F9] rounded-[12px] flex items-center justify-center text-white font-extrabold text-sm shadow-lg group-hover:shadow-[0_0_15px_rgba(213,0,249,0.4)] transition-all duration-300">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00E5FF] border-[3px] border-[#0B0F19] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-[14px] tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {user}
                </div>
                {user === currentUser && (
                  <div className="text-[11px] text-[#00E5FF] font-semibold tracking-wide">
                    YOU
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onChangePassword}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-gray-200 hover:text-white rounded-[16px] font-bold tracking-tight transition-all border border-white/10"
        >
          <Key className="w-4 h-4 text-[#D500F9]" />
          Change Password
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,59,48,0.15)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-gray-200 hover:text-[#FF453A] rounded-[16px] font-bold tracking-tight transition-all border border-white/10 hover:border-[#FF453A]/30"
        >
          <LogOut className="w-4 h-4 text-[#FF453A]" />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;
