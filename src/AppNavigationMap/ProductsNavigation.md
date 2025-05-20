
# Products Page Navigation

## Overview

The Products page helps users discover, track, and analyze skin care and food products affecting their skin health. It provides recommendations, trending products, and history of user's product usage.

## Page Structure

The Products page features:

1. **Header with Title**
2. **Category Navigation**:
   - Skincare Products
   - Food Products
   - Supplements
3. **Search Bar**
4. **Content Sections** (for each category):
   - Recommended Products
   - Recently Scanned
   - Trending Products

## Navigation Paths

### Main Navigation
- **Search Bar**: Navigates to `/search` with context of the current category
- **Category Selection**: Changes displayed content without page navigation

### Skincare Products Category
- **Recommended Product Card**: Navigates to product detail (`/product/skincare/[id]`)
- **Recently Scanned Product Card**: Navigates to product detail (`/product/skincare/[id]`)
- **Trending Product Card**: Navigates to product detail (`/product/skincare/[id]`)
- **View All Recommended**: Navigates to filtered list (`/products?filter=recommended&type=skincare`)
- **View All Recently Scanned**: Navigates to `/scanned-products`
- **View All Trending**: Navigates to `/trending-products`

### Food Products Category
- **Recommended Food Card**: Navigates to product detail (`/product/food/[id]`)
- **Recently Scanned Food Card**: Navigates to product detail (`/product/food/[id]`)
- **Trending Food Card**: Navigates to product detail (`/product/food/[id]`)
- **View All Recommended**: Navigates to filtered list (`/products?filter=recommended&type=food`)
- **View All Recently Scanned**: Navigates to `/scanned-foods`
- **View All Trending**: Navigates to `/trending-foods`

### Supplements Category
- **Supplement Card**: Navigates to supplement detail (`/supplement/[id]`)
- **View All**: Navigates to filtered list (`/products?filter=all&type=supplements`)

## Product Detail Pages

When navigating to a product detail page (`/product/[type]/[id]`), users see:

1. **Product Header**:
   - Image
   - Name
   - Brand
   - Rating

2. **Product Information**:
   - Description
   - Ingredients
   - Benefits
   - Concerns

3. **For You Section**:
   - Personalized compatibility score
   - Skin impact analysis

4. **Related Products**:
   - Similar products
   - Alternative recommendations

## Back Navigation
- **Product Detail Back Button**: Returns to Products page or referring page
- **Main Back Button**: Returns to Home page

## Implementation Notes for Native iOS

- Implement category navigation using a segmented control or tab bar
- Use collection views for grid layouts of product cards
- Product cards should show:
  - Product image
  - Name
  - Brand
  - Rating (implement using circular progress view)
- Implement search functionality with search suggestions
- Use lazy loading for product images
- Consider implementing skeleton loading states while product data is being fetched
- Product rating visualization should use circular progress indicator with color coding:
  - Green (70-100): Good compatibility
  - Yellow (40-69): Moderate compatibility
  - Red (0-39): Poor compatibility/potential issues
