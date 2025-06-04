import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Heart, Sparkles, Sun, Moon, Wind, Waves, Flower, Rainbow, Star } from 'lucide-react';

interface HugWaveProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const HugWave = ({ className = "", size = "medium" }: HugWaveProps) => {
  const waveSize = {
    small: "h-16",
    medium: "h-24", 
    large: "h-32"
  };
  
  return (
    <div className={`relative ${waveSize[size]} overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120">
        <path
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill="rgba(236, 72, 153, 0.1)"
        />
        <path
          d="M0,80 C300,40 900,160 1200,80 L1200,120 L0,120 Z"
          fill="rgba(147, 51, 234, 0.1)"
        />
      </svg>
    </div>
  );
};

interface EmotionalAuraProps {
  children: ReactNode;
  emotion?: 'calm' | 'joyful' | 'peaceful' | 'hopeful' | 'comforted';
  intensity?: 'subtle' | 'gentle' | 'warm';
  className?: string;
}

export const EmotionalAura = ({ 
  children, 
  emotion = 'calm', 
  intensity = 'gentle',
  className = ""
}: EmotionalAuraProps) => {
  const auraColors = {
    calm: 'from-blue-200/20 via-cyan-200/20 to-teal-200/20',
    joyful: 'from-yellow-200/20 via-orange-200/20 to-pink-200/20',
    peaceful: 'from-green-200/20 via-emerald-200/20 to-blue-200/20',
    hopeful: 'from-purple-200/20 via-pink-200/20 to-rose-200/20',
    comforted: 'from-amber-200/20 via-orange-200/20 to-red-200/20'
  };

  const intensityScale = {
    subtle: 0.3,
    gentle: 0.5,
    warm: 0.8
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-br ${auraColors[emotion]} rounded-3xl blur-xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [intensityScale[intensity], intensityScale[intensity] * 1.2, intensityScale[intensity]]
        }}
        transition={{
          duration: 4,
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

interface ComfortingHandsProps {
  className?: string;
  size?: number;
}

export const ComfortingHands = ({ className = "", size = 120 }: ComfortingHandsProps) => (
  <motion.div 
    className={`relative ${className}`}
    style={{ width: size, height: size }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute inset-2 bg-gradient-to-br from-rose-200/60 to-pink-200/60 rounded-full flex items-center justify-center"
      animate={{
        scale: [0.9, 1.1, 0.9]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    >
      <motion.div
        animate={{
          y: [-2, 2, -2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="text-rose-600" size={size * 0.3} />
      </motion.div>
    </motion.div>
  </motion.div>
);

interface FloatingEmotionProps {
  emotion: 'love' | 'hope' | 'peace' | 'joy' | 'comfort';
  delay?: number;
  className?: string;
}

export const FloatingEmotion = ({ emotion, delay = 0, className = "" }: FloatingEmotionProps) => {
  const emotionConfig = {
    love: { icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    hope: { icon: Sun, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    peace: { icon: Wind, color: 'text-green-500', bgColor: 'bg-green-100' },
    joy: { icon: Sparkles, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    comfort: { icon: Moon, color: 'text-blue-500', bgColor: 'bg-blue-100' }
  };

  const config = emotionConfig[emotion];
  const Icon = config.icon;

  return (
    <motion.div
      className={`absolute ${config.bgColor} rounded-full p-3 shadow-lg ${className}`}
      initial={{ 
        y: 100, 
        opacity: 0,
        scale: 0.5,
        rotate: 0
      }}
      animate={{ 
        y: [-20, -40, -20], 
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      <Icon className={`${config.color} w-6 h-6`} />
    </motion.div>
  );
};

interface WarmEmbraceBorderProps {
  children: ReactNode;
  className?: string;
  thickness?: number;
}

export const WarmEmbraceBorder = ({ 
  children, 
  className = "",
  thickness = 3
}: WarmEmbraceBorderProps) => (
  <div className={`relative ${className}`} style={{ padding: `${thickness}px` }}>
    <motion.div
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
      animate={{
        background: [
          'linear-gradient(45deg, #f472b6, #a855f7, #3b82f6)',
          'linear-gradient(45deg, #3b82f6, #f472b6, #a855f7)',
          'linear-gradient(45deg, #a855f7, #3b82f6, #f472b6)',
          'linear-gradient(45deg, #f472b6, #a855f7, #3b82f6)'
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <div className="relative bg-white rounded-2xl h-full">
      {children}
    </div>
  </div>
);

interface HeartbeatAnimationProps {
  children: ReactNode;
  className?: string;
  intensity?: 'gentle' | 'normal' | 'strong';
}

export const HeartbeatAnimation = ({ 
  children, 
  className = "",
  intensity = 'normal'
}: HeartbeatAnimationProps) => {
  const intensityConfig = {
    gentle: { scale: [1, 1.02, 1], duration: 3 },
    normal: { scale: [1, 1.05, 1], duration: 2 },
    strong: { scale: [1, 1.08, 1], duration: 1.5 }
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={className}
      animate={{
        scale: config.scale
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface ComfortingMessageProps {
  message: string;
  visible: boolean;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'center';
}

export const ComfortingMessage = ({ 
  message, 
  visible, 
  onClose,
  position = 'top'
}: ComfortingMessageProps) => {
  const positionClasses = {
    top: 'top-4',
    bottom: 'bottom-4',
    center: 'top-1/2 -translate-y-1/2'
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed ${positionClasses[position]} left-1/2 -translate-x-1/2 z-50 max-w-md mx-auto`}
          initial={{ opacity: 0, y: position === 'bottom' ? 20 : -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === 'bottom' ? 20 : -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="text-pink-500 w-6 h-6 flex-shrink-0 mt-0.5" />
              </motion.div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {message}
                </p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CaringParticlesProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
}

export const CaringParticles = ({ 
  particleCount = 15, 
  colors = ['bg-pink-300', 'bg-purple-300', 'bg-blue-300', 'bg-rose-300'],
  className = ""
}: CaringParticlesProps) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {Array.from({ length: particleCount }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-2 h-2 rounded-full ${colors[i % colors.length]}/60`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

interface BreathingIndicatorProps {
  isActive?: boolean;
  size?: number;
  className?: string;
}

export const BreathingIndicator = ({ 
  isActive = true, 
  size = 80,
  className = ""
}: BreathingIndicatorProps) => (
  <motion.div
    className={`relative ${className}`}
    style={{ width: size, height: size }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full"
      animate={isActive ? {
        scale: [1, 1.3, 1],
        opacity: [0.6, 0.9, 0.6]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute inset-2 bg-gradient-to-br from-cyan-200/60 to-blue-200/60 rounded-full flex items-center justify-center"
      animate={isActive ? {
        scale: [0.8, 1.1, 0.8]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="text-blue-600 font-medium text-xs"
        animate={isActive ? {
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Breathe
      </motion.div>
    </motion.div>
  </motion.div>
);

interface CareWaveProps {
  className?: string;
  intensity?: 'gentle' | 'medium' | 'strong';
}

export const CareWave = ({ className = "", intensity = 'medium' }: CareWaveProps) => {
  const intensityConfig = {
    gentle: { height: 'h-12', opacity: 0.3, duration: 8 },
    medium: { height: 'h-16', opacity: 0.4, duration: 6 },
    strong: { height: 'h-20', opacity: 0.5, duration: 4 }
  };
  
  const config = intensityConfig[intensity];
  
  return (
    <div className={`relative ${config.height} overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-300/30 via-rose-300/30 to-purple-300/30"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ backgroundSize: '200% 200%', opacity: config.opacity }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120">
        <path
          d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
          fill="rgba(236, 72, 153, 0.15)"
        />
      </svg>
    </div>
  );
};

interface LovingEmbraceBorderProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: 'soft' | 'warm' | 'bright';
}

export const LovingEmbraceBorder = ({ 
  children, 
  className = "",
  glowIntensity = 'warm'
}: LovingEmbraceBorderProps) => {
  const glowConfig = {
    soft: 'shadow-lg shadow-pink-200/30',
    warm: 'shadow-xl shadow-pink-300/40',
    bright: 'shadow-2xl shadow-pink-400/50'
  };
  
  return (
    <div className={`relative p-1 ${className}`}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 via-purple-400 to-pink-400 rounded-2xl ${glowConfig[glowIntensity]}`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 8,
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
};

interface CompassionateGlowProps {
  children: ReactNode;
  emotion?: 'love' | 'care' | 'comfort' | 'support' | 'warmth';
  className?: string;
}

export const CompassionateGlow = ({ 
  children, 
  emotion = 'love',
  className = ""
}: CompassionateGlowProps) => {
  const emotionGlows = {
    love: 'from-pink-400/20 via-rose-400/20 to-red-400/20',
    care: 'from-purple-400/20 via-violet-400/20 to-indigo-400/20',
    comfort: 'from-blue-400/20 via-cyan-400/20 to-teal-400/20',
    support: 'from-green-400/20 via-emerald-400/20 to-lime-400/20',
    warmth: 'from-yellow-400/20 via-amber-400/20 to-orange-400/20'
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`absolute -inset-8 bg-gradient-radial ${emotionGlows[emotion]} rounded-full blur-2xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 5,
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

interface HeartPulseProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HeartPulse = ({ 
  size = 32, 
  color = 'text-pink-500',
  className = ""
}: HeartPulseProps) => (
  <motion.div className={`${className}`}>
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Heart className={`${color} w-${size/4} h-${size/4}`} size={size} />
    </motion.div>
  </motion.div>
);

interface CareRippleEffectProps {
  trigger?: boolean;
  className?: string;
}

export const CareRippleEffect = ({ 
  trigger = false,
  className = ""
}: CareRippleEffectProps) => (
  <AnimatePresence>
    {trigger && (
      <motion.div
        className={`absolute inset-0 pointer-events-none ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-pink-400/40 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

interface WarmthIndicatorProps {
  level: 'low' | 'medium' | 'high';
  className?: string;
}

export const WarmthIndicator = ({ 
  level,
  className = ""
}: WarmthIndicatorProps) => {
  const levelConfig = {
    low: { bars: 1, color: 'bg-yellow-300', intensity: 0.4 },
    medium: { bars: 2, color: 'bg-orange-400', intensity: 0.6 },
    high: { bars: 3, color: 'bg-red-400', intensity: 0.8 }
  };
  
  const config = levelConfig[level];
  
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-4 rounded-full ${i < config.bars ? config.color : 'bg-gray-200'}`}
          animate={i < config.bars ? {
            opacity: [config.intensity, 1, config.intensity]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

interface SupportingHandsProps {
  className?: string;
  animated?: boolean;
}

export const SupportingHands = ({ 
  className = "",
  animated = true
}: SupportingHandsProps) => (
  <motion.div 
    className={`relative ${className}`}
    animate={animated ? {
      y: [-2, 2, -2]
    } : {}}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="flex items-center justify-center">
      <motion.div
        className="text-4xl"
        animate={animated ? {
          rotate: [-5, 5, -5]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🤗
      </motion.div>
    </div>
  </motion.div>
); 