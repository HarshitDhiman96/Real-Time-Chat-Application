import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  padding = 'md',
  ...props 
}) => {
  const baseStyles = 'glass-dark rounded-2xl backdrop-blur-xl border border-white/10';
  
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverStyles = hover 
    ? 'hover:bg-white/5 hover:border-white/20 hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1' 
    : '';
  
  const glowStyles = glow ? 'shadow-glow-md' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
