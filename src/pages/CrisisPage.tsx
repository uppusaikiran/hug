import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Heart, 
  ArrowLeft,
  ArrowRight,
  User,
  Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  EmotionalAura, 
  HeartbeatAnimation, 
  CaringParticles, 
  CompassionateGlow,
  CareWave,
  HeartPulse,
  SupportingHands,
  WarmthIndicator,
  BreathingIndicator,
  LovingEmbraceBorder,
  ComfortingMessage
} from '../components/ui/HugVisualElements';

const CrisisPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showComfortMessage, setShowComfortMessage] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Caring background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <CaringParticles particleCount={25} className="opacity-30" />
        <CareWave intensity="gentle" className="absolute top-0 left-0 right-0" />
      </div>
      
      {/* Comforting Message */}
      <ComfortingMessage
        message="You are not alone. We're here to support you through this difficult time. 💙"
        visible={showComfortMessage}
        onClose={() => setShowComfortMessage(false)}
        position="top"
      />
      
      <div className="max-w-3xl mx-auto py-8 px-4 relative z-10">
        <Link to="/dashboard" className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-6">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>
        
        <LovingEmbraceBorder glowIntensity="bright">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <EmotionalAura emotion="comforted" intensity="warm">
              <div className="bg-error-500 p-6 text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <HeartbeatAnimation intensity="gentle" className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">Crisis Support</h1>
                      <HeartPulse size={24} color="text-white" />
                    </HeartbeatAnimation>
                    <p>We're here to help during difficult moments. Find immediate resources below.</p>
                  </div>
                  <SupportingHands className="text-3xl" />
                </div>
                <WarmthIndicator level="high" className="mt-4" />
              </div>
            </EmotionalAura>
            
            <div className="p-6">
              <div className="mb-8">
                <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
              </div>
              
              {currentStep === 1 && <EmergencyResourcesStep />}
              {currentStep === 2 && <CalmingExerciseStep onComplete={() => setCurrentStep(3)} />}
              {currentStep === 3 && <SafetyPlanStep />}
              
              <div className="flex justify-between mt-8">
                <button 
                  className="btn btn-ghost"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
                
                {currentStep < 3 && (
                  <HeartbeatAnimation intensity="gentle">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    >
                      Continue
                    </button>
                  </HeartbeatAnimation>
                )}
                
                {currentStep === 3 && (
                  <HeartbeatAnimation intensity="gentle">
                    <Link to="/conversation" className="btn btn-primary">
                      Talk to huggy
                    </Link>
                  </HeartbeatAnimation>
                )}
              </div>
            </div>
          </div>
        </LovingEmbraceBorder>
        
        <CompassionateGlow emotion="support">
          <div className="mt-8 bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-pink-500 w-5 h-5" />
              <h2 className="text-lg font-semibold">Remember</h2>
              <WarmthIndicator level="medium" />
            </div>
            <p className="text-neutral-700">
              huggy is here to provide support, but is not a substitute for professional help in emergencies.
              If you or someone else is in immediate danger, please call emergency services immediately.
            </p>
          </div>
        </CompassionateGlow>
      </div>
    </div>
  );
};

interface StepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Steps = ({ currentStep, setCurrentStep }: StepsProps) => {
  const steps = [
    { number: 1, label: "Resources" },
    { number: 2, label: "Calming Exercise" },
    { number: 3, label: "Safety Plan" }
  ];
  
