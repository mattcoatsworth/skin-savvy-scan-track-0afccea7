
# PandaHouse App Documentation

## Overview

PandaHouse is a comprehensive holistic skin health platform that combines modern science with traditional wellness practices. The application helps users track, analyze and improve their skin health through personalized recommendations, energy analysis, and daily tracking features.

## Core Features

### Energy Analysis

#### Holistic Image Analysis
The Energy Analysis feature allows users to upload a selfie for metaphysical and energetic interpretation:

- **Technology**: Powered by OpenAI's GPT-4o vision model
- **Analysis Frameworks**: Traditional Chinese Medicine (TCM), chakra systems, and emotion-body maps
- **Purpose**: Provides insights into the energetic meaning of skin conditions rather than medical diagnosis
- **Integration**: Analyzes personal skin logs when available to provide more personalized insights

#### Implementation Details
- **Image Processing**: Securely processes user-uploaded images with privacy safeguards
- **User Interface**: Clean, intuitive interface with image preview, upload controls, and results display
- **Data Integration**: Combines image analysis with user's historical skin data when available
- **Context Awareness**: Adapts to different usage contexts (standalone vs. within skin logging workflow)

### Onboarding Flow

#### Dynamic Progress Bar
The onboarding flow features a responsive progress bar that:
- Shows the user's current position in the multi-step onboarding process
- Updates automatically as users advance through screens
- Calculates progress percentage based on current step and total steps
- Uses a smooth transition animation when advancing between steps

#### Gender-Specific Customization
When a user selects their gender during onboarding:

**Male Selection:**
- Automatically skips the menstrual cycle question in the onboarding sequence
- Sets default theme to "Summer" (stored in localStorage)
- Removes gender-specific UI elements from the entire app including:
  - Makeup cards in the daily logging interface
  - Menstrual cycle tracking cards in the daily logging interface
- Maintains the same step count in the progress bar for a seamless experience

**Female Selection:**
- Includes complete onboarding flow with menstrual cycle questions
- Displays all tracking options including makeup and menstrual cycle cards

This gender-based customization is implemented through conditional rendering throughout the app, with state persisted in localStorage for consistency across sessions.

### "Ask a Question" Chat Integration

#### Dynamic Chat Interface
The "Ask a Question" chat component that appears at the bottom of recommendation detail pages features:

- **Context-Aware Placeholders**: The input field's placeholder text automatically adapts to the current page's topic
- **Quick Suggestion Pills**: Horizontal scrollable suggestion buttons with common questions related to skin health
- **Visual Scroll Indicators**: Gradient fade effects with chevron icons indicate when more suggestions are available
- **Seamless Navigation**: When a user submits a question, they're directed to the full chat interface with their question pre-populated

#### Implementation Details
- The component accepts a `productTitle` prop that dynamically changes the placeholder text
- Questions are routed to the AI chat page with the initial query preserved in the navigation state
- Suggestion pills provide one-click access to common questions about the current topic
- The same component can be reused across different product and recommendation pages while maintaining contextual awareness

#### User Flow
1. User views a recommendation detail 
2. The chat box displays with contextual placeholder text
3. User can either:
   - Type a custom question about the topic
   - Click a suggestion pill for a pre-formulated question
4. Upon submission, user is directed to the full chat interface with their question ready for AI response

### Rating System

#### Overview
PandaHouse uses a comprehensive rating system (0-100 scale) to evaluate products, activities, and skin conditions. This standardized approach provides users with clear, actionable insights across the app.

#### Rating Scale Design
- **0-19**: Poor compatibility/effect (Red indicators)
- **20-39**: Fair compatibility/effect (Orange-red indicators)
- **40-59**: OK compatibility/effect (Yellow indicators)
- **60-79**: Good compatibility/effect (Light green indicators)
- **80-100**: Excellent compatibility/effect (Bright green indicators)

