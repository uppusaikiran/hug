import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Heart, Sparkles, Sun, Moon, Wind, Waves, Flower, Rainbow, Star, Smile } from 'lucide-react';

interface WarmGlowProps {
  children: ReactNode;
  color?: 'pink' | 'purple' | 'blue' | 'green' | 'yellow';
  intensity?: 'soft' | 'medium' | 'bright';
  className?: string;
}

export const WarmGlow = ({ 
  children, 
  color = 'pink', 
  intensity = 'medium',
  className = ""
}: WarmGlowProps) => {
  const colorMap = {
    pink: 'from-pink-400/20 to-rose-400/20',
    purple: 'from-purple-400/20 to-violet-400/20',
    blue: 'from-blue-400/20 to-cyan-400/20',
    green: 'from-green-400/20 to-emerald-400/20',
    yellow: 'from-yellow-400/20 to-amber-400/20'
  };

  const intensityMap = {
    soft: 'blur-lg',
    medium: 'blur-xl',
    bright: 'blur-2xl'
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`absolute -inset-6 bg-gradient-to-br ${colorMap[color]} rounded-full ${intensityMap[intensity]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface CareRippleProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CareRipple = ({ 
  size = 100, 
  color = 'pink-400',
  className = ""
}: CareRippleProps) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute inset-0 border-2 border-${color}/30 rounded-full`}
        animate={{
          scale: [0, 2],
          opacity: [0.8, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.6,
          ease: "easeOut"
        }}
      />
    ))}
    <div className={`absolute inset-4 bg-${color}/20 rounded-full flex items-center justify-center`}>
      <Heart className={`text-${color} w-6 h-6`} />
    </div>
  </div>
);

interface EmotionalPulseProps {
  children: ReactNode;
  emotion?: 'love' | 'care' | 'comfort' | 'hope' | 'peace';
  className?: string;
}

export const EmotionalPulse = ({ 
  children, 
  emotion = 'love',
  className = ""
}: EmotionalPulseProps) => {
  const emotionColors = {
    love: 'shadow-pink-200/50',
    care: 'shadow-purple-200/50',
    comfort: 'shadow-blue-200/50',
    hope: 'shadow-yellow-200/50',
    peace: 'shadow-green-200/50'
  };

  return (
    <motion.div
      className={`${emotionColors[emotion]} ${className}`}
      animate={{
        boxShadow: [
          '0 0 20px rgba(0,0,0,0.1)',
          '0 0 40px rgba(0,0,0,0.2)',
          '0 0 20px rgba(0,0,0,0.1)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface HugEmbraceBorderProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export const HugEmbraceBorder = ({ 
  children, 
  className = "",
  animated = true
}: HugEmbraceBorderProps) => (
  <div className={`relative p-1 ${className}`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-pink-400 rounded-2xl"
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      } : {}}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ backgroundSize: '300% 300%' }}
    />
    <div className="relative bg-white rounded-2xl p-4">
      {children}
    </div>
  </div>
);

interface ComfortingIconProps {
  icon: 'heart' | 'hug' | 'sparkle' | 'sun' | 'moon' | 'flower';
  size?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

export const ComfortingIcon = ({ 
  icon, 
  size = 24, 
  color = 'pink-500',
  animated = true,
  className = ""
}: ComfortingIconProps) => {
  const iconMap = {
    heart: Heart,
    hug: Heart, // Using Heart as placeholder for hug
    sparkle: Sparkles,
    sun: Sun,
    moon: Moon,
    flower: Flower
  };

  const Icon = iconMap[icon];

  return (
    <motion.div
      className={`text-${color} ${className}`}
      animate={animated ? {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

interface SoftBubbleProps {
  children: ReactNode;
  color?: 'pink' | 'purple' | 'blue' | 'green';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const SoftBubble = ({ 
  children, 
  color = 'pink',
  size = 'medium',
  className = ""
}: SoftBubbleProps) => {
  const colorMap = {
    pink: 'bg-pink-100/80 border-pink-200/50',
    purple: 'bg-purple-100/80 border-purple-200/50',
    blue: 'bg-blue-100/80 border-blue-200/50',
    green: 'bg-green-100/80 border-green-200/50'
  };

  const sizeMap = {
    small: 'p-2 text-sm',
    medium: 'p-4 text-base',
    large: 'p-6 text-lg'
  };

  return (
    <motion.div
      className={`${colorMap[color]} ${sizeMap[size]} rounded-full border backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

interface GentleWaveProps {
  className?: string;
  height?: number;
}

export const GentleWave = ({ className = "", height = 60 }: GentleWaveProps) => (
  <div className={`relative overflow-hidden ${className}`} style={{ height }}>
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
        fill="rgba(236, 72, 153, 0.1)"
        animate={{
          d: [
            "M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z",
            "M0,60 C300,20 900,100 1200,60 L1200,120 L0,120 Z",
            "M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </div>
);

interface LovingMessageBubbleProps {
  message: string;
  author?: string;
  className?: string;
}

export const LovingMessageBubble = ({ 
  message, 
  author = "HUG",
  className = ""
}: LovingMessageBubbleProps) => (
  <motion.div
    className={`bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-4 shadow-lg backdrop-blur-sm ${className}`}
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start gap-3">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="text-pink-500 w-6 h-6 flex-shrink-0 mt-1" />
      </motion.div>
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed mb-2">{message}</p>
        <p className="text-pink-600 text-sm font-medium">— {author}</p>
      </div>
    </div>
  </motion.div>
);

interface CareIndicatorProps {
  level: 'low' | 'medium' | 'high';
  label?: string;
  className?: string;
}

export const CareIndicator = ({ 
  level, 
  label = "Care Level",
  className = ""
}: CareIndicatorProps) => {
  const levelConfig = {
    low: { color: 'blue', width: '33%', hearts: 1 },
    medium: { color: 'purple', width: '66%', hearts: 2 },
    high: { color: 'pink', width: '100%', hearts: 3 }
  };

  const config = levelConfig[level];

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={i < config.hearts ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            >
              <Heart 
                className={`w-4 h-4 ${
                  i < config.hearts 
                    ? `text-${config.color}-500 fill-current` 
                    : 'text-gray-300'
                }`} 
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className={`h-2 bg-gradient-to-r from-${config.color}-400 to-${config.color}-500 rounded-full`}
          initial={{ width: '0%' }}
          animate={{ width: config.width }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default {
  WarmGlow,
  CareRipple,
  EmotionalPulse,
  HugEmbraceBorder,
  ComfortingIcon,
  SoftBubble,
  GentleWave,
  LovingMessageBubble,
  CareIndicator
}; 