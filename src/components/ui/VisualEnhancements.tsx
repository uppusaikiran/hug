import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 6, 
  className = "" 
}: FloatingElementProps) => (
  <motion.div
    className={`animate-float ${className}`}
    animate={{ y: [-5, 5, -5] }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {children}
  </motion.div>
);

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowingCard = ({ 
  children, 
  className = "",
  glowColor = "primary-500"
}: GlowingCardProps) => (
  <motion.div
    className={`card-glass relative ${className}`}
    whileHover={{ 
      scale: 1.02,
      boxShadow: `0 0 30px rgba(var(--color-${glowColor}), 0.3)`
    }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground = ({ className = "" }: AnimatedBackgroundProps) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <motion.div
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-200/20 to-accent-200/20 rounded-full blur-3xl"
      animate={{ 
        x: [0, 50, 0], 
        y: [0, -30, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"
      animate={{ 
        x: [0, -40, 0], 
        y: [0, 20, 0],
        scale: [1, 0.8, 1]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-accent-200/15 to-secondary-200/15 rounded-full blur-3xl"
      animate={{ 
        x: [0, 30, 0], 
        y: [0, -25, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

interface PulsingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  pulseColor?: string;
}

export const PulsingButton = ({ 
  children, 
  onClick, 
  className = "",
  pulseColor = "primary-500"
}: PulsingButtonProps) => (
  <motion.button
    className={`relative overflow-hidden ${className}`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r from-${pulseColor} to-accent-500 opacity-75`}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.button>
);

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
}

export const ShimmerText = ({ children, className = "" }: ShimmerTextProps) => (
  <motion.div
    className={`bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent animate-shimmer ${className}`}
    style={{ backgroundSize: '200% 100%' }}
  >
    {children}
  </motion.div>
);

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

export const ParticleField = ({ particleCount = 20, className = "" }: ParticleFieldProps) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {Array.from({ length: particleCount }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
}

export const GradientBorder = ({ 
  children, 
  className = "",
  borderWidth = 2
}: GradientBorderProps) => (
  <div className={`relative ${className}`}>
    <div 
      className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-2xl"
      style={{ padding: `${borderWidth}px` }}
    >
      <div className="bg-white rounded-2xl h-full w-full">
        {children}
      </div>
    </div>
  </div>
); 