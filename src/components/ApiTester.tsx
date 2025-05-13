
import React, { useState } from "react";
import { useApiTest } from "@/hooks/useApiTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Component for testing API functionality
 * This helps validate that the same API calls work correctly
 * across web and React Native versions of the app
 */
const ApiTester: React.FC = () => {
  const { testConnection, validateEndpoint, isLoading, results } = useApiTest();
  const [endpoint, setEndpoint] = useState("/api/health");
  const [timeout, setTimeout] = useState(5000);
  const [retries, setRetries] = useState(1);
  const [validatorCode, setValidatorCode] = useState("(data) => {\n  return true;\n}");
  const [useValidator, setUseValidator] = useState(false);

  const handleTest = async () => {
    try {
      if (useValidator) {
        // Create validator function from string
        let validator;
        try {
          // eslint-disable-next-line no-new-func
          validator = new Function('data', `return (${validatorCode})(data)`);
        } catch (e) {
          toast.error("Invalid validator function");
          return;
        }
        
        await validateEndpoint(endpoint, validator, { 
          timeout, 
          retries,
          onSuccess: () => toast.success("Endpoint validation successful"),
          onError: () => toast.error("Endpoint validation failed") 
        });
      } else {
        await testConnection({ 
          endpoint, 
          timeout, 
          retries,
          onSuccess: () => toast.success("Connection test successful"),
          onError: () => toast.error("Connection test failed") 
        });
      }
    } catch (error) {
      console.error("API test error:", error);
      toast.error("An error occurred while testing");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Tester</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/endpoint"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (ms)</Label>
              <Input
                id="timeout"
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retries">Retries</Label>
              <Input
                id="retries"
                type="number"
                value={retries}
                onChange={(e) => setRetries(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="use-validator"
              checked={useValidator}
              onCheckedChange={setUseValidator}
              disabled={isLoading}
            />
            <Label htmlFor="use-validator">Use Data Validator</Label>
          </div>
          
          {useValidator && (
            <div className="space-y-2">
              <Label htmlFor="validator">Validator Function</Label>
              <Textarea
                id="validator"
                value={validatorCode}
                onChange={(e) => setValidatorCode(e.target.value)}
                placeholder="(data) => { return true; }"
                className="font-mono text-sm"
                rows={5}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Enter a function that takes the API response data and returns true if valid
              </p>
            </div>
          )}
          
          <Button 
            onClick={handleTest} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Testing..." : "Test API"}
          </Button>
          
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          
          {results && !isLoading && (
            <div className="mt-4 p-3 border rounded-md bg-muted/50">
              <div className="flex items-center mb-2">
                <div className={`h-2 w-2 rounded-full mr-2 ${results.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <p className="font-medium">{results.success ? 'Success' : 'Failed'}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Latency: {results.latency}ms</p>
              <p className="text-sm break-words">{results.message}</p>
              {results.data && (
                <pre className="mt-2 p-2 bg-muted font-mono text-xs overflow-auto max-h-40 rounded">
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiTester;
