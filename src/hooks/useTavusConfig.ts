import { useState, useEffect } from 'react';

interface TavusConfig {
  apiKey?: string;
  replicaId?: string;
  personaId?: string;
}

interface UseTavusConfigReturn {
  config: TavusConfig;
  isConfigured: boolean;
  updateConfig: (newConfig: Partial<TavusConfig>) => void;
  clearConfig: () => void;
}

export const useTavusConfig = (): UseTavusConfigReturn => {
  const [config, setConfig] = useState<TavusConfig>({});

  useEffect(() => {
    // Load configuration from environment variables and localStorage
    const envApiKey = import.meta.env.VITE_TAVUS_API_KEY;
    const envReplicaId = import.meta.env.VITE_TAVUS_REPLICA_ID;
    const envPersonaId = import.meta.env.VITE_TAVUS_PERSONA_ID;
    
    const storedConfig = localStorage.getItem('tavus-config');
    let localConfig = {};
    
    if (storedConfig) {
      try {
        localConfig = JSON.parse(storedConfig);
      } catch (error) {
        console.warn('Failed to parse stored Tavus config:', error);
      }
    }

    setConfig({
      apiKey: envApiKey || (localConfig as any)?.apiKey,
      replicaId: envReplicaId || (localConfig as any)?.replicaId,
      personaId: envPersonaId || (localConfig as any)?.personaId
    });
  }, []);

  const updateConfig = (newConfig: Partial<TavusConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    
    // Save to localStorage (excluding sensitive API key for security)
    localStorage.setItem('tavus-config', JSON.stringify({
      replicaId: updatedConfig.replicaId,
      personaId: updatedConfig.personaId
    }));
  };

  const clearConfig = () => {
    setConfig({});
    localStorage.removeItem('tavus-config');
  };

  const isConfigured = Boolean(config.apiKey && config.replicaId && config.personaId);

  return {
    config,
    isConfigured,
    updateConfig,
    clearConfig
  };
}; 