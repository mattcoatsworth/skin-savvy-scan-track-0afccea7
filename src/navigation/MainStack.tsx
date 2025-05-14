
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Index from "@/pages/Index";
import History from "@/pages/History";
import ChatPage from "@/pages/ChatPage";
import ExplorePage from "@/pages/ExplorePage";
import SkinAnalysis from "@/pages/SkinAnalysis";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import RecentLogs from "@/pages/RecentLogs";

// Layout
import AppLayout from '@/layouts/AppLayout';

/**
 * Main navigation stack
 * Similar to how you'd define a Stack in React Navigation
 */
export function MainStack() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Index />} />
        <Route path="/skin" element={<History />} />
        <Route path="/products" element={<SkinAnalysis />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recent-logs" element={<RecentLogs />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Route>
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default MainStack;
