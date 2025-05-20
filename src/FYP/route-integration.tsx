
import React from 'react';
import { Route } from 'react-router-dom';
import FYPPage from './FYPPage';
import FYPMealPlan from './FYPMealPlan';
import EnergyAnalysis from './EnergyAnalysis';

/**
 * FYP Route Components
 * These components can be used to integrate the FYP pages into a React Router setup
 */
export const FYPRoutes = () => (
  <>
    <Route path="/fyp" element={<FYPPage />} />
    <Route path="/meal-plan" element={<FYPMealPlan />} />
    <Route path="/energy-analysis" element={<EnergyAnalysis />} />
  </>
);

/**
 * How to integrate these FYP page routes into your routing:
 * 
 * 1. Import the FYPRoutes component:
 *    import { FYPRoutes } from './FYP/route-integration';
 * 
 * 2. Add it to your Routes component:
 *    <Routes>
 *      {FYPRoutes()}
 *      {/* Other routes */}
 *    </Routes>
 * 
 * Or alternatively, if you're manually setting up routes:
 * 
 * <Routes>
 *   <Route path="/fyp" element={<FYPPage />} />
 *   <Route path="/meal-plan" element={<FYPMealPlan />} />
 *   <Route path="/energy-analysis" element={<EnergyAnalysis />} />
 *   {/* Other routes */}
 * </Routes>
 */
