
import { Product } from './types';

/**
 * Gets the color for product rating
 */
export const getRatingColor = (rating: number): string => {
  if (rating >= 70) return "#4ADE80";
  if (rating >= 40) return "#FACC15";
  return "#F87171";
};

/**
 * Gets the background color for product rating
 */
export const getRatingBgColor = (rating: number): string => {
  if (rating >= 70) return "#E6F8EA";
  if (rating >= 40) return "#FEF7CD";
  return "#FFDEE2";
};

/**
 * Gets the text label for product rating
 */
export const getRatingLabel = (rating: number): string => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

/**
 * Gets the icon for a product type
 */
export const getProductTypeIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'food':
      return '🍽️';
    case 'supplement':
      return '💊';
    case 'skincare':
    default:
      return '✨';
  }
};

/**
 * Formats the product impact as a string with icon
 */
export const formatImpact = (impact: string): string => {
  switch (impact) {
    case 'Positive':
      return '✅ Positive';
    case 'Negative':
      return '❌ Negative';
    default:
      return '⚪ Neutral';
  }
};

/**
 * Filters products by search term
 */
export const filterProductsBySearch = (products: Product[], search: string): Product[] => {
  if (!search) return products;
  
  const searchLower = search.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchLower) ||
    product.brand.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower)
  );
};

/**
 * Sorts products by different criteria
 */
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const productsToSort = [...products];
  
  switch (sortBy) {
    case 'rating-high':
      return productsToSort.sort((a, b) => b.rating - a.rating);
    case 'rating-low':
      return productsToSort.sort((a, b) => a.rating - b.rating);
    case 'name-asc':
      return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return productsToSort.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return productsToSort;
  }
};
