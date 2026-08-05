import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, MessageCircle, Send, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up instantly with your username. No credit card required, completely free.',
    image: '/how_auth.png',
  },
  {
    icon: MessageCircle,
    title: 'Join Chat Room',
    description: 'Enter the main room or create your own space. Connect with people instantly.',
    image: '/how_landing.png',
  },
  {
    icon: Send,
    title: 'Start Messaging',
    description: 'Send real-time messages, share ideas, and engage with your community.',
    image: '/how_chat.png',
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 bg-[#f8f3ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[20px] bg-white/45 border border-black mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#5d4da4]" />
            <span className="text-sm font-headline font-bold text-black">Simple &amp; Fast</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-5 text-black">
            How It Works
          </h2>
          <p className="text-lg text-[#5e5b68] max-w-2xl mx-auto leading-relaxed">
            Three simple steps to join the conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-3 relative pl-9">
            <div className="absolute left-[19px] top-8 bottom-8 w-px bg-black/55" />

            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`relative w-full flex items-start gap-5 p-5 text-left rounded-[20px] border transition-colors duration-200 ${isActive ? 'bg-white/55 border-black shadow-sm' : 'border-transparent hover:bg-white/35'}`}
                >
                  <span className={`absolute -left-9 top-8 w-5 h-5 rounded-full border-[3px] border-[#f8f3ff] ${isActive ? 'bg-[#00c65a]' : 'bg-[#d9d0f4]'}`} />
                  <span className={`w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center border border-black ${isActive ? 'bg-[#e9e0ff] text-black' : 'bg-white/50 text-[#5e5b68]'}`}>
                    <StepIcon className="w-6 h-6" />
                  </span>
                  <span className="flex-1 pt-1">
                    <span className={`block text-xl font-bold font-headline mb-1 ${isActive ? 'text-black' : 'text-[#5e5b68]'}`}>
                      {step.title}
                    </span>
                    <span className="block text-[#5e5b68] text-[15px] leading-relaxed">
                      {step.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative aspect-square max-h-[500px] mx-auto w-full rounded-[20px] bg-white/45 p-3 border border-black shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-[14px] border border-black"
              />
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#e9e0ff] text-black rounded-[20px] font-headline font-bold shadow-sm hover:bg-[#ded1ff] transition-colors border border-black"
          >
            Start Chatting Now
            <Send className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
