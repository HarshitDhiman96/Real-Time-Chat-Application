import { motion } from 'framer-motion';
import { MessageCircle, Send, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 20 } }
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19] pt-20">
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(213, 0, 249, 0.25) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Cyber Purple & Electric Blue Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#D500F9] rounded-full filter blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#00E5FF] rounded-full filter blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-left"
          >
            <motion.div
              variants={itemVariant}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm font-semibold tracking-tight text-gray-300">The Future of AI Chat</span>
            </motion.div>

            <motion.h1 variants={itemVariant} className="text-5xl md:text-7xl lg:text-7xl xl:text-[90px] font-extrabold mb-8 leading-[1.05] tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D500F9] to-[#00E5FF]">
                Real-Time
              </span>
              <br />
              <span className="text-white">
                Conversations.
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#D500F9]">
                Zero Delay.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariant} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed tracking-tight">
              Experience lightning-fast messaging with our next-generation visual platform. 
              Beautiful, secure, and built for modern communities.
            </motion.p>

            <motion.div variants={itemVariant} className="flex flex-col sm:flex-row gap-6 mb-16">
              <Link
                to="/register"
                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-[24px] font-extrabold text-xl shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_45px_rgba(213,0,249,0.5)] hover:scale-[1.02] transition-all duration-300 tracking-tight border border-white/20"
              >
                Get Started Free
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-12 py-6 glass-dark text-white rounded-[24px] font-extrabold text-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 tracking-tight border border-white/10 shadow-xl backdrop-blur-3xl"
              >
                View Demo
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-6 max-w-xl">
              {[
                { icon: Zap, title: 'Real-time', desc: 'Instant Delivery', color: 'text-[#00E5FF]' },
                { icon: Shield, title: '100%', desc: 'Secure', color: 'text-[#D500F9]' },
                { icon: MessageCircle, title: 'Free', desc: 'Forever', color: 'text-white' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariant}
                  className="glass-card p-5 rounded-[20px] border border-white/10 relative overflow-hidden group hover:border-white/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <div className="text-3xl font-bold text-white tracking-tighter">{stat.title}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400 relative z-10">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Chat UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
            className="relative hidden lg:block"
          >
            {/* Main Chat Container */}
            <div
              className="glass-card rounded-[32px] border border-white/20 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-3xl"
              style={{ minHeight: '560px' }}
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent blur-[15px]" />
              
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1" />
                <div className="text-sm font-semibold tracking-tight text-gray-300">Aetheri UI</div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-6">
                {/* Message 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-end gap-3"
                >
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#651FFF] to-[#D500F9] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    U
                  </div>
                  <div className="bg-gradient-to-r from-[#651FFF] to-[#D500F9] text-white px-5 py-3.5 rounded-[20px] rounded-tl-sm max-w-xs shadow-glow-md">
                    <p className="text-[15px] tracking-tight">Hey! How does this AI chat work?</p>
                    <p className="text-[11px] opacity-70 mt-1.5 font-medium">10:30 AM</p>
                  </div>
                </motion.div>

                {/* Message 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-end gap-3 justify-end"
                >
                  <div className="glass-card px-5 py-3.5 rounded-[20px] rounded-tr-sm max-w-xs border border-white/10 shadow-md">
                    <p className="text-[15px] tracking-tight text-white">Welcome to the future of messaging! I'm here to help you instantly.</p>
                    <p className="text-[11px] text-gray-400 mt-1.5 font-medium">10:30 AM</p>
                  </div>
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#00E5FF] to-[#D500F9] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    AI
                  </div>
                </motion.div>

                {/* Message 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-end gap-3"
                >
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#651FFF] to-[#D500F9] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    U
                  </div>
                  <div className="bg-gradient-to-r from-[#651FFF] to-[#D500F9] text-white px-5 py-3.5 rounded-[20px] rounded-tl-sm max-w-xs shadow-glow-md">
                    <p className="text-[15px] tracking-tight">This interface is amazing!</p>
                    <p className="text-[11px] opacity-70 mt-1.5 font-medium">10:31 AM</p>
                  </div>
                </motion.div>

                {/* Typing Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-end gap-3 justify-end"
                >
                  <div className="glass-card px-6 py-4 rounded-[20px] rounded-tr-sm border border-white/10">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#D500F9]"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-white"
                      />
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#00E5FF] to-[#D500F9] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    AI
                  </div>
                </motion.div>
              </div>

              {/* Input Area Mockup */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="glass-dark rounded-full border border-white/10 p-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                  <div className="flex-1 h-2 bg-white/10 rounded-full" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#D500F9] flex items-center justify-center shadow-lg">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notifications */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 glass-light backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
                <span className="text-sm font-semibold tracking-tight text-white">Quantum Core Online</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
