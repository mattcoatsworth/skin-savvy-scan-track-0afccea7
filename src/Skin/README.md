# Skin Page Documentation

This folder contains all components and functionality needed to recreate the Skin page of the Skin Savvy application.

## Page Structure

The Skin page consists of:

1. **Main Page with Tab Navigation**:
   - Three tabs: "Daily", "Weekly", and "Monthly"
   - Each tab shows different views of skin health data

2. **Daily View**:
   - Calendar/Date Selector
   - Today's Skin Card (or selected day)
   - Daily Factors List

3. **Weekly View**:
   - Week Selector
   - Weekly Overview Chart
   - Weekly Insights
   - Key Factors (positive/negative)

4. **Monthly View**:
   - Month Selector
   - Monthly Calendar View
   - Monthly Stats
   - Monthly Insights

5. **Full Skin Analysis Page**:
   - Current skin condition
   - Weekly trend
   - Contributing factors
   - Personalized recommendations
   - AI analysis

6. **Weekly Skin Analysis Page**:
   - Skin health overview
   - Daily scores
   - Skin index comparison
   - AI analysis section
   - Skin parameters
   - Influential factors

## File Organization

- `SkinPage.tsx` - Main page component with tabs
- `DailySkinView.tsx` - Daily view tab component
- `WeeklySkinView.tsx` - Weekly view tab component
- `MonthlySkinView.tsx` - Monthly view tab component
- `SkinAnalysis.tsx` - Full skin analysis page
- `WeeklySkinAnalysis.tsx` - Weekly detailed analysis page
- `FactorsList.tsx` - Reusable component for skin factors
- `SkinAnalysisCard.tsx` - Reusable card for skin analysis
- `types.ts` - TypeScript type definitions
- `utils.ts` - Utility functions
- `route-integration.tsx` - Route integration helper

## Key Features

1. **Interactive Calendar/Date Selection**:
   - Select different days to view skin condition
   - Color-coded indicators for skin health

2. **Today's Skin Card**:
   - Shows current skin condition
   - Provides analysis and metrics
   - Links to detailed view

3. **Skin Factor Tracking**:
   - Food and diet
   - Supplements
   - Makeup and products
   - Environmental factors
   - Lifestyle influences

4. **Trend Visualization**:
   - Daily/weekly/monthly trends
   - Progress tracking
   - Parameter-specific metrics

5. **AI Analysis**:
   - Pattern detection
   - Correlations between factors and skin health
   - Personalized recommendations
   - Focus areas and challenges

## Design System

The page follows the application's design system:
- Cards with consistent styling
- Clean typography hierarchy
- Color-coding for ratings and metrics
- Consistent spacing between sections
- Interactive elements with hover states
- Progress indicators for metrics

## Integration Instructions

1. Import the components you need:
   ```jsx
   import { SkinPage, SkinAnalysis, WeeklySkinAnalysis } from './Skin';
   ```

2. Set up the routes:
   ```jsx
   import { SkinRoutes } from './Skin/route-integration';
   
   // In your Routes component
   <Routes>
     {SkinRoutes()}
     {/* Other routes */}
   </Routes>
   ```

3. Ensure required components are available:
   - BackButton
   - TrendChart
   - SkinIndexComparison
   - ViewScoringMethod
   - Disclaimer
   - Progress (from UI components)

4. The page uses Tailwind CSS for styling, so make sure Tailwind is properly configured in your project.
