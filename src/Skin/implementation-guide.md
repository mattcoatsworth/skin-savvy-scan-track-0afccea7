# Skin Page Implementation Guide

This guide provides detailed instructions for implementing the Skin page and its components in a React application.

## Overview

The Skin page consists of:
1. Main page with tab navigation
2. Three views: Daily, Weekly, Monthly
3. Detailed analysis pages
4. Various reusable components

## Prerequisites

- React 18+
- React Router v6+
- Tailwind CSS
- ShadCn UI components
- Lucide React icons

## Installation Steps

1. Create a new folder called `Skin` in your `src` directory:

```sh
mkdir -p src/Skin
```

2. Copy all files from this package into the `Skin` folder.

3. Make sure all dependencies are installed:

```sh
npm install react-router-dom lucide-react @tanstack/react-query
```

4. Add the routes to your React Router setup:

```jsx
import { SkinRoutes } from './Skin/route-integration';

// In your Routes component
<Routes>
  {SkinRoutes()}
  {/* Other routes */}
</Routes>
```

## Key Components

### SkinPage.tsx
- Main container with tab navigation
- Renders different views based on selected tab
- Contains the "Log New Entry" button

### DailySkinView.tsx
- Calendar date selector
- Today's skin card
- Daily factors list

### WeeklySkinView.tsx
- Week selector navigation
- Weekly trends chart
- Skin parameters with progress bars
- Positive/negative factors

### MonthlySkinView.tsx
- Month selector navigation
- Monthly calendar view
- Trends and statistics

### SkinAnalysis.tsx
- Full skin analysis page
- Three tabs: Current, For You, AI Analysis
- In-depth data visualization

### WeeklySkinAnalysis.tsx
- Detailed weekly report
- Daily scores breakdown
- AI insights and patterns

## Data Integration Points

The components are currently using sample data. To integrate with real data:

1. **API Integration**: Replace sample data objects with API calls:
   ```jsx
   const [skinFactors, setSkinFactors] = useState<SkinFactor[]>([]);
   
   useEffect(() => {
     // Fetch data
     const fetchSkinFactors = async () => {
       const response = await api.getSkinFactors();
       setSkinFactors(response.data);
     };
     
     fetchSkinFactors();
   }, []);
   ```

2. **State Management**: Consider using React Query for data fetching:
   ```jsx
   const { data: skinFactors, isLoading } = useQuery({
     queryKey: ['skinFactors'],
     queryFn: () => api.getSkinFactors()
   });
   ```

3. **Real-time Updates**: Use subscription or polling for live updates:
   ```jsx
   useEffect(() => {
     const interval = setInterval(() => {
       refetch();
     }, 60000); // Refresh every minute
     
     return () => clearInterval(interval);
   }, [refetch]);
   ```

## AI Integration

The AI Analysis tab requires integration with an AI service. Consider:

1. **OpenAI API**: For generating insights and patterns
2. **Local Processing**: For simple pattern detection and correlation
3. **Backend Processing**: For complex analysis on your server

Example integration:
```jsx
const generateAiAdvice = async () => {
  setAiLoading(true);
  try {
    const response = await fetch('/api/skin-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        skinFactors,
        weeklyTrendData 
      })
    });
    
    const data = await response.json();
    setAiAnalysis(data);
  } catch (error) {
    console.error('Error generating AI analysis:', error);
  } finally {
    setAiLoading(false);
  }
};
```

## Customization Options

These components can be customized in several ways:

### 1. Styling Modifications
- Edit the Tailwind classes directly
- Adjust card styling in `design-system.md`
- Modify color scheme in `utils.ts`

### 2. Layout Changes
- Change tab order in `SkinPage.tsx`
- Adjust card layouts and grid systems
- Modify spacing between elements

### 3. Feature Additions
- Add new tabs to the main navigation
- Implement additional analysis components
- Create new visualization components

## Important Files

- **types.ts**: Contains all TypeScript interfaces
- **utils.ts**: Utility functions for ratings, colors, etc.
- **route-integration.tsx**: Route configuration
- **README.md**: Documentation and overview
- **design-system.md**: Design specifications

## Common Challenges

1. **Calendar Implementation**: The calendar requires careful styling and logic for date selection
2. **Progress Bar Coloring**: Make sure to use the utility functions for consistent colors
3. **Responsive Layout**: Test on various screen sizes to ensure proper rendering
4. **Data Loading States**: Implement loading indicators for API calls
5. **Chart Rendering**: Ensure TrendChart component is properly configured

## Performance Considerations

1. **Memoization**: Use React.memo and useMemo for expensive calculations
2. **Lazy Loading**: Consider lazy loading less critical components
3. **Code Splitting**: Split large components into smaller ones
4. **Local Storage**: Cache non-critical data in localStorage

```jsx
// Example of data caching
const cachedData = localStorage.getItem('weekly-analysis');
if (cachedData && !forceRefresh) {
  setAnalysisData(JSON.parse(cachedData));
  return;
}

// Fetch fresh data if no cache or refresh needed
```

## Testing

1. **Component Testing**: Test individual components with Jest/React Testing Library
2. **Integration Testing**: Test tab switching and data loading
3. **User Flows**: Test common user journeys
4. **Responsive Testing**: Test on various viewport sizes

## Deployment

These components are ready for deployment in any React application that meets the prerequisites. No special deployment considerations are needed beyond those of a typical React app.

## Further Support

If you need additional help implementing these components:
1. Refer to the `README.md` file for general guidance
2. Check `design-system.md` for detailed styling information
3. Consult the sample data structures in the component files
