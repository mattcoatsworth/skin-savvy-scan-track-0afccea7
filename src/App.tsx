
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

const queryClient = new QueryClient();

// Layout component that includes the ChatInput and AppNavigation
const AppLayout = () => (
  <>
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <Outlet />
      </div>
      <ChatInput />
      <AppNavigation />
    </div>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
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
            <Route path="/recommendations-detail" element={<RecommendationsDetail />} />
          </Route>
          {/* Chat page doesn't need the chat input */}
          <Route path="/chat" element={<ChatPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
