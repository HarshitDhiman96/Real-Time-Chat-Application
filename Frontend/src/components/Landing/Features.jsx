import { motion } from 'framer-motion';
import { Zap, Users, MessageSquare, Clock, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Intelligence',
    description: 'Instant intelligence and network vocabulary neural intelligence.',
    gradient: 'from-[#00E5FF] to-[#D500F9]',
    glowColor: '0, 229, 255',
  },
  {
    icon: Users,
    title: 'Multilingual Support',
    description: 'Introduce the unseen powers to multilingual supports.',
    gradient: 'from-[#651FFF] to-[#00E5FF]',
    glowColor: '101, 31, 255',
  },
  {
    icon: MessageSquare,
    title: 'Contextual Memory',
    description: 'Contextual flow chatbot assessment and reactive interactions.',
    gradient: 'from-[#D500F9] to-[#651FFF]',
    glowColor: '213, 0, 249',
  },
  {
    icon: Clock,
    title: 'Zero Latency',
    description: 'Quantum-grade speed with seamless WebSocket connectivity.',
    gradient: 'from-[#00E5FF] to-[#651FFF]',
    glowColor: '0, 229, 255',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption with advanced JWT authentication.',
    gradient: 'from-[#651FFF] to-[#D500F9]',
    glowColor: '101, 31, 255',
  },
  {
    icon: Sparkles,
    title: 'Expressive UI',
    description: 'Premium glassmorphism and stunning visual feedback.',
    gradient: 'from-[#D500F9] to-[#00E5FF]',
    glowColor: '213, 0, 249',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(213, 0, 249, 0.3) 1px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 text-center mx-auto max-w-4xl"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white">
            Platform <br className="md:hidden" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D500F9] to-[#00E5FF] ml-0 md:ml-4">
              Capabilities
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-tight max-w-2xl mx-auto">
            Everything you need for seamless, modern communication wrapped in a premium UI layer.
          </p>
        </motion.div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] gap-8">
          {features.map((feature, index) => {
            const isLarge = index === 0 || index === 3 || index === 4;
            const spanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -5, scale: 0.98 }}
                className={`group relative ${spanClass}`}
              >
                {/* Neon Hover Glow Underneath */}
                <div 
                  className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: `rgba(${feature.glowColor}, 0.5)` }}
                />

                {/* Glass Card */}
                <div className="glass-card rounded-[32px] p-10 border border-white/10 h-full transition-all duration-500 overflow-hidden relative z-10 flex flex-col justify-between group-hover:border-white/40 group-hover:bg-[#151D33]/80">
                  {/* Subtle Corner Gradient */}
                  <div className={`absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl`} />
                  
                  <div className="relative z-20 flex justify-between items-start">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-[20px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="relative z-20 mt-auto pt-8">
                    <h3 className="text-3xl font-extrabold mb-3 text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-[17px] max-w-sm tracking-tight group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
