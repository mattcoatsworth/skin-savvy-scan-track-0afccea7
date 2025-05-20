
# For You Page (FYP) Documentation

This folder contains all components and functionality needed to recreate the For You Page of the Skin Savvy application.

## Page Structure

The FYP page consists of:

1. **Header Section**:
   - Back button
   - Page title and subtitle

2. **Tab Navigation**:
   - Two tabs: "Skin Energy" and "Meal Plan"
   - Tab switching functionality

3. **Skin Energy Tab**:
   - Energy Analysis component
   - Image upload functionality
   - Energy analysis results display
   - Optional 7-day healing plan

4. **Meal Plan Tab**:
   - Weekly meal plan display
   - Day selector
   - Food preferences management
   - Meal details for each day
   - Grocery list generation

5. **AI Chat Integration**:
   - Suggested questions
   - Chat input component

## File Organization

- `FYPPage.tsx` - Main page component
- `EnergyAnalysis.tsx` - Skin energy analysis component
- `FYPMealPlan.tsx` - Meal plan component 
- `TestAIChatBox.tsx` - AI chat component
- `types.ts` - TypeScript type definitions
- `utils.ts` - Utility functions

## Design System

The page follows the application's design system:
- Fonts: Inter font family
- Spacing: Based on 4px grid system
- Colors: Application color palette 
- Card styling: Rounded corners, subtle shadows
- Typography: Consistent text styles

## Dependencies

- Shadcn UI components
- Lucide React icons
- Supabase for backend functionality
- Tailwind CSS for styling
- React Router for navigation
