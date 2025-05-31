import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Heart, 
  Home, 
  MessageCircle, 
  Activity, 
  Award, 
  Sparkles,
  LifeBuoy,
  User,
  TrendingUp,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/conversation", icon: <MessageCircle size={20} />, label: "Conversation" },
    { to: "/mood", icon: <TrendingUp size={20} />, label: "Mood Tracker" },
    { to: "/meditation", icon: <Sparkles size={20} />, label: "Meditation" },
    { to: "/challenges", icon: <Award size={20} />, label: "Challenges" },
    { to: "/resources", icon: <LifeBuoy size={20} />, label: "Resources" },
    { to: "/profile", icon: <User size={20} />, label: "Profile" }
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 hover:bg-primary-50 transition-colors"
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.div>
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        className="hidden md:flex flex-col h-full"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-white/20 bg-gradient-to-r from-primary-50/50 to-accent-50/50">
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5 }}
            >
              <Heart className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              huggy
            </span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              currentPath={location.pathname} 
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/20 space-y-3 bg-gradient-to-r from-primary-50/50 to-accent-50/50">
          <Link 
            to="/crisis" 
            className="w-full py-3 px-4 bg-error-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-error-600 transition-colors shadow-lg"
          >
            <Activity size={18} />
            <span>Crisis Support</span>
          </Link>
          
          <button
            onClick={signOut}
            className="w-full py-3 px-4 bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg border border-neutral-200"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-br from-white/90 to-primary-50/90 backdrop-blur-md border-r border-white/20 z-50 shadow-xl"
          >
            <div className="p-4 border-b border-white/20 mt-16">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <Heart className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  huggy
                </span>
              </div>
              {user && (
                <p className="text-sm text-neutral-600 mt-2">
                  Welcome back, {user.email?.split('@')[0]}
                </p>
              )}
            </div>
            
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  icon={item.icon} 
                  label={item.label} 
                  currentPath={location.pathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                  isMobile={true}
                />
              ))}
            </nav>
            
            <div className="p-4 border-t border-white/20 space-y-3">
              <Link 
                to="/crisis" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 px-4 bg-error-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-error-600 transition-colors shadow-lg"
              >
                <Activity size={18} />
                <span>Crisis Support</span>
              </Link>
              
              <button
                onClick={signOut}
                className="w-full py-3 px-4 bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg border border-neutral-200"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink = ({ to, icon, label, currentPath, onClick, isMobile = false }: NavLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
        isActive 
          ? 'bg-gradient-to-r from-primary-100/80 to-accent-100/80 text-primary-800 font-medium shadow-lg border border-primary-200/50' 
          : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/50'
      } ${isMobile ? 'text-base' : ''}`}
    >
      {isActive && (
        <motion.div 
          layoutId={isMobile ? "activeMobileNavIndicator" : "activeNavIndicator"}
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;