
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// This context is now deprecated as we're using Supabase Edge Functions with secrets
// It's kept for backward compatibility

interface ApiKeyContextType {
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [openaiApiKey, setOpenaiApiKey] = useState<string>(() => {
    // Try to get the API key from localStorage on initial load
    const savedKey = localStorage.getItem('openai_api_key');
    return savedKey || '';
  });

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (openaiApiKey) {
      localStorage.setItem('openai_api_key', openaiApiKey);
    }
  }, [openaiApiKey]);

  return (
    <ApiKeyContext.Provider value={{ openaiApiKey, setOpenaiApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
