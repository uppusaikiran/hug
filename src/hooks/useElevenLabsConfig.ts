import { useState, useEffect } from 'react';

interface ElevenLabsConfig {
  apiKey?: string;
  agentId?: string;
}

interface UseElevenLabsConfigReturn {
  config: ElevenLabsConfig;
  isConfigured: boolean;
  updateConfig: (newConfig: Partial<ElevenLabsConfig>) => void;
  clearConfig: () => void;
}

export const useElevenLabsConfig = (): UseElevenLabsConfigReturn => {
  const [config, setConfig] = useState<ElevenLabsConfig>({});

  useEffect(() => {
    // Load configuration from environment variables and localStorage
    const envApiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    const envAgentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
    
    const storedConfig = localStorage.getItem('elevenlabs-config');
    let localConfig = {};
    
    if (storedConfig) {
      try {
        localConfig = JSON.parse(storedConfig);
      } catch (error) {
        console.warn('Failed to parse stored ElevenLabs config:', error);
      }
    }

    setConfig({
      apiKey: envApiKey || (localConfig as any)?.apiKey,
      agentId: envAgentId || (localConfig as any)?.agentId || 'agent_01jwht2cd9f58rzarx1xksvqft'
    });
  }, []);

  const updateConfig = (newConfig: Partial<ElevenLabsConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    
    // Save to localStorage (excluding sensitive API key for security)
    localStorage.setItem('elevenlabs-config', JSON.stringify({
      agentId: updatedConfig.agentId
    }));
  };

  const clearConfig = () => {
    setConfig({});
    localStorage.removeItem('elevenlabs-config');
  };

  const isConfigured = Boolean(config.agentId);

  return {
    config,
    isConfigured,
    updateConfig,
    clearConfig
  };
}; 