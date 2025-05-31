import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BoltBadge from '../components/ui/BoltBadge';
import { 
  HugWave, 
  EmotionalAura, 
  ComfortingHands, 
  FloatingEmotion, 
  HeartbeatAnimation,
  ComfortingMessage,
  CaringParticles,
  BreathingIndicator
} from '../components/ui/HugVisualElements';
import { 
  Heart, 
  BrainCircuit, 
  Sparkles, 
  Shield, 
  ArrowRight,
  MessageCircle,
  Mic,
  Phone,
  Users,
  Clock,
  Star,
  Play,
  Headphones,
  Brain,
  Zap,
  Target,
  Calendar,
  Award,
  CheckCircle,
  AlertTriangle,
  Globe,
  Smartphone,
  BookOpen,
  TrendingUp,
  Volume2,
  Moon,
  Sun,
  Wind,
  Waves,
  Lightbulb,
  UserCheck,
  Activity,
  Smile,
  Quote,
  MapPin,
  Lock,
  Wifi,
  Gamepad2,
  Medal,
  Camera,
  Headset,
  Palette,
  Sunrise
} from 'lucide-react';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVoiceDemo, setIsVoiceDemo] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showComfortMessage, setShowComfortMessage] = useState(true);

  const testimonials = [
    {
      name: "Sarah M.",
      age: 26,
      role: "Marketing Professional",
      content: "huggy helped me through my worst anxiety attacks. Having someone to talk to at 3 AM when I couldn't sleep made all the difference.",
      rating: 5,
      improvement: "80% reduction in anxiety"
    },
    {
      name: "Alex K.",
      age: 22,
      role: "College Student",
      content: "The AI companion doesn't judge me. I can share my darkest thoughts and get real help. It connected me with a therapist when I needed professional help.",
      rating: 5,
      improvement: "Found professional support"
    },
    {
      name: "Maria L.",
      age: 34,
      role: "Working Mother",
      content: "The meditation sessions and wellness challenges fit perfectly into my busy schedule. My family has noticed how much calmer I've become.",
      rating: 5,
      improvement: "Better work-life balance"
    }
  ];

  const stats = [
    { number: "1M+", label: "Lives Touched", icon: <Heart className="h-6 w-6" /> },
    { number: "24/7", label: "Always Available", icon: <Clock className="h-6 w-6" /> },
    { number: "95%", label: "Crisis Success Rate", icon: <Shield className="h-6 w-6" /> },
    { number: "AI", label: "Powered Support", icon: <BrainCircuit className="h-6 w-6" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Bolt.new Badge */}
      <BoltBadge variant="text" position="top-right" />
      
      {/* Comforting Message */}
      <ComfortingMessage
        message="You're not alone. huggy is here to listen, support, and care for you. 💝"
        visible={showComfortMessage}
        onClose={() => setShowComfortMessage(false)}
        position="top"
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CaringParticles particleCount={25} className="opacity-30" />
        
        {/* Floating emotional elements */}
        <FloatingEmotion emotion="love" delay={0} className="top-20 left-10" />
        <FloatingEmotion emotion="hope" delay={2} className="top-40 right-20" />
        <FloatingEmotion emotion="peace" delay={4} className="top-60 left-1/4" />
        <FloatingEmotion emotion="joy" delay={6} className="top-80 right-1/3" />
        <FloatingEmotion emotion="comfort" delay={8} className="bottom-40 left-1/2" />
        
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Crisis Support Banner */}
      <motion.div 
        className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white py-3 sm:py-4 relative z-10 shadow-lg border-b border-red-400/30 backdrop-blur-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium">In Crisis? Get immediate help: Call 988 or Text HOME to 741741</span>
            </div>
            <div className="flex gap-2">
              <a href="tel:988" className="bg-white/20 hover:bg-white/30 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors backdrop-blur-sm touch-target">
                Call 988
              </a>
              <a href="sms:741741" className="bg-white/20 hover:bg-white/30 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors backdrop-blur-sm touch-target">
                Text Crisis Line
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <EmotionalAura emotion="hopeful" intensity="warm">
            <HeartbeatAnimation intensity="gentle">
              <motion.div 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 text-xs"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </HeartbeatAnimation>
          </EmotionalAura>
          <motion.span 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            huggy
          </motion.span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
            Stories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/conversation" className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl hover:shadow-2xl transition-all flex items-center gap-2 font-bold text-base lg:text-lg shadow-lg border border-white/20 backdrop-blur-sm animate-gradient">
              Start Conversation <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
            </Link>
          </motion.div>
        </nav>
        
        <Link to="/conversation" className="md:hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg font-medium text-sm">
          Start
        </Link>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 sm:mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-purple-200/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                AI-Powered Mental Health Companion
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your 24/7 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI Companion</span> for Mental Wellness
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Always here, always caring. huggy provides empathetic support, crisis intervention, 
                guided wellness activities, and professional resources whenever you need them.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/conversation"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center justify-center gap-3"
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
                </motion.div>
                
                <motion.button 
                  onClick={() => setIsVoiceDemo(!isVoiceDemo)}
                  className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all inline-flex items-center justify-center gap-3 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mic className="h-5 w-5" />
                  </motion.div>
                  Try Voice Demo
                </motion.button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free & Confidential</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Available 24/7</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Crisis Support</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              className="relative w-96 h-96"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated Background Circles */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-30"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div 
                className="absolute inset-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-40"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Central AI Brain Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BrainCircuit className="h-16 w-16 text-white" />
                </motion.div>
              </div>
              
              {/* Floating Feature Icons */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <MessageCircle className="h-8 w-8 text-blue-500" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Heart className="h-8 w-8 text-red-500" />
              </motion.div>
              
              <motion.div
                className="absolute top-20 left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Shield className="h-6 w-6 text-green-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Voice Demo Modal */}
        <AnimatePresence>
          {isVoiceDemo && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Voice Interaction Demo</h3>
                <p className="text-gray-600 mb-6">
                  Experience natural conversations with our AI companion. Speak freely about your feelings, 
                  and receive empathetic, personalized support.
                </p>
                <div className="flex gap-3">
                  <Link 
                    to="/conversation"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Try Now
                  </Link>
                  <button 
                    onClick={() => setIsVoiceDemo(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Stats Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="mb-2 flex justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">{stat.number}</div>
                  <div className="text-purple-100 group-hover:text-white transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Mental Health Support
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                  huggy combines AI empathy with professional resources to provide complete mental health care
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<MessageCircle className="h-12 w-12 text-blue-500" />}
                title="AI Companion Chat"
                description="Engage in natural, empathetic conversations with our advanced AI that understands your emotional needs and provides personalized support."
                features={["24/7 availability", "Voice & text support", "Emotional intelligence"]}
              />
              
              <FeatureCard 
                icon={<Shield className="h-12 w-12 text-red-500" />}
                title="Crisis Intervention"
                description="Immediate help during mental health crises with direct connections to professional hotlines and emergency resources."
                features={["Instant crisis detection", "Professional hotlines", "Emergency protocols"]}
              />
              
              <FeatureCard 
                icon={<Brain className="h-12 w-12 text-purple-500" />}
                title="Wellness Programs"
                description="Personalized meditation, breathing exercises, and mindfulness activities tailored to your specific mental health goals."
                features={["Guided meditations", "Breathing exercises", "Progress tracking"]}
              />
              
              <FeatureCard 
                icon={<Users className="h-12 w-12 text-green-500" />}
                title="Professional Network"
                description="Connect with licensed therapists, counselors, and mental health professionals in your area with insurance verification."
                features={["Therapist directory", "Insurance matching", "Appointment booking"]}
              />
              
              <FeatureCard 
                icon={<Gamepad2 className="h-12 w-12 text-orange-500" />}
                title="Gamified Wellness"
                description="Engaging challenges and achievements that make mental health care fun and motivating with social sharing."
                features={["Wellness challenges", "Achievement system", "Social sharing"]}
              />
              
              <FeatureCard 
                icon={<Activity className="h-12 w-12 text-pink-500" />}
                title="Mood Tracking"
                description="Monitor your emotional wellbeing with intelligent mood tracking, insights, and personalized recommendations."
                features={["Daily mood logs", "Pattern analysis", "Progress insights"]}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                              <h2 className="text-4xl font-bold text-gray-900 mb-4">How huggy Works</h2>
              <p className="text-xl text-gray-600">Simple steps to better mental health</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <StepCard 
                number={1}
                title="Start a Conversation"
                                  description="Begin talking with huggy through voice or text. Share your feelings, concerns, or just say hello."
                icon={<MessageCircle className="h-8 w-8 text-purple-500" />}
              />
              
              <StepCard 
                number={2}
                title="Receive Personalized Support"
                description="Get empathetic responses, coping strategies, wellness activities, and professional resource recommendations."
                icon={<Heart className="h-8 w-8 text-pink-500" />}
              />
              
              <StepCard 
                number={3}
                title="Track Your Journey"
                description="Monitor your progress, complete wellness challenges, and celebrate your mental health milestones."
                icon={<TrendingUp className="h-8 w-8 text-green-500" />}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories, Real Impact</h2>
                              <p className="text-xl text-gray-600">See how huggy has transformed lives</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 text-center border border-purple-100"
                >
                  <div className="flex justify-center mb-6">
                    <Quote className="h-12 w-12 text-purple-400" />
                  </div>
                  
                  <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="text-gray-600 mb-2">
                    <span className="font-semibold">{testimonials[currentTestimonial].name}</span>
                    <span className="mx-2">•</span>
                    <span>{testimonials[currentTestimonial].role}</span>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    {testimonials[currentTestimonial].improvement}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-purple-500 w-8' 
                        : 'bg-purple-200 hover:bg-purple-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-xl text-gray-600">Take the first step towards better mental health today</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-white/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Heart className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Mental Health Companion Awaits
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join a supportive community focused on mental wellness. Start with a simple conversation 
                  and discover personalized support, guided activities, and professional resources tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/conversation"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Start Your First Conversation
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/meditation"
                      className="bg-white border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all inline-flex items-center justify-center gap-3 shadow-md"
                    >
                      <Brain className="h-5 w-5" />
                      Try Meditation
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Start Your Mental Health Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands who have found support, guidance, and hope with huggy. 
                Your mental health matters, and help is just a conversation away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/conversation"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/resources"
                    className="bg-white border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all inline-flex items-center justify-center gap-3 shadow-md"
                  >
                    <BookOpen className="h-5 w-5" />
                    Explore Resources
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <Heart className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold">huggy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your 24/7 AI companion for mental health support, crisis intervention, and wellness guidance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-purple-300">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Companion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Meditation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mood Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-purple-300">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mental Health Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Therapists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Hotlines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Groups</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-red-300">Crisis Support</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">National Suicide Prevention Lifeline</div>
                  <a href="tel:988" className="text-white font-semibold hover:text-purple-400 transition-colors">988</a>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Crisis Text Line</div>
                  <a href="sms:741741" className="text-white font-semibold hover:text-purple-400 transition-colors">Text HOME to 741741</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
                              © {new Date().getFullYear()} huggy. All rights reserved. Built with ❤️ for mental wellness.
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, features }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  features: string[];
}) => (
  <motion.div 
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100/50 group"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <motion.div 
      className="mb-6"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <motion.li 
          key={index} 
          className="flex items-center gap-2 text-sm text-gray-600"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const StepCard = ({ number, title, description, icon }: { 
  number: number; 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => (
  <motion.div 
    className="text-center group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: number * 0.2 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative mb-6">
      <motion.div 
        className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow"
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.div>
      <motion.div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-purple-100">
          {icon}
        </div>
      </motion.div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default HomePage;