
import React from 'react';
import { Route } from 'react-router-dom';
import LazyComponentWrapper from '@/components/LazyComponentWrapper';
import HomeNewUser from './HomeNewUser';

/**
 * New User Pages Route Components
 * These components can be used to integrate the new user pages into a React Router setup
 */
export const NewUserRoutes = () => (
  <>
    <Route path="/home-new-user" element={<HomeNewUser />} />
    <Route 
      path="/fyp-new-user" 
      element={
        <LazyComponentWrapper 
          component={React.lazy(() => import('./FYPNewUser'))} 
        />
      } 
    />
    <Route 
      path="/skin-new-user" 
      element={
        <LazyComponentWrapper 
          component={React.lazy(() => import('./SkinNewUser'))} 
        />
      } 
    />
    <Route 
      path="/products-new-user" 
      element={
        <LazyComponentWrapper 
          component={React.lazy(() => import('./ProductsNewUser'))} 
        />
      } 
    />
    <Route 
      path="/new-user-pages" 
      element={
        <LazyComponentWrapper 
          component={React.lazy(() => import('./NewUserPages'))} 
        />
      } 
    />
  </>
);

/**
 * How to integrate these new user pages routes into your routing:
 * 
 * 1. Import the NewUserRoutes component:
 *    import { NewUserRoutes } from './pages/route-integration';
 * 
 * 2. Add it to your Routes component:
 *    <Routes>
 *      {NewUserRoutes()}
 *      [Other routes]
 *    </Routes>
 * 
 * Or alternatively, if you're manually setting up routes:
 * 
 * <Routes>
 *   <Route path="/home-new-user" element={<HomeNewUser />} />
 *   <Route path="/fyp-new-user" element={<FYPNewUser />} />
 *   <Route path="/skin-new-user" element={<SkinNewUser />} />
 *   <Route path="/products-new-user" element={<ProductsNewUser />} />
 *   <Route path="/new-user-pages" element={<NewUserPages />} />
 *   [Other routes]
 * </Routes>
 */
