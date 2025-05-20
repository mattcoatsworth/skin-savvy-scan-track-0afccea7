import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import { Toaster as SonnerToaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import AppNavigation from "@/components/AppNavigation";
import SkinAuth from "@/components/SkinAuth";
import DesignExport from "@/components/DesignExport";

// Page imports
import Onboarding from "@/pages/Onboarding";
import FemaleOnboardingBirthdate from "@/pages/onboarding/FemaleOnboardingBirthdate";
import FemaleOnboardingPreviousApps from "@/pages/onboarding/FemaleOnboardingPreviousApps";
import FemaleOnboardingSkinType from "@/pages/onboarding/FemaleOnboardingSkinType";
import FemaleOnboardingSkinConcerns from "@/pages/onboarding/FemaleOnboardingSkinConcerns";
import FemaleOnboardingSkinGoals from "@/pages/onboarding/FemaleOnboardingSkinGoals";
import FemaleOnboardingMenstrualCycle from "@/pages/onboarding/FemaleOnboardingMenstrualCycle";
import FemaleOnboardingFoodAllergies from "@/pages/onboarding/FemaleOnboardingFoodAllergies";
import FemaleOnboardingProductAllergies from "@/pages/onboarding/FemaleOnboardingProductAllergies";
import FemaleOnboardingGoalTimeline from "@/pages/onboarding/FemaleOnboardingGoalTimeline";
import FemaleOnboardingCurrentRoutine from "@/pages/onboarding/FemaleOnboardingCurrentRoutine";
import FemaleOnboardingRoutineEffectiveness from "@/pages/onboarding/FemaleOnboardingRoutineEffectiveness";
import FemaleOnboardingFamilyHistory from "@/pages/onboarding/FemaleOnboardingFamilyHistory";
import SplashScreen from "@/pages/SplashScreen";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import History from "@/pages/History";
import ChatPage from "@/pages/ChatPage";
import ExplorePage from "@/pages/ExplorePage";
import SkinAnalysis from "@/pages/SkinAnalysis";
import DayLogDetail from "@/pages/DayLogDetail";
import LogSkinCondition from "@/pages/LogSkinCondition";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import RecentLogs from "@/pages/RecentLogs";
import RecentLogDetail from "@/pages/RecentLogDetail";
import SuggestedActionDetail from "@/pages/SuggestedActionDetail";
import SuggestedActionsPage from "@/pages/SuggestedActionsPage";
import ExploreItemDetail from "@/pages/ExploreItemDetail";
import RecommendationsDetail from "@/pages/RecommendationsDetail";
import ProductDetail from "@/pages/ProductDetail";
import AIRecommendationDetail from "@/pages/AIRecommendationDetail";
import Insights from "@/pages/Insights";
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
import MealPlan from "@/pages/MealPlan";
import FYP from "@/pages/FYP";
import RecipeIdeas from "@/pages/RecipeIdeas";

// Custom recommendation pages
import GentleCleanser from "@/pages/RecommendationsDetail/GentleCleanser";
import LimitDairy from "@/pages/RecommendationsDetail/LimitDairy";
import Meditation from "@/pages/RecommendationsDetail/Meditation";
import VitaminCSerum from "@/pages/RecommendationsDetail/VitaminCSerum";
import Zinc from "@/pages/RecommendationsDetail/Zinc";

const queryClient = new QueryClient();

// Layout component that includes the AppNavigation but not the ChatInput
const AppLayout = () => {
  const [session, setSession] = useState(null);
  
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 py-6 pb-24">
          <Outlet />
        </div>
        <AppNavigation />
      </div>
    </>
  );
};

// Layout for onboarding pages that don't need the navigation or chat input
const OnboardingLayout = () => (
  <div className="bg-slate-50 min-h-screen">
    <div className="max-w-md mx-auto">
      <Outlet />
    </div>
  </div>
);

