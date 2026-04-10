import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, MessageCircle, Send, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up instantly with your username. No credit card required, completely free.',
    gradient: 'from-[#D500F9] to-[#651FFF]',
    glow: 'shadow-[0_0_40px_rgba(213,0,249,0.3)]',
    image: '/how_auth.png'
  },
  {
    icon: MessageCircle,
    title: 'Join Chat Room',
    description: 'Enter the main room or create your own space. Connect with people instantly.',
    gradient: 'from-[#651FFF] to-[#00E5FF]',
    glow: 'shadow-[0_0_40px_rgba(101,31,255,0.3)]',
    image: '/how_landing.png'
  },
  {
    icon: Send,
    title: 'Start Messaging',
    description: 'Send real-time messages, share ideas, and engage with your community.',
    gradient: 'from-[#00E5FF] to-[#D500F9]',
    glow: 'shadow-[0_0_40px_rgba(0,229,255,0.3)]',
    image: '/how_chat.png'
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 bg-[#0B0F19] relative overflow-hidden">
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
          className="text-center mb-16"
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

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-white">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-tight">
            Get started in three simple steps, wrapped in an expressive flow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-center">
          
          {/* Left Column: Vertical Timeline */}
          <div className="space-y-6 relative pl-8">
            <div className="absolute left-[31px] top-10 bottom-10 w-0.5 bg-white/10" />
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-8 p-6 rounded-[24px] cursor-pointer transition-all duration-300 border border-transparent ${activeStep === index ? 'bg-white/5 border-white/10 shadow-lg backdrop-blur-md' : 'hover:bg-white/5'}`}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Connector Node */}
                <div className={`absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#0B0F19] transition-all duration-300 ${activeStep === index ? 'bg-gradient-to-r ' + step.gradient + ' scale-125' : 'bg-white/20'}`} />
                
                <div className={`w-16 h-16 shrink-0 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center transition-all duration-500 ${activeStep === index ? step.glow : 'opacity-50'}`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1 pt-1">
                  <h3 className={`text-2xl font-extrabold mb-2 transition-colors duration-300 ${activeStep === index ? 'text-white' : 'text-gray-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-[16px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Preview Image */}
          <div className="relative h-[500px] w-full rounded-[32px] border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-surface-container-low/20 backdrop-blur-sm z-0"></div>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-[85%] h-[85%] object-cover rounded-2xl shadow-2xl relative z-10 border border-white/10"
              />
            </AnimatePresence>
            
            {/* Glow under image */}
            <div className={`absolute inset-0 bg-gradient-to-r ${steps[activeStep].gradient} opacity-10 blur-3xl -z-10`} />
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-28 text-center relative z-10"
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
