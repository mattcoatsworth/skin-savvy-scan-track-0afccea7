# Products Page Documentation

This folder contains all components and functionality needed to recreate the Products page of the Skin Savvy application.

## Page Structure

The Products page consists of:

1. **Main Products Page with Tab Navigation**:
   - Three tabs: "My Products", "Scanned", and "Trending"
   - Each tab shows different collections of products
   - Search functionality for filtering products

2. **Products Categories**:
   - Food Products
   - Skincare Products 
   - Supplements (future implementation)

3. **Product Detail Page**:
   - Overview tab with key information
   - Details tab with in-depth product information
   - "For You" tab with personalized recommendation

4. **Additional List Pages**:
   - Scanned Products - List of all scanned skincare products
   - Trending Products - List of trending skincare products

## Key Features

1. **Product Cards**:
   - Visual representation of products
   - Circular rating indicator
   - Impact level color coding
   - Quick view of brand and description

2. **Search and Filtering**:
   - Search functionality across all products
   - Filter by rating, name, and impact

3. **Personalized Recommendations**:
   - Match ratings for individual users
   - Recommendations based on skin profile
   - Personalized insights

4. **Product Detail**:
   - Tabbed interface for different information sections
   - Benefits and concerns lists
   - Option to ask AI about the product
   - Rating visualization

5. **Product Collections**:
   - "My Products" for user's tracked products
   - "Scanned" for products the user has scanned
   - "Trending" for popular products

## File Organization

- `ProductsPage.tsx` - Main page component with tabs
- `ProductDetail.tsx` - Product detail page component
- `ProductCard.tsx` - Reusable card for product display
- `FoodCard.tsx` - Specialized card for food products
- `ScannedProducts.tsx` - Page listing all scanned products
- `TrendingProducts.tsx` - Page listing trending products
- `types.ts` - TypeScript type definitions
- `utils.ts` - Utility functions
- `route-integration.tsx` - Route integration helper

## Integration Instructions

1. Import the components you need:
   ```jsx
   import { ProductsPage, ProductDetail, ScannedProducts } from './Products';
   ```

2. Set up the routes:
   ```jsx
   import { ProductsRoutes } from './Products/route-integration';
   
   // In your Routes component
   <Routes>
     {ProductsRoutes()}
     {/* Other routes */}
   </Routes>
   ```

3. Ensure required components are available:
   - BackButton
   - ViewScoringMethod
   - DisclaimerCard
   - Progress (from UI components)
   - ScanButton

4. The page uses Tailwind CSS for styling, so make sure Tailwind is properly configured in your project.

## Design System

The Products pages follow the application's design system:
- Cards with consistent styling
- Color-coding for ratings and impacts
- Consistent spacing and typography
- Interactive elements with hover states
- Progress indicators for ratings
- Responsive design for mobile devices

## Data Structure

Products data follows this basic structure:
```typescript
{
  id: string;
  name: string;
  brand: string;
  rating: number;
  impact: "Positive" | "Neutral" | "Negative";
  description: string;
  benefits?: string[];
  concerns?: string[];
}
```

This structure allows for consistent display and filtering across different product types.
