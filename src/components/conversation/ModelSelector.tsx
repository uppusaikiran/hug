import { motion } from 'framer-motion';
import { Brain, ChevronDown } from 'lucide-react';
import { models, ModelType } from '../../lib/perplexity';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  isConfigured: boolean;
}

const ModelSelector = ({ selectedModel, onModelChange, isConfigured }: ModelSelectorProps) => {
  const modelInfo = {
    mistral: {
      name: 'Mistral-7B',
      description: 'Fast and efficient for general conversations'
    },
    codellama: {
      name: 'CodeLlama-34B',
      description: 'Specialized in technical discussions'
    },
    mixtral: {
      name: 'Mixtral-8x7B',
      description: 'Advanced reasoning and comprehension'
    },
    sonar: {
      name: 'Sonar Small',
      description: 'Optimized for natural chat interactions'
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
          <option key={key} value={key}>
            {modelInfo[key as ModelType].name}
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