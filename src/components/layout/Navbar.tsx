import { useState } from 'react';
import { 
  LogOut, 
  Settings,
  Heart,
  Activity,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HeartbeatAnimation, FloatingEmotion } from '../ui/HugVisualElements';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentMood] = useState<'great' | 'good' | 'okay' | 'bad' | 'awful' | null>('good');
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/signin');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg relative z-20 overflow-hidden">
      {/* Floating caring emotions */}
      <FloatingEmotion emotion="love" delay={0} className="top-2 left-10" />
      <FloatingEmotion emotion="comfort" delay={2} className="top-1 right-20" />
      <FloatingEmotion emotion="peace" delay={4} className="top-3 left-1/3" />
      
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 relative z-10">
        <div className="flex justify-end items-center">
          {/* Right Section - User Menu Only */}
          <div className="flex items-center">
            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/50 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl touch-target"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <HeartbeatAnimation intensity="gentle">
                  <motion.div 
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white flex items-center justify-center font-medium text-sm shadow-lg relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute -top-1 -right-1 text-xs"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ❤️
                    </motion.div>
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </motion.div>
                </HeartbeatAnimation>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-neutral-900 leading-none truncate max-w-32">
                    {user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-neutral-500 leading-none mt-0.5">
                    {currentMood ? `Feeling ${currentMood}` : 'How are you?'}
                  </p>
                </div>
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-56 sm:w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 py-2 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm font-medium text-neutral-900 truncate">{user?.email}</p>
                      <p className="text-xs text-neutral-500 mt-1">Your AI companion is here for you</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                        <div>
                          <div className="text-base sm:text-lg font-bold text-primary-600">7</div>
                          <div className="text-xs text-neutral-500">Day Streak</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-secondary-600">15</div>
                          <div className="text-xs text-neutral-500">Sessions</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-accent-600">3</div>
                          <div className="text-xs text-neutral-500">Challenges</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <UserMenuItem 
                        icon={<Heart className="h-4 w-4" />}
                        label="Mood Tracker"
                        to="/mood"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <UserMenuItem 
                        icon={<Activity className="h-4 w-4" />}
                        label="Progress"
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <UserMenuItem 
                        icon={<Settings className="h-4 w-4" />}
                        label="Settings"
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="border-t border-neutral-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors touch-target"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface UserMenuItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick: () => void;
}

const UserMenuItem = ({ icon, label, to, onClick }: UserMenuItemProps) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors touch-target"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;