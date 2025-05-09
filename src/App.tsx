import React from 'react';
import './App.css';
import Index from "@/pages/Index";
import History from "@/pages/History";
import Scans from "@/pages/Scans";
import DayLog from "@/pages/DayLog";
import Explore from "@/pages/Explore";
import InsightsTrends from "@/pages/InsightsTrends";
import Settings from "@/pages/Settings";
import SkinAnalysis from "@/pages/SkinAnalysis";
import WeeklySkinAnalysis from "@/pages/WeeklySkinAnalysis";
import MonthlyAnalysisDetail from "@/pages/MonthlyAnalysisDetail";
import FactorAnalysisDetail from "@/pages/FactorAnalysisDetail";
import WeeklyTrendAnalysis from "@/pages/WeeklyTrendAnalysis";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/skin-analysis" element={<SkinAnalysis />} />
        <Route path="/weekly-trend-analysis" element={<WeeklyTrendAnalysis />} />
        <Route path="/factor-analysis/:factorType" element={<FactorAnalysisDetail />} />
        <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
        <Route path="/monthly-analysis" element={<MonthlyAnalysisDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/scans" element={<Scans />} />
        <Route path="/day-log/:id" element={<DayLog />} />
        <Route path="/explore/:id" element={<Explore />} />
        <Route path="/insights-trends/:id" element={<InsightsTrends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
