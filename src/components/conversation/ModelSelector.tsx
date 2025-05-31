import { motion } from 'framer-motion';
import { Brain, ChevronDown } from 'lucide-react';
import { models, ModelType } from '../../lib/perplexity';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  isConfigured: boolean;
}

const ModelSelector = ({ selectedModel, onModelChange, isConfigured }: ModelSelectorProps) => {
  const modelInfo: Record<ModelType, { name: string; description: string; maxTokens: number }> = {
    'sonar-deep-research': {
      name: 'Sonar Deep Research',
      description: 'Advanced research and analysis',
      maxTokens: 128000
    },
    'sonar-reasoning-pro': {
      name: 'Sonar Reasoning Pro',
      description: 'Enhanced reasoning capabilities',
      maxTokens: 128000
    },
    'sonar-reasoning': {
      name: 'Sonar Reasoning',
      description: 'Balanced reasoning and response',
      maxTokens: 128000
    },
    'sonar-pro': {
      name: 'Sonar Pro',
      description: 'Professional-grade responses',
      maxTokens: 200000
    },
    'sonar': {
      name: 'Sonar',
      description: 'Fast and efficient chat',
      maxTokens: 128000
    },
    'r1-1776': {
      name: 'R1-1776',
      description: 'Specialized chat model',
      maxTokens: 128000
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as ModelType)}
        disabled={!isConfigured}
        className={`appearance-none w-full bg-white/80 backdrop-blur-sm border ${
          isConfigured ? 'border-primary-200' : 'border-neutral-200'
        } rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50`}
      >
        {Object.entries(models).map(([key, value]) => (
          <option key={key} value={key} title={modelInfo[key as ModelType].description}>
            {modelInfo[key as ModelType].name} ({modelInfo[key as ModelType].maxTokens / 1000}k tokens)
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </div>
      
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800"
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