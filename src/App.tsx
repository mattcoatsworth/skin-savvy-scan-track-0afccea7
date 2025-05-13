
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Navigation Stacks
import MainStack from "@/navigation/MainStack";
import OnboardingStack from "@/navigation/OnboardingStack";
import { NavigationContainer } from "@/navigation/navigationUtils";

// Page imports for routes not in stacks
import SplashScreen from "@/pages/SplashScreen";
import SkinAuth from "@/components/SkinAuth";
import NotFound from "@/pages/NotFound";

// Detail pages imports
import DayLogDetail from "@/pages/DayLogDetail";
import LogSkinCondition from "@/pages/LogSkinCondition";
import RecentLogDetail from "@/pages/RecentLogDetail";
import SuggestedActionDetail from "@/pages/SuggestedActionDetail";
import SuggestedActionsPage from "@/pages/SuggestedActionsPage";
import ExploreItemDetail from "@/pages/ExploreItemDetail";
import RecommendationsDetail from "@/pages/RecommendationsDetail";
import ProductDetail from "@/pages/ProductDetail";
import AIRecommendationDetail from "@/pages/AIRecommendationDetail";
import ScoringMethodPage from "@/pages/ScoringMethodPage";
import Search from "@/pages/Search";
import WeeklySkinAnalysis from "@/pages/WeeklySkinAnalysis";
import WeeklyInsight from "@/pages/WeeklyInsight";
import TrendingProducts from "@/pages/TrendingProducts";
import TrendingFoods from "@/pages/TrendingFoods";
import ScannedProducts from "@/pages/ScannedProducts";
import ScannedFoods from "@/pages/ScannedFoods";
import InsightsTrendsPage from "@/pages/InsightsTrendsPage";
import SupplementDetail from "@/pages/SupplementDetail";
import CategoryAnalysis from "@/pages/CategoryAnalysis";
import CategoryAnalysisDetail from "@/pages/CategoryAnalysisDetail";
import MonthlyAnalysisDetail from "@/pages/MonthlyAnalysisDetail";
import CorrelationsDetail from "@/pages/CorrelationsDetail";
import ProductAITestPage from "@/pages/ProductAITestPage";

// Custom recommendation pages
import GentleCleanser from "@/pages/RecommendationsDetail/GentleCleanser";
import LimitDairy from "@/pages/RecommendationsDetail/LimitDairy";
import Meditation from "@/pages/RecommendationsDetail/Meditation";
import VitaminCSerum from "@/pages/RecommendationsDetail/VitaminCSerum";
import Zinc from "@/pages/RecommendationsDetail/Zinc";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <TooltipProvider>
        <NavigationContainer onReady={() => console.log("Navigation ready")}>
          <Router>
            <Routes>
              {/* Splash and Auth */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/auth" element={<SkinAuth />} />
              
              {/* Onboarding Stack */}
              <Route path="/onboarding/*" element={<OnboardingStack />} />
              
              {/* Main App Stack */}
              <Route path="/*" element={<MainStack />} />
              
              {/* Detail Pages */}
              <Route path="/day-log/:id" element={<DayLogDetail />} />
              <Route path="/log-skin-condition" element={<LogSkinCondition />} />
              <Route path="/recent-logs/:logId" element={<RecentLogDetail />} />
              <Route path="/suggested-actions" element={<SuggestedActionsPage />} />
              <Route path="/suggested-actions/:actionId" element={<SuggestedActionDetail />} />
              <Route path="/explore/:itemId" element={<ExploreItemDetail />} />
              
              {/* Product Pages */}
              <Route path="/product/:type/:id" element={<ProductDetail />} />
              <Route path="/product/:type/:id/testai" element={<ProductAITestPage />} />
              <Route path="/supplement/:id" element={<SupplementDetail />} />
              
              {/* Analysis and Insights Pages */}
              <Route path="/scoring-method" element={<ScoringMethodPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
              <Route path="/weekly-insight" element={<WeeklyInsight />} />
              <Route path="/insights-trends" element={<InsightsTrendsPage />} />
              <Route path="/insights-trends/:insightId" element={<InsightsTrendsPage />} />
              <Route path="/monthly-analysis" element={<MonthlyAnalysisDetail />} />
              <Route path="/scanned-foods" element={<ScannedFoods />} />
              <Route path="/scanned-products" element={<ScannedProducts />} />
              <Route path="/trending-foods" element={<TrendingFoods />} />
              <Route path="/trending-products" element={<TrendingProducts />} />
              <Route path="/category-analysis" element={<CategoryAnalysis />} />
              <Route path="/category-analysis/:category" element={<CategoryAnalysisDetail />} />
              <Route path="/correlations-detail" element={<CorrelationsDetail />} />
              
              {/* Recommendation Detail Pages */}
              <Route path="/recommendations-detail/:id" element={<RecommendationsDetail />} />
              <Route path="/recommendations-detail/limit-dairy" element={<LimitDairy />} />
              <Route path="/recommendations-detail/vitamin-c-serum" element={<VitaminCSerum />} />
              <Route path="/recommendations-detail/meditation" element={<Meditation />} />
              <Route path="/recommendations-detail/zinc" element={<Zinc />} />
              <Route path="/recommendations-detail/gentle-cleanser" element={<GentleCleanser />} />
              
              {/* AI Recommendation routes */}
              <Route path="/recommendations-detail/:id/testai" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/:type/:id/testai" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai-action-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai-factor-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai-observation-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai-timeline-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai/:type/:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/ai-:type-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/:type-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/:type/:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/action-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/factor-:id" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/*" element={<AIRecommendationDetail />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </NavigationContainer>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;
