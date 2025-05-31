import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Video, 
  Mic,
  Brain,
  Shield,
  Heart,
  Star,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Globe,
  Smartphone,
  BookOpen
} from 'lucide-react';
import MindfulnessCoach from '../components/voice/MindfulnessCoach';

const HomePage = () => {
  const [showMindfulnessCoach, setShowMindfulnessCoach] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Crisis Banner */}
      <motion.div 
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 relative z-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">In Crisis? Get immediate help: Call 988 or Text HOME to 741741</span>
            </div>
            <div className="flex gap-2">
              <a href="tel:988" className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
                Call 988
              </a>
              <a href="sms:741741" className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
                Text Crisis Line
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img src="/hug.png" alt="HUG" className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your AI Mental Health Companion
            </h1>
            <p className="text-xl text-gray-600">
              24/7 empathetic support, crisis intervention, and personalized wellness guidance
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/conversation"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <MessageCircle className="h-5 w-5" />
              Start Conversation
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>

            <button 
              onClick={() => setShowMindfulnessCoach(true)}
              className="w-full sm:w-auto bg-white border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              <Mic className="h-5 w-5" />
              Try Voice Chat
            </button>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="AI Companion"
              description="Natural conversations with our empathetic AI using voice or text"
            />
            <FeatureCard 
              icon={<Heart className="h-6 w-6 text-pink-500" />}
              title="Mental Wellness"
              description="Guided meditation, mood tracking, and personalized support"
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-blue-500" />}
              title="Crisis Support"
              description="24/7 access to help resources and professional support"
            />
          </div>
        </div>
      </div>

      {/* Mindfulness Coach Modal */}
      <MindfulnessCoach
        isOpen={showMindfulnessCoach}
        onClose={() => setShowMindfulnessCoach(false)}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -5 }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export default HomePage;