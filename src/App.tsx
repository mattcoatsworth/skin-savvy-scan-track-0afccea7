import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'

// Pages
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import SkinAuth from './components/SkinAuth'
import DayLogDetail from './pages/DayLogDetail'
import History from './pages/History'
import WeeklyInsight from './pages/WeeklyInsight'
import RecommendationsDetail from './pages/RecommendationsDetail'
import Explore from './pages/Explore'
import ExploreDetail from './pages/ExploreDetail'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<SkinAuth />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            <Route path="/day-log/:date" element={<AuthGuard><DayLogDetail /></AuthGuard>} />
            <Route path="/history" element={<AuthGuard><History /></AuthGuard>} />
            <Route path="/weekly-insight" element={<AuthGuard><WeeklyInsight /></AuthGuard>} />
            <Route path="/recommendations-detail/:recommendationId" element={<AuthGuard><RecommendationsDetail /></AuthGuard>} />
            <Route path="/recommendations-detail/:recommendationId/:testai" element={<AuthGuard><RecommendationsDetail /></AuthGuard>} />
            <Route path="/explore" element={<AuthGuard><Explore /></AuthGuard>} />
            <Route path="/explore/:exploreId" element={<AuthGuard><ExploreDetail /></AuthGuard>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
