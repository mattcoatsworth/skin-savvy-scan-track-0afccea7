
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if this is a recommendation detail or ai analysis page that wasn't found
  const isRecommendationDetail = location.pathname.includes("/recommendations-detail/");
  const isAiAnalysis = location.pathname.includes("/ai-analysis/");

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Page Not Found</h1>
        </header>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              {isRecommendationDetail || isAiAnalysis
                ? "Sorry, we couldn't find this analysis."
                : "The page you're looking for doesn't exist."}
            </p>
            
            <p className="text-sm mb-6 text-gray-600">
              {isRecommendationDetail || isAiAnalysis
                ? "This analysis may have been generated previously but is no longer available."
                : `The path "${location.pathname}" was not found.`}
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => window.history.back()}
                className="w-full"
              >
                Return to Previous Page
              </Button>
              
              <Link to="/skin">
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  Go to Skin Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default NotFound;
