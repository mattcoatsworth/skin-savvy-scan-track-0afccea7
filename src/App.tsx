
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/history" element={<History />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skin-analysis" element={<SkinAnalysis />} />
          <Route path="/recent-logs" element={<RecentLogs />} />
          <Route path="/insights-trends" element={<InsightsTrendsPage />} />
          <Route path="/insights-trends/:insightId" element={<InsightsTrendsPage />} />
          <Route path="/suggested-actions" element={<SuggestedActionsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/log-skin-condition" element={<LogSkinCondition />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/day-log/:id" element={<DayLogDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
