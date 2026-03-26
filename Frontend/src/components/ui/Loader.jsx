import { motion } from 'framer-motion';

const Loader = ({ size = 'md', variant = 'spinner', text = '' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`${sizes[size]} rounded-full bg-gradient-to-r from-purple-600 to-indigo-600`}
          style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm font-medium"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
          />
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizes[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full`}
        style={{ borderTopColor: '#a855f7' }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
