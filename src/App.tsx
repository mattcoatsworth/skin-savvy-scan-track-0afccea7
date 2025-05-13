
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryAnalysis from "./pages/CategoryAnalysis";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import GentleCleanserPage from "./pages/RecommendationsDetail/GentleCleanser";
import LimitDairyPage from "./pages/RecommendationsDetail/LimitDairy";
import MeditationPage from "./pages/RecommendationsDetail/Meditation";
import PersonalizedGentleCleanserPage from "./pages/RecommendationsDetail/PersonalizedGentleCleanser";
import PersonalizedLimitDairyPage from "./pages/RecommendationsDetail/PersonalizedLimitDairy";
import PersonalizedMeditationPage from "./pages/RecommendationsDetail/PersonalizedMeditation";

// Create placeholder components for missing pages
const CategoryDetail = () => <div>Category Detail Page</div>;
const DayLog = () => <div>Day Log Page</div>;
const Explore = () => <div>Explore Page</div>;
const Product = () => <div>Product Page</div>;
const SuggestedActions = () => <div>Suggested Actions Page</div>;
const AIRecommendationDetail = () => <div>AI Recommendation Detail Page</div>;

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
