import { motion } from 'framer-motion';
import { Brain, ChevronDown } from 'lucide-react';
import { models, ModelType } from '../../lib/perplexity';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  isConfigured: boolean;
}

interface ModelDetails {
  name: string;
  description: string;
  maxTokens: number;
  category: string;
  features: string[];
}

const ModelSelector = ({ selectedModel, onModelChange, isConfigured }: ModelSelectorProps) => {
  const modelInfo: Record<ModelType, ModelDetails> = {
    'sonar-deep-research': {
      name: 'Sonar Deep Research',
      description: 'Best for in-depth research with citations. Provides detailed responses and comprehensive analysis.',
      maxTokens: 128000,
      category: 'Research',
      features: ['Citation support', 'Search integration', 'Detailed analysis']
    },
    'sonar-reasoning-pro': {
      name: 'Sonar Reasoning Pro',
      description: 'Enhanced reasoning with professional-grade analysis and structured thinking.',
      maxTokens: 128000,
      category: 'Professional',
      features: ['Advanced reasoning', 'Professional analysis', 'Structured responses']
    },
    'sonar-reasoning': {
      name: 'Sonar Reasoning',
      description: 'Balanced model for general reasoning tasks and thoughtful responses.',
      maxTokens: 128000,
      category: 'General',
      features: ['Balanced reasoning', 'General tasks', 'Clear explanations']
    },
    'sonar-pro': {
      name: 'Sonar Pro',
      description: 'Professional-grade responses with higher context window. Ideal for longer conversations.',
      maxTokens: 200000,
      category: 'Professional',
      features: ['Extended context', 'Professional quality', 'Longer conversations']
    },
    'sonar': {
      name: 'Sonar',
      description: 'Fast and efficient chat model for general-purpose conversations.',
      maxTokens: 128000,
      category: 'General',
      features: ['Fast responses', 'Efficient processing', 'General chat']
    },
    'r1-1776': {
      name: 'R1-1776',
      description: 'Specialized chat model optimized for natural conversations.',
      maxTokens: 128000,
      category: 'Specialized',
      features: ['Natural dialogue', 'Optimized chat', 'Conversational focus']
    }
  };

  return (
    <div className="relative group">
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as ModelType)}
        disabled={!isConfigured}
        className={`appearance-none w-full bg-white/80 backdrop-blur-sm border ${
          isConfigured ? 'border-primary-200 hover:border-primary-300' : 'border-neutral-200'
        } rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 transition-colors`}
      >
        {Object.entries(models).map(([key]) => {
          const info = modelInfo[key as ModelType];
          return (
            <option 
              key={key} 
              value={key} 
              title={`${info.description}\n\nFeatures:\n${info.features.join('\n')}`}
            >
              {info.name} • {info.category} • {info.maxTokens / 1000}k
            </option>
          );
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </div>
      
      {/* Model Info Tooltip */}
      <div className="hidden group-hover:block absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-primary-500" />
          <h3 className="font-medium text-gray-900">{modelInfo[selectedModel].name}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{modelInfo[selectedModel].description}</p>
        <div className="flex flex-wrap gap-2">
          {modelInfo[selectedModel].features.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 z-20"
        >
          <div className="flex items-center gap-2 mb-1">
            <Brain className="h-4 w-4 text-yellow-600" />
            <span className="font-medium">Perplexity API Not Configured</span>
          </div>
          <p>Using fallback responses. Add VITE_PERPLEXITY_API_KEY to enable AI chat.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ModelSelector;