import { motion } from 'framer-motion';

const GlowEffect = ({ 
  color = 'purple', 
  size = 'md', 
  position = 'center',
  blur = true,
  className = '',
  animate = true 
}) => {
  const colors = {
    purple: 'from-purple-600 to-indigo-600',
    blue: 'from-blue-600 to-cyan-600',
    cyan: 'from-cyan-500 to-blue-500',
    pink: 'from-pink-600 to-rose-600',
  };

  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  };

  const blurStyles = blur ? 'filter blur-3xl' : '';
  const opacityStyles = 'opacity-30';

  if (animate) {
    return (
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute ${sizes[size]} ${positions[position]} ${blurStyles} ${opacityStyles} bg-gradient-to-r ${colors[color]} rounded-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute ${sizes[size]} ${positions[position]} ${blurStyles} ${opacityStyles} bg-gradient-to-r ${colors[color]} rounded-full ${className}`}
    />
  );
};

export default GlowEffect;
