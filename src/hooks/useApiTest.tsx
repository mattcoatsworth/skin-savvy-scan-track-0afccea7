
import { useState } from 'react';
import { testService } from '@/services/api';

interface ApiTestOptions {
  endpoint?: string;
  timeout?: number;
  retries?: number;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

/**
 * Hook for testing API connectivity and validating endpoints
 * Works consistently across web and mobile platforms
 */
export const useApiTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    success: boolean;
    latency: number;
    message: string;
    data?: any;
  } | null>(null);

  /**
   * Tests basic API connectivity
   */
  const testConnection = async (options: ApiTestOptions = {}) => {
    try {
      setIsLoading(true);
      
      const result = await testService.testConnection({
        endpoint: options.endpoint,
        timeout: options.timeout,
        retries: options.retries
      });
      
      setResults(result);
      
      if (result.success && options.onSuccess) {
        options.onSuccess(result);
      } else if (!result.success && options.onError) {
        options.onError(result);
      }
      
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        latency: 0,
        message: error instanceof Error ? error.message : "Unknown error"
      };
      setResults(errorResult);
      
      if (options.onError) {
        options.onError(errorResult);
      }
      
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Tests a specific API endpoint and validates the returned data
   */
  const validateEndpoint = async (
    endpoint: string,
    validator: (data: any) => boolean,
    options: ApiTestOptions = {}
  ) => {
    try {
      setIsLoading(true);
      
      const result = await testService.validateEndpoint(
        endpoint, 
        validator,
        {
          timeout: options.timeout,
          retries: options.retries
        }
      );
      
      setResults(result);
      
      if (result.success && options.onSuccess) {
        options.onSuccess(result);
      } else if (!result.success && options.onError) {
        options.onError(result);
      }
      
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        latency: 0,
        message: error instanceof Error ? error.message : "Unknown error"
      };
      setResults(errorResult);
      
      if (options.onError) {
        options.onError(errorResult);
      }
      
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    results,
    testConnection,
    validateEndpoint
  };
};