// Layout without navigation for design export
const ExportLayout = () => (
  <div className="bg-white min-h-screen">
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Outlet />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <Router>
          <Routes>
            {/* Redirect root to splash screen */}
            <Route path="/" element={<SplashScreen />} />
            
            {/* Auth route */}
            <Route path="/auth" element={<SkinAuth />} />
            
            {/* Design Export route */}
            <Route element={<ExportLayout />}>
              <Route path="/design-export" element={<DesignExport />} />
            </Route>
            
            {/* Onboarding flow routes */}
            <Route element={<OnboardingLayout />}>
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Female onboarding flow */}
              <Route path="/onboarding/female/birthdate" element={<FemaleOnboardingBirthdate />} />
              <Route path="/onboarding/female/previous-apps" element={<FemaleOnboardingPreviousApps />} />
              <Route path="/onboarding/female/skin-type" element={<FemaleOnboardingSkinType />} />
              <Route path="/onboarding/female/skin-concerns" element={<FemaleOnboardingSkinConcerns />} />
              <Route path="/onboarding/female/skin-goals" element={<FemaleOnboardingSkinGoals />} />
              <Route path="/onboarding/female/menstrual-cycle" element={<FemaleOnboardingMenstrualCycle />} />
              <Route path="/onboarding/female/food-allergies" element={<FemaleOnboardingFoodAllergies />} />
              <Route path="/onboarding/female/product-allergies" element={<FemaleOnboardingProductAllergies />} />
              <Route path="/onboarding/female/goal-timeline" element={<FemaleOnboardingGoalTimeline />} />
              <Route path="/onboarding/female/current-routine" element={<FemaleOnboardingCurrentRoutine />} />
              <Route path="/onboarding/female/routine-effectiveness" element={<FemaleOnboardingRoutineEffectiveness />} />
              <Route path="/onboarding/female/family-history" element={<FemaleOnboardingFamilyHistory />} />
              
              {/* Male onboarding flow */}
              {/* Will add male onboarding steps here later */}
            </Route>

            {/* Main app routes */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Index />} />
              <Route path="/homescreen" element={React.lazy(() => import('@/pages/HomeScreen/Index'))} />
              <Route path="/skin" element={<History />} />
              <Route path="/fyp" element={<FYP />} />
              <Route path="/products" element={<Insights />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/meal-plan" element={<MealPlan />} />
              <Route path="/recipe-ideas/:day/:mealType" element={<RecipeIdeas />} />
              <Route path="/skin-analysis" element={<SkinAnalysis />} />
              <Route path="/recent-logs" element={<RecentLogs />} />
              <Route path="/recent-logs/:logId" element={<RecentLogDetail />} />
              <Route path="/insights-trends" element={<InsightsTrendsPage />} />
              <Route path="/insights-trends/:insightId" element={<InsightsTrendsPage />} />
              <Route path="/monthly-analysis" element={<MonthlyAnalysisDetail />} />
              <Route path="/suggested-actions" element={<SuggestedActionsPage />} />
              <Route path="/suggested-actions/:actionId" element={<SuggestedActionDetail />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/explore/:itemId" element={<ExploreItemDetail />} />
              <Route path="/log-skin-condition" element={<LogSkinCondition />} />
              <Route path="/product/:type/:id" element={<ProductDetail />} />
              <Route path="/product/:type/:id/testai" element={<ProductAITestPage />} />
              <Route path="/day-log/:id" element={<DayLogDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/scoring-method" element={<ScoringMethodPage />} />
              <Route path="/scanned-foods" element={<ScannedFoods />} />
              <Route path="/scanned-products" element={<ScannedProducts />} />
              <Route path="/trending-foods" element={<TrendingFoods />} />
              <Route path="/trending-products" element={<TrendingProducts />} />
              <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
              <Route path="/weekly-insight" element={<WeeklyInsight />} />
              <Route path="/category-analysis" element={<CategoryAnalysis />} />
              <Route path="/category-analysis/:category" element={<CategoryAnalysisDetail />} />
              <Route path="/correlations-detail" element={<CorrelationsDetail />} />
              
              {/* Static recommendation detail pages */}
              <Route path="/recommendations-detail/:id" element={<RecommendationsDetail />} />
              <Route path="/recommendations-detail/limit-dairy" element={<LimitDairy />} />
              <Route path="/recommendations-detail/vitamin-c-serum" element={<VitaminCSerum />} />
              <Route path="/recommendations-detail/meditation" element={<Meditation />} />
              <Route path="/recommendations-detail/zinc" element={<Zinc />} />
              <Route path="/recommendations-detail/gentle-cleanser" element={<GentleCleanser />} />
              
              {/* AI Recommendation routes - all possible formats */}
              {/* Support for /testai suffix */}
              <Route path="/recommendations-detail/:id/testai" element={<AIRecommendationDetail />} />
              <Route path="/recommendations-detail/:type/:id/testai" element={<AIRecommendationDetail />} />
              
              {/* Standard AI recommendation formats */}
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
              
              <Route path="/supplement/:id" element={<SupplementDetail />} />
            </Route>
            
            {/* Chat page doesn't need the chat input */}
            <Route path="/chat" element={<ChatPage />} />
            
            {/* Catch all for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;
