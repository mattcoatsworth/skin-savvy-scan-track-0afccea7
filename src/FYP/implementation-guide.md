
# FYP Page Implementation Guide

This guide provides step-by-step instructions for implementing the For You Page (FYP) in your application.

## Prerequisites

- React application with React Router for navigation
- Tailwind CSS for styling
- ShadCN UI components
- Supabase for backend functionality
- OpenAI API key for AI analysis features

## Installation Steps

1. **Create the FYP folder structure**
   
   Create a folder called `FYP` in your source directory and copy all the files from this package.

2. **Install dependencies**
   
   Make sure you have the following dependencies installed:

   ```bash
   npm install @radix-ui/react-tabs @radix-ui/react-collapsible uuid sonner lucide-react
   ```

3. **Add FYP route to your router**
   
   Add the FYP route to your application's router configuration:

   ```jsx
   import { FYPPage } from './FYP';

   // In your router configuration:
   <Route path="/fyp" element={<FYPPage />} />
   ```

4. **Set up Supabase Edge Function**
   
   Create a new Edge Function in your Supabase project named `analyze-energy` and copy the code from `analyze-energy-function.ts`.

5. **Add environment variables**
   
   Make sure the following environment variables are set in your Supabase project:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

6. **Link from other pages**
   
   Add navigation links to the FYP page from other parts of your application, like the home page or navigation menu:

   ```jsx
   import { Link } from 'react-router-dom';

   // In your navigation component:
   <Link to="/fyp" className="nav-link">For You</Link>
   ```

## Component Structure

The FYP page is structured as follows:

- `FYPPage.tsx`: Main page component that manages tabs
  - Tab 1: `EnergyAnalysis.tsx` - Skin energy analysis component
  - Tab 2: `FYPMealPlan.tsx` - Meal plan component
  - Both tabs use: `TestAIChatBox.tsx` - AI chat interface component

## Customization Options

1. **Theme Colors**
   
   You can customize the theme colors by modifying the gradient and accent color classes in the CSS.

2. **API Integration**
   
   Replace the mock meal plan data in `FYPMealPlan.tsx` with real API calls to your backend.

3. **Additional Tabs**
   
   You can add additional tabs by extending the TabsList and adding corresponding TabsContent components.

## Testing the Implementation

1. **Navigation Test**
   Navigate to `/fyp` in your application and verify the page loads correctly.

2. **Tab Switching Test**
   Click between the "Skin Energy" and "Meal Plan" tabs to ensure they switch correctly.

3. **Image Upload Test**
   Try uploading an image in the Energy Analysis tab and check if the analysis is generated.

4. **Meal Plan Generation Test**
   Add food preferences and generate a meal plan to test the meal plan functionality.

5. **AI Chat Test**
   Test the AI chat box functionality by asking a question and verifying it redirects to the chat page.

## Troubleshooting

1. **Image Upload Issues**
   - Check browser console for errors
   - Verify image size is under the 10MB limit
   - Ensure the Supabase Edge Function is deployed correctly

2. **API Connection Issues**
   - Verify your OpenAI API key is valid
   - Check Supabase Edge Function logs for errors
   - Ensure CORS headers are configured correctly

3. **Styling Issues**
   - Make sure Tailwind CSS is properly configured
   - Check for missing ShadCN UI component styles
   - Verify that the component class names match those in the styling guide

If you encounter any issues during implementation, please refer to the code documentation or contact support for assistance.
