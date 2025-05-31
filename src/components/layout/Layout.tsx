import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import EnhancedCoachFAB from '../voice/EnhancedCoachFAB';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, -25, 0], 
            y: [0, 25, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Sidebar with gradient background */}
      <div className="hidden md:block w-64 bg-gradient-to-br from-primary-100/90 via-accent-50/90 to-secondary-100/90 backdrop-blur-md border-r border-white/20 shadow-lg relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Navbar with gradient background */}
        <div className="bg-gradient-to-r from-primary-100/90 via-accent-50/90 to-secondary-100/90 border-b border-white/20 shadow-lg backdrop-blur-md relative z-20">
          <Navbar />
        </div>
        
        <motion.main 
          className="flex-1 overflow-x-hidden overflow-y-auto p-2 sm:p-4 lg:p-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="container mx-auto max-w-full px-2 sm:px-4 lg:px-6">
            <Outlet />
          </div>
        </motion.main>
      </div>
      
      {/* Enhanced AI Coach Floating Action Button */}
      <EnhancedCoachFAB position="bottom-right" />
    </div>
  );
};

export default Layout;