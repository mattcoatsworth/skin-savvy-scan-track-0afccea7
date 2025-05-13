import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryAnalysis from "./pages/CategoryAnalysis";
import CategoryDetail from "./pages/CategoryDetail";
import DayLog from "./pages/DayLog";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SuggestedActions from "./pages/SuggestedActions";
import AIRecommendationDetail from "./pages/RecommendationsDetail/AIRecommendationDetail";
import GentleCleanserPage from "./pages/RecommendationsDetail/GentleCleanser";
import LimitDairyPage from "./pages/RecommendationsDetail/LimitDairy";
import MeditationPage from "./pages/RecommendationsDetail/Meditation";
import PersonalizedGentleCleanserPage from "./pages/RecommendationsDetail/PersonalizedGentleCleanser";
import PersonalizedLimitDairyPage from "./pages/RecommendationsDetail/PersonalizedLimitDairy";
import PersonalizedMeditationPage from "./pages/RecommendationsDetail/PersonalizedMeditation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category-analysis" element={<CategoryAnalysis />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
        <Route path="/day-log/:dateId" element={<DayLog />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:productType/:productId" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/suggested-actions" element={<SuggestedActions />} />
        
        {/* AI Recommendation Detail Page */}
        <Route path="/recommendations-detail/:type/:id/:testai" element={<AIRecommendationDetail />} />
        
        {/* Static recommendation detail pages */}
        <Route path="/recommendations-detail/gentle-cleanser" element={<PersonalizedGentleCleanserPage />} />
        <Route path="/recommendations-detail/limit-dairy" element={<PersonalizedLimitDairyPage />} />
        <Route path="/recommendations-detail/meditation" element={<PersonalizedMeditationPage />} />
        
        {/* Add route for legacy paths to redirect to new personalized versions */}
        <Route path="/recommendations-detail/personalized-gentle-cleanser" element={<PersonalizedGentleCleanserPage />} />
        <Route path="/recommendations-detail/personalized-limit-dairy" element={<PersonalizedLimitDairyPage />} />
        <Route path="/recommendations-detail/personalized-meditation" element={<PersonalizedMeditationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