  return (
    <div className="flex justify-between">
      {steps.map((step) => (
        <div 
          key={step.number} 
          className="flex flex-col items-center"
          onClick={() => setCurrentStep(step.number)}
        >
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors ${
              currentStep >= step.number 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {step.number}
          </div>
          <span className={`text-xs ${
            currentStep >= step.number 
              ? 'text-primary-700 font-medium' 
              : 'text-neutral-500'
          }`}>
            {step.label}
          </span>
          
          {step.number < steps.length && (
            <div className={`h-0.5 w-16 mt-5 -mx-8 ${
              currentStep > step.number ? 'bg-primary-500' : 'bg-neutral-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

const EmergencyResourcesStep = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Emergency Resources</h2>
    
    <div className="space-y-4">
      <ResourceCard 
        title="National Suicide Prevention Lifeline" 
        description="24/7, free and confidential support for people in distress."
        contact="1-800-273-8255"
        icon={<Phone size={20} className="text-error-500" />}
        primary
      />
      
      <ResourceCard 
        title="Crisis Text Line" 
        description="Text HOME to 741741 to connect with a Crisis Counselor."
        contact="Text HOME to 741741"
        icon={<MessageSquare size={20} className="text-primary-500" />}
      />
      
      <ResourceCard 
        title="Local Emergency Services" 
        description="For immediate emergency assistance."
        contact="911"
        icon={<Phone size={20} className="text-error-500" />}
      />
    </div>
    
    <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <Heart size={18} className="text-primary-500" />
        Remember
      </h3>
      <p className="text-sm text-neutral-700">
        You're not alone in this. Reaching out for help is a sign of strength, not weakness.
      </p>
    </div>
  </div>
);

interface ResourceCardProps {
  title: string;
  description: string;
  contact: string;
  icon: React.ReactNode;
  primary?: boolean;
}

const ResourceCard = ({ title, description, contact, icon, primary }: ResourceCardProps) => (
  <div className={`p-4 rounded-lg border ${
    primary 
      ? 'border-error-200 bg-error-50' 
      : 'border-neutral-200 bg-white'
  }`}>
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-neutral-700 mb-2">{description}</p>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{contact}</span>
          <button className="text-xs bg-white py-1 px-3 rounded border border-neutral-200 hover:bg-neutral-50 transition-colors">
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
);

interface CalmingExerciseStepProps {
  onComplete: () => void;
}

const CalmingExerciseStep = ({ onComplete }: CalmingExerciseStepProps) => {
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [completed, setCompleted] = useState(false);
  
  // Animation for the breathing circle
  const circleVariants = {
    inhale: { scale: 1.3, transition: { duration: 4 } },
    hold: { scale: 1.3, transition: { duration: 7 } },
    exhale: { scale: 1, transition: { duration: 8 } }
  };
  
  // Simulated breathing exercise
  // In a real app, this would use useEffect with actual timers
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">4-7-8 Breathing Exercise</h2>
      
      <p className="text-neutral-700 mb-6">
        This simple breathing technique can help calm your nervous system and reduce anxiety.
      </p>
      
      <div className="flex flex-col items-center mb-8">
        <motion.div 
          className="w-40 h-40 bg-primary-100 rounded-full flex items-center justify-center mb-4"
          variants={circleVariants}
          animate={currentPhase}
        >
          <div className="text-center">
            <div className="text-xl font-medium text-primary-700">
              {currentPhase === 'inhale' && 'Inhale'}
              {currentPhase === 'hold' && 'Hold'}
              {currentPhase === 'exhale' && 'Exhale'}
            </div>
            <div className="text-3xl font-bold text-primary-800">{countdown}</div>
          </div>
        </motion.div>
        
        <div className="text-sm text-neutral-600 bg-neutral-100 p-2 rounded-md">
          {currentPhase === 'inhale' && 'Breathe in through your nose'}
          {currentPhase === 'hold' && 'Hold your breath'}
          {currentPhase === 'exhale' && 'Breathe out through your mouth'}
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary px-8"
            onClick={() => {
              if (!completed) {
                // Simulate completion of exercise
                setCompleted(true);
                setTimeout(() => onComplete(), 1000);
              }
            }}
          >
            {completed ? 'Completed' : 'Skip to Next Step'}
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h3 className="font-medium mb-2">How this helps:</h3>
        <p className="text-sm text-neutral-700">
          This technique helps activate your parasympathetic nervous system, which controls relaxation. 
          It can lower heart rate, blood pressure, and help you feel calmer.
        </p>
      </div>
    </div>
  );
};

const SafetyPlanStep = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your Safety Plan</h2>
    
    <p className="text-neutral-700 mb-6">
      Creating a safety plan can help you navigate difficult moments and know exactly what to do when feeling overwhelmed.
    </p>
    
    <div className="space-y-6">
      <SafetyPlanItem 
        number={1}
        title="Recognize Warning Signs"
        description="What thoughts, moods, or behaviors tell you a crisis might be developing?"
        icon={<Sparkles size={20} className="text-warning-500" />}
        examples={["Feeling hopeless", "Increased anxiety", "Withdrawing from others"]}
      />
      
      <SafetyPlanItem 
        number={2}
        title="Internal Coping Strategies"
        description="What can you do by yourself to take your mind off problems?"
        icon={<Heart size={20} className="text-primary-500" />}
        examples={["Deep breathing", "Mindfulness meditation", "Physical exercise"]}
      />
      
      <SafetyPlanItem 
        number={3}
        title="People Who Can Help"
        description="Who are the people you can contact for support?"
        icon={<User size={20} className="text-secondary-500" />}
        examples={["Trusted friends", "Family members", "Mental health professional"]}
      />
    </div>
    
    <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Heart size={20} className="text-primary-500" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Save Your Safety Plan</h3>
          <p className="text-sm text-neutral-700">
            Would you like to create and save a personalized safety plan? This will be available to you whenever you need it.
          </p>
          <button className="mt-3 btn btn-primary">Create My Safety Plan</button>
        </div>
      </div>
    </div>
  </div>
);

interface SafetyPlanItemProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

const SafetyPlanItem = ({ number, title, description, icon, examples }: SafetyPlanItemProps) => (
  <div className="border border-neutral-200 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium">
        {number}
      </div>
      <h3 className="font-medium flex items-center gap-2">
        {title}
        {icon}
      </h3>
    </div>
    
    <p className="text-sm text-neutral-700 mb-3">{description}</p>
    
    <div className="bg-neutral-50 p-3 rounded-md">
      <h4 className="text-xs font-medium text-neutral-900 mb-2">Examples:</h4>
      <ul className="text-sm text-neutral-700 space-y-1">
        {examples.map((example, index) => (
          <li key={index} className="flex items-center gap-2">
            <ArrowRight size={12} className="text-primary-500" />
            {example}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CrisisPage;