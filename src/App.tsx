
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate, ScrollRestoration } from "react-router-dom";
import { ApiKeyProvider } from "./contexts/ApiKeyContext";
import Index from "./pages/Index";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SkinAnalysis from "./pages/SkinAnalysis";
import RecentLogs from "./pages/RecentLogs";
import InsightsTrendsPage from "./pages/InsightsTrendsPage";
import SuggestedActionsPage from "./pages/SuggestedActionsPage";
import ExplorePage from "./pages/ExplorePage";
import LogSkinCondition from "./pages/LogSkinCondition";
import ProductDetail from "./pages/ProductDetail";
import DayLogDetail from "./pages/DayLogDetail";
import ChatPage from "./pages/ChatPage";
import Search from "./pages/Search";
import AppNavigation from "./components/AppNavigation";
import ChatInput from "./components/ChatInput";
import ExploreItemDetail from "./pages/ExploreItemDetail";
import RecentLogDetail from "./pages/RecentLogDetail";
import SuggestedActionDetail from "./pages/SuggestedActionDetail";
import MonthlyAnalysisDetail from "./pages/MonthlyAnalysisDetail";
import ScoringMethodPage from "./pages/ScoringMethodPage";
import ScannedFoods from "./pages/ScannedFoods";
import ScannedProducts from "./pages/ScannedProducts";
import TrendingFoods from "./pages/TrendingFoods";
import TrendingProducts from "./pages/TrendingProducts";
import WeeklySkinAnalysis from "./pages/WeeklySkinAnalysis";
import CategoryAnalysisDetail from "./pages/CategoryAnalysisDetail";
import CorrelationsDetail from "./pages/CorrelationsDetail";
import RecommendationsDetail from "./pages/RecommendationsDetail";
import SupplementDetail from "./pages/SupplementDetail";
import Onboarding from "./pages/Onboarding";
import SplashScreen from "./pages/SplashScreen";
import FemaleOnboardingBirthdate from "./pages/onboarding/FemaleOnboardingBirthdate";
import FemaleOnboardingPreviousApps from "./pages/onboarding/FemaleOnboardingPreviousApps";

const queryClient = new QueryClient();

// Layout component that includes the AppNavigation but not the ChatInput
const AppLayout = () => (
  <>
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 pb-0">
        <Outlet />
      </div>
      <ChatInput />
      <AppNavigation />
    </div>
    <ScrollRestoration /> {/* Add ScrollRestoration to manage scroll position */}
  </>
);

// Layout for onboarding pages that don't need the navigation or chat input
const OnboardingLayout = () => (
  <div className="bg-slate-50 min-h-screen">
    <div className="max-w-md mx-auto">
      <Outlet />
      <ScrollRestoration /> {/* Add ScrollRestoration here too */}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to splash screen */}
            <Route path="/" element={<SplashScreen />} />
            
            {/* Onboarding flow routes */}
            <Route element={<OnboardingLayout />}>
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Female onboarding flow */}
              <Route path="/onboarding/female/birthdate" element={<FemaleOnboardingBirthdate />} />
              <Route path="/onboarding/female/previous-apps" element={<FemaleOnboardingPreviousApps />} />
              {/* Will add more female onboarding steps here later */}
              
              {/* Male onboarding flow */}
              {/* Will add male onboarding steps here later */}
            </Route>

            {/* Main app routes */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Index />} />
              <Route path="/history" element={<History />} />
              <Route path="/products" element={<Insights />} />
              <Route path="/profile" element={<Profile />} />
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
              <Route path="/day-log/:id" element={<DayLogDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/scoring-method" element={<ScoringMethodPage />} />
              <Route path="/scanned-foods" element={<ScannedFoods />} />
              <Route path="/scanned-products" element={<ScannedProducts />} />
              <Route path="/trending-foods" element={<TrendingFoods />} />
              <Route path="/trending-products" element={<TrendingProducts />} />
              <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
              <Route path="/category-analysis/:category" element={<CategoryAnalysisDetail />} />
              <Route path="/correlations-detail" element={<CorrelationsDetail />} />
              <Route path="/recommendations-detail/:id" element={<RecommendationsDetail />} />
              <Route path="/supplement/:id" element={<SupplementDetail />} />
            </Route>
            
            {/* Chat page doesn't need the chat input */}
            <Route path="/chat" element={<ChatPage />} />
            
            {/* Catch all for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;
