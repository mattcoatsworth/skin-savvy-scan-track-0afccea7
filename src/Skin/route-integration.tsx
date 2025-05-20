
import React from 'react';
import { Route } from 'react-router-dom';
import SkinPage from './SkinPage';
import SkinAnalysis from './SkinAnalysis';
import WeeklySkinAnalysis from './WeeklySkinAnalysis';

/**
 * Skin Route Components
 * These components can be used to integrate the Skin pages into a React Router setup
 */
export const SkinRoutes = () => (
  <>
    <Route path="/skin" element={<SkinPage />} />
    <Route path="/skin-analysis" element={<SkinAnalysis />} />
    <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
  </>
);

/**
 * How to integrate these Skin page routes into your routing:
 * 
 * 1. Import the SkinRoutes component:
 *    import { SkinRoutes } from './Skin/route-integration';
 * 
 * 2. Add it to your Routes component:
 *    <Routes>
 *      {SkinRoutes()}
 *      [Other routes]
 *    </Routes>
 * 
 * Or alternatively, if you're manually setting up routes:
 * 
 * <Routes>
 *   <Route path="/skin" element={<SkinPage />} />
 *   <Route path="/skin-analysis" element={<SkinAnalysis />} />
 *   <Route path="/weekly-skin-analysis" element={<WeeklySkinAnalysis />} />
 *   [Other routes]
 * </Routes>
 */
