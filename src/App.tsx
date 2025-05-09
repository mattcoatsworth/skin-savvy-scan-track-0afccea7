
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import SkinAnalysis from './pages/SkinAnalysis';
import WeeklySkinAnalysis from './pages/WeeklySkinAnalysis';
import CategoryAnalysisDetail from "./pages/CategoryAnalysisDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<History />} />
      <Route path="/history" element={<History />} />
      <Route path="/skin-analysis" element={<SkinAnalysis />} />
      <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
      <Route path="/category-analysis/:category" element={<CategoryAnalysisDetail />} />
    </Routes>
  );
}

export default App;
