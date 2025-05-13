
/**
 * Test service for API endpoints
 * This service provides methods to test API connectivity and functionality
 * across both web and mobile platforms
 */

import { toast } from "sonner";
import { isPlatform } from "@/utils/platform";

interface TestServiceOptions {
  endpoint?: string;
  timeout?: number;
  retries?: number;
}

interface TestResult {
  success: boolean;
  latency: number;
  message: string;
  data?: any;
}

/**
 * Service for testing API connectivity and functionality
 * This can be used to validate that both web and mobile clients 
 * have correct network access and receive expected responses
 */
export const testService = {
  /**
   * Tests API connectivity to validate both web and mobile 
   * implementations are receiving expected responses
   */
  testConnection: async (options: TestServiceOptions = {}): Promise<TestResult> => {
    const { 
      endpoint = "/api/health", 
      timeout = 5000,
      retries = 1
    } = options;
    
    const startTime = Date.now();
    let currentRetry = 0;
    let lastError: Error | null = null;
    
    try {
      while (currentRetry <= retries) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          // Platform-agnostic fetch approach
          const response = await fetch(endpoint, {
            method: "GET",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          clearTimeout(timeoutId);
          const endTime = Date.now();
          const latency = endTime - startTime;
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          return {
            success: true,
            latency,
            message: `Connection successful on ${isPlatform.web() ? 'web' : 'mobile'}`,
            data
          };
        } catch (error) {
          lastError = error as Error;
          currentRetry++;
          
          if (currentRetry <= retries) {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * currentRetry));
          }
        }
      }
      
      // If we get here, all retries failed
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      return {
        success: false,
        latency,
        message: `Connection failed after ${retries} retries: ${lastError?.message || 'Unknown error'}`
      };
    } catch (error) {
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      console.error("Test connection error:", error);
      toast.error("Error testing API connection");
      
      return {
        success: false,
        latency,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  },
  
  /**
   * Validates a specific API endpoint with expected data
   * Useful for confirming both web and mobile implementations
   * can successfully access and process the same endpoints
   */
  validateEndpoint: async (
    endpoint: string, 
    expectedDataValidator: (data: any) => boolean,
    options: TestServiceOptions = {}
  ): Promise<TestResult> => {
    try {
      const testResult = await testService.testConnection({
        endpoint,
        ...options
      });
      
      if (!testResult.success) {
        return testResult;
      }
      
      const isDataValid = expectedDataValidator(testResult.data);
      
      return {
        ...testResult,
        success: isDataValid,
        message: isDataValid 
          ? `Endpoint validation successful on ${isPlatform.web() ? 'web' : 'mobile'}` 
          : "Endpoint returned unexpected data structure"
      };
    } catch (error) {
      console.error("Validate endpoint error:", error);
      toast.error("Error validating API endpoint");
      
      return {
        success: false,
        latency: 0,
        message: error instanceof Error ? error.message : "Unknown error validating endpoint"
      };
    }
  }
};
