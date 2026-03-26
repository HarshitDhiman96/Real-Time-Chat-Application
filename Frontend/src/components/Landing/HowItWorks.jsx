import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, Send, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up instantly with your username. No credit card required, completely free.',
    gradient: 'from-[#D500F9] to-[#651FFF]',
    glow: 'shadow-[0_0_40px_rgba(213,0,249,0.3)]',
  },
  {
    icon: MessageCircle,
    title: 'Join Chat Room',
    description: 'Enter the main room or create your own space. Connect with people instantly.',
    gradient: 'from-[#651FFF] to-[#00E5FF]',
    glow: 'shadow-[0_0_40px_rgba(101,31,255,0.3)]',
  },
  {
    icon: Send,
    title: 'Start Messaging',
    description: 'Send real-time messages, share ideas, and engage with your community.',
    gradient: 'from-[#00E5FF] to-[#D500F9]',
    glow: 'shadow-[0_0_40px_rgba(0,229,255,0.3)]',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(213, 0, 249, 0.2) 1px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D500F9]/10 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D500F9]" />
            <span className="text-sm font-semibold tracking-tight text-gray-300">Simple & Fast</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter">
            <span className="text-white">
              How It Works
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-tight">
            Get started in three simple steps, wrapped in an expressive flow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center text-center group">
                {/* Step Number Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r ${step.gradient} rounded-[12px] flex items-center justify-center font-extrabold text-white text-lg shadow-lg border border-white/20`}
                >
                  {index + 1}
                </motion.div>

                {/* Icon Container */}
                <div className={`relative w-28 h-28 bg-gradient-to-br ${step.gradient} rounded-[24px] flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 ${step.glow}`}>
                  <step.icon className="w-12 h-12 text-white" />
                  
                  {/* Subtle Ring */}
                  <div className="absolute inset-0 rounded-[24px] border border-white/30 group-hover:scale-[1.05] transition-transform duration-500 opacity-50" />
                </div>

                {/* Content */}
                <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-sm text-[16px] lg:text-[17px] tracking-tight">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-28 text-center"
        >
          <a
            href="/register"
            className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-[24px] font-extrabold text-xl shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_45px_rgba(213,0,249,0.5)] hover:scale-[1.02] transition-all duration-300 tracking-tight border border-white/20"
          >
            Start Chatting Now
            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <p className="mt-8 text-gray-400 text-sm font-medium tracking-wide">
            NO CREDIT CARD REQUIRED • FREE FOREVER • INSTANT SETUP
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
