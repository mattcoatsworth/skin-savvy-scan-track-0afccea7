
import React from 'react';
import { Route } from 'react-router-dom';
import FYPPage from './FYPPage';

/**
 * FYP Route Component
 * This component can be used to integrate the FYP page into a React Router setup
 */
export const FYPRoute = () => (
  <Route path="/fyp" element={<FYPPage />} />
);

/**
 * How to integrate this FYP implementation into your routing:
 * 
 * 1. Import the FYPRoute component:
 *    import { FYPRoute } from './FYP/route-integration';
 * 
 * 2. Add it to your Routes component:
 *    <Routes>
 *      {FYPRoute()}
 *      {/* Other routes */}
 *    </Routes>
 * 
 * Or alternatively, if you're manually setting up routes:
 * 
 * <Routes>
 *   <Route path="/fyp" element={<FYPPage />} />
 *   {/* Other routes */}
 * </Routes>
 */
