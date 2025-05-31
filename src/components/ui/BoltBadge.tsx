import { motion } from 'framer-motion';

interface BoltBadgeProps {
  variant?: 'white' | 'black' | 'text';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const BoltBadge = ({ 
  variant = 'white', 
  position = 'top-right',
  className = '' 
}: BoltBadgeProps) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getBadgeContent = () => {
    switch (variant) {
      case 'black':
        return (
          <img 
            src="/black_circle_360x360.png" 
            alt="Built with Bolt.new" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        );
      case 'text':
        return (
          <img 
            src="/black_circle_360x360.png" 
            alt="Built with Bolt.new" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-lg"
          />
        );
      case 'white':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-2 shadow-lg">
            <img 
              src="/white_circle_360x360.png" 
              alt="Built with Bolt.new" 
              className="w-full h-full object-contain"
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-50 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label="Built with Bolt.new"
      >
        <div className={`
          ${variant === 'text' ? 'w-auto h-auto' : 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20'}
          transition-all duration-300 hover:shadow-xl
          ${variant === 'white' ? 'hover:bg-black/30' : ''}
          ${variant === 'text' ? 'hover:scale-110' : 'drop-shadow-lg hover:drop-shadow-xl'}
          ${variant !== 'text' ? 'rounded-full' : ''}
        `}>
          {getBadgeContent()}
        </div>
      </a>
    </motion.div>
  );
};

export default BoltBadge; 