#### Visual Design Elements
- **Circular Progress Indicators**: Used throughout the app to display ratings with color-coded progress rings
- **Background Colors**: Light versions (20% opacity) of the main color provide subtle context
- **Label System**: Each numeric rating includes a text label (Poor, Fair, OK, Good, Great)
- **Personalization**: "For You" badge appears when the rating is personalized to the user

#### Rating Sources
1. **General Ratings**: Based on scientific research and ingredient analysis
2. **Personalized Ratings**: Modified based on user's skin type, concerns, and historical data
3. **Impact Analysis**: Products and activities are categorized as having "Positive," "Neutral," or "Negative" impact

#### Rating Calculation
Ratings are derived from multiple factors:
- Ingredient safety profiles from regulatory databases
- Scientific research on effectiveness for skin health
- Aggregate user reporting from our community
- Personalized factors based on your skin type and concerns
- Historical skin log correlations

## Design System

### Insights & Trends Badge Design

The Insights & Trends section features a specialized badge system to help users quickly identify the nature and impact of each insight:

#### Category Badges
- **Positive Impact**: Green background (#E6F7EE) with dark green text (#1E7C45), indicating beneficial insights
- **Negative Impact**: Light red background (#FBE9E9) with dark red text (#C92D2D), indicating areas of concern
- **Neutral Impact**: Light gray background (#F2F2F7) with dark gray text (#6E6E73), indicating general information

#### Icon System
Each insight card comes with a context-appropriate icon that visually represents the insight type:
- **Hydration**: Droplet icon in sky blue (#6BB9FF)
- **Sun Exposure**: Sun icon in amber (#FFC170)
- **Temperature**: Thermometer icon in red (#FF4559)
- **Weather**: Cloud-sun icon in blue (#6BB9FF)
- **Quality**: Star icon in amber (#FFC170)
- **Verified**: Badge-check icon in teal (#20B2AA)
- **Activity**: Activity icon in blue (#6BB9FF)
- **Wellness**: Heart icon in red (#FF4559)
- **Treatments**: Bandage icon in teal (#20B2AA)
- **Positive Reactions**: Smile icon in amber (#FFC170)
- **Negative Reactions**: Frown icon in red (#FF4559)
- **Consumption**: Wine/food icon in amber (#FFC170)

### Icon & Emoji Design System

The application uses a cohesive icon and emoji system following iOS-inspired design principles:

#### Icon Style Guidelines
- **Line Style**: Consistent 1.5px stroke width
- **Corners**: Slightly rounded corners (2px radius)
- **Size**: Standard 24x24px with 16x16px and 32x32px variants
- **Color**: Icons inherit the text color by default unless specifically themed
- **Touch Target**: Minimum 44x44px for all interactive icons

#### Icon Categories and Color Coding
- **Navigation Icons**: Simplified line icons in neutral gray (#6E6E73)
- **Action Icons**: Solid or filled icons in primary colors
- **Status Icons**: 
  - Success: Teal (#20B2AA)
  - Warning: Amber (#FFC170)
  - Error: Red (#FF4559)
  - Info: Blue (#6BB9FF)
- **Functional Icons**: Stroke icons in neutral gray that match the UI context

#### Emoji Usage System
PandaHouse uses a carefully curated set of emojis to communicate emotional and status information:

- **Skin Condition**: 😊 (Good), 😐 (Neutral), 😟 (Poor)
- **Reaction Indicators**: ✨ (Improvement), 🔥 (Irritation), 💧 (Hydration)
- **Progress Markers**: 🎯 (Goal), 🏆 (Achievement), 📈 (Progress)
- **Daily Factors**: 🌞 (Sun), 💤 (Sleep), 🥗 (Diet), 💪 (Exercise)

## Component Library

### SelfieCarousel Component
- Used for displaying user selfies in morning or evening formats
- Contains a carousel of images with empty states
- Supports adding and viewing images

### Implementation Guidelines
- Always wrap in a Card for consistent appearance 
- Use a two-column layout for morning/evening when both are needed
- Always have a clear label (Morning/Evening or custom)
- Use amber-500 for morning labels and indigo-400 for evening labels
- Include counter showing "X of Y images" beneath each carousel
- Support both interactive and readonly modes

### SelfieGrid Component
- Displays all user selfies in an Instagram-style grid layout
- Used on profile pages and history views
- Supports image expansion and navigation

## Technical Architecture

### AI Integration

The application integrates with the following AI services:

1. **OpenAI API**: Used for personalized recommendations, energy analysis, and detailed insights
   - Models: GPT-4o for image analysis and complex recommendations
   - Capabilities: Multimodal understanding (text + images), context awareness

2. **TogetherAI API**: Powers interactive chat experiences throughout the app
   - Features: Real-time responses, memory of conversation context
   - Integration points: Chat interface, contextual suggestion system

### Database Schema

The Supabase database includes the following key tables:

1. **skin_logs**: Records daily skin condition tracking
   - Includes ratings for hydration, oiliness, redness, etc.
   - Links to daily_factors for environmental context

2. **daily_factors**: Stores contextual information about each skin log
   - Environmental data: temperature, humidity, etc.
   - Lifestyle factors: sleep, stress, water intake

3. **selfies_metadata**: Tracks uploaded selfie information
   - Stores dates, types (AM/PM), and file paths
   - Links to user accounts

4. **product_usage**: Records product applications and effectiveness
   - Tracks products used, ratings, and notes
   - Enables correlation analysis with skin conditions

5. **food_intake**: Logs dietary information
   - Food types, quantities, and meal categories
   - Enables detection of food-related skin reactions

### API Architecture

The application uses Supabase Edge Functions for:

1. **analyze-energy**: Processes selfies for energetic analysis
   - Receives images and user context
   - Returns metaphysical interpretation of skin conditions

2. **analyze-product-for-user**: Evaluates product compatibility
   - Considers user skin profile and product ingredients
   - Returns personalized rating and recommendations

3. **generate-recipe-ideas**: Creates dietary recommendations
   - Based on skin conditions and nutritional science
   - Returns meal ideas optimized for skin health

## Getting Started

### Environment Setup

The application requires these environmental variables:

- **OPENAI_API_KEY**: For AI-powered recommendations and analysis
- **SUPABASE_URL**: Connection to the Supabase backend
- **SUPABASE_SERVICE_ROLE_KEY**: For authorized backend operations
- **SUPABASE_ANON_KEY**: For client-side Supabase operations

### Local Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables
4. Start the development server with `npm run dev`
5. Access the application at `localhost:5173`

## Best Practices

### Performance Optimization

- Image uploads are compressed client-side before transmission
- AI requests use caching to minimize redundant API calls
- User data is paginated to minimize initial load times

### Security Considerations

- User images are processed securely and not permanently stored
- API keys are properly secured in environment variables
- Database access is controlled through row-level security policies

### Accessibility

- All interactive elements are keyboard-navigable
- Color contrast meets WCAG AA standards
- Images include proper alt text descriptions
- Font sizes use relative units for better scaling

## Roadmap

### Upcoming Features

1. **Advanced Correlation Engine**: Enhanced detection of cause-effect relationships
2. **Expanded Food Database**: More comprehensive food-skin relationship data
3. **Community Insights**: Anonymized, aggregated data from similar skin profiles
4. **Expanded Metaphysical Frameworks**: Additional traditional medicine perspectives

### Known Issues

1. Image analysis may occasionally time out during high server load
2. Chat suggestions may sometimes overlap on smaller mobile screens
3. Progress indicators might show delayed updates in poor network conditions

## Appendix

### Design Tokens

For full design token documentation, see the `/src/design` directory files:

- `colors.ts`: Color palette definitions
- `typography.ts`: Typography styles and scale
- `spacing.ts`: Spacing and layout guidelines
- `borders.ts`: Border radius and styles
- `shadows.ts`: Shadow definitions
- `animations.ts`: Animation definitions
