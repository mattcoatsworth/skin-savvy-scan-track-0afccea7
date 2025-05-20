
import React from 'react';
import { Route } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import ProductDetail from './ProductDetail';
import ScannedProducts from './ScannedProducts';
import TrendingProducts from './TrendingProducts';

/**
 * Products Route Components
 * These components can be used to integrate the Products pages into a React Router setup
 */
export const ProductsRoutes = () => (
  <>
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:type/:id" element={<ProductDetail />} />
    <Route path="/scanned-products" element={<ScannedProducts />} />
    <Route path="/trending-products" element={<TrendingProducts />} />
  </>
);

/**
 * How to integrate these Products page routes into your routing:
 * 
 * 1. Import the ProductsRoutes component:
 *    import { ProductsRoutes } from './Products/route-integration';
 * 
 * 2. Add it to your Routes component:
 *    <Routes>
 *      {ProductsRoutes()}
 *      [Other routes]
 *    </Routes>
 * 
 * Or alternatively, if you're manually setting up routes:
 * 
 * <Routes>
 *   <Route path="/products" element={<ProductsPage />} />
 *   <Route path="/product/:type/:id" element={<ProductDetail />} />
 *   <Route path="/scanned-products" element={<ScannedProducts />} />
 *   <Route path="/trending-products" element={<TrendingProducts />} />
 *   [Other routes]
 * </Routes>
 */
