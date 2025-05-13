
import { useState, useEffect } from 'react';
import { SkinLogEntry, SkinFactor, SkinRecommendation } from '../types';

/**
 * Hook for skin logging functionality
 * This is platform-agnostic and can be used in both web and native
 */
export const useSkinLogging = (userId: string) => {
  const [skinLogs, setSkinLogs] = useState<SkinLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch skin logs (platform-agnostic logic)
  const fetchSkinLogs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would use your API service to fetch data
      // The API service would be the same for web and native
      // const response = await skinApi.getLogs(userId);
      // setSkinLogs(response.data);
      
      // For now, we'll just set mock data
      setSkinLogs([
        {
          id: '1',
          date: '2023-05-01',
          overallCondition: 'Good',
          acneLevel: 2,
          oilinessLevel: 3,
          hydrationLevel: 4,
          notes: 'Skin feeling better today'
        }
      ]);
    } catch (err) {
      setError('Failed to fetch skin logs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new skin log (platform-agnostic logic)
  const addSkinLog = async (logData: Omit<SkinLogEntry, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would use your API service to post data
      // const response = await skinApi.createLog(userId, logData);
      // const newLog = response.data;
      
      // For now, we'll just add a mock log
      const newLog: SkinLogEntry = {
        ...logData,
        id: Date.now().toString(),
      };
      
      setSkinLogs(prev => [...prev, newLog]);
      return newLog;
    } catch (err) {
      setError('Failed to add skin log');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchSkinLogs();
  }, [userId]);

  return {
    skinLogs,
    isLoading,
    error,
    fetchSkinLogs,
    addSkinLog,
  };
};
