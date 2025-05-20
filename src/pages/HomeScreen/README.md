
# Home Screen

This folder contains all the components and utilities needed to recreate the Home page of the Skin Savvy app.

## Components

- `Index.tsx`: Main Home page component that assembles all the parts
- `MealPlanCard.tsx`: Displays the user's daily meal plan optimized for skin health
- `SkinEnergyCard.tsx`: Shows the user's current skin energy levels and factors

## Related Files

- `skin-types.ts`: Type definitions for skin data structures
- `skin-utils.tsx`: Utility functions for skin data processing
- `useSampleData.tsx`: Custom hook providing sample data for the Home page

## Layout Structure

The Home page is organized as a vertical scroll with multiple card components:

1. **Weekly Skin Report Card** (Top)
2. **Scan Button**
3. **Daily Skin Snapshot**
4. **Meal Plan Card**
5. **Skin Energy Card**
6. **Recent Scans Carousel**
7. **Insights & Trends Section**
8. **Suggested Actions Section**
9. **Explore Section**

## Styling Notes

- Cards use consistent padding (p-4)
- Colored left borders (border-l-4) are used for visual categorization
- Cards follow the shadcn/ui Card component structure
- Font sizes follow the Tailwind scale (text-xs, text-sm, text-base)
- Spacing between cards is consistent (mb-6)

## Navigation

Each card links to appropriate detail pages. See the main AppNavigationMap for comprehensive navigation flow.
