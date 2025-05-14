
# Skin Savvy App Documentation

## Introduction

Skin Savvy is a comprehensive skin health tracking and analysis application that helps users monitor their skin condition, track products, get personalized recommendations, and understand correlations between different factors affecting their skin health.

## App Flow Overview

The application follows a user journey that begins with onboarding, followed by daily tracking, periodic analysis, and personalized recommendations:

1. **Onboarding Flow** → Collects user information and skin concerns
2. **Home (Dashboard)** → Main hub showing daily stats and quick access to key features
3. **Skin History** → Tracking of skin condition over time
4. **Products** → Product analysis and recommendations
5. **Profile** → User settings and preferences

## Screen-by-Screen Breakdown

### 1. Splash Screen (`/`)
- **Purpose**: Initial loading screen and entry point to the app
- **Components**:
  - App logo
  - Loading indicator
- **Navigation**: Automatically navigates to Authentication or Home based on login status

### 2. Authentication (`/auth`)
- **Purpose**: User login/signup
- **Components**:
  - Login form
  - Registration form
  - API key input for testing
- **Navigation**: On successful auth, redirects to Home or Onboarding (for new users)

### 3. Onboarding (`/onboarding`)
- **Purpose**: Collects user information to personalize experience
- **Components**:
  - Multi-step form with progress indicator
  - Various input types (text, select, checkboxes)
- **Screens Include**:
  - Birthdate (`/onboarding/female/birthdate`)
  - Previous Apps (`/onboarding/female/previous-apps`)
  - Skin Type (`/onboarding/female/skin-type`)
  - Skin Concerns (`/onboarding/female/skin-concerns`)
  - Skin Goals (`/onboarding/female/skin-goals`)
  - Menstrual Cycle (`/onboarding/female/menstrual-cycle`)
  - Food Allergies (`/onboarding/female/food-allergies`)
  - Product Allergies (`/onboarding/female/product-allergies`)
  - Goal Timeline (`/onboarding/female/goal-timeline`)
  - Current Routine (`/onboarding/female/current-routine`)
  - Routine Effectiveness (`/onboarding/female/routine-effectiveness`)
  - Family History (`/onboarding/female/family-history`)
- **Navigation**: Sequential flow with next/back buttons, completes to Home

### 4. Home Dashboard (`/home`)
- **Purpose**: Main hub showing skin overview and quick access features
- **Components**:
  - Skin History chart (7-day overview)
  - Scan Button (central action)
  - Daily Skin Snapshot (current status)
  - Recent Scans carousel
  - Insights & Trends
  - Suggested Actions
  - Explore Section
- **Interactions**:
  - Tapping "Scan" opens scan options
  - Tapping Recent Scans navigates to full scan history
  - Tapping Insights navigates to detailed insights
  - Tapping Suggested Actions shows recommended actions
  - Tapping Explore items navigates to detailed content
- **Navigation**: Central hub with bottom navigation to other main sections

### 5. Recent Scans (`/recent-logs`)
- **Purpose**: Shows history of all scans performed
- **Components**:
  - Tab navigation (All/Products/Daily)
  - Scan cards with ratings and details
  - View Scoring Method link
- **Interactions**:
  - Tapping any scan card navigates to detailed view
  - Switching tabs filters different scan types
- **Navigation**: Back button returns to previous screen

### 6. Recent Scan Detail (`/recent-logs/:logId`)
- **Purpose**: Detailed view of individual scan
- **Components**:
  - Scan information (title, date, score)
  - Detailed analysis
  - Related recommendations
- **Interactions**:
  - Tapping recommendations navigates to recommendation detail
- **Navigation**: Back button returns to Recent Scans

### 7. Skin History (`/skin`)
- **Purpose**: Track skin condition over time
- **Components**:
  - Calendar view or timeline
  - Daily entries with images and ratings
  - Filters for different metrics
- **Interactions**:
  - Tapping a day navigates to day log detail
- **Navigation**: Bottom navigation, back to Home

### 8. Day Log Detail (`/day-log/:id`)
- **Purpose**: View or edit detailed information about a specific day
- **Components**:
  - Date header
  - Selfie images (AM/PM)
  - Rating metrics
  - Factors logged (products, diet, lifestyle)
- **Interactions**:
  - Edit capabilities for factors and notes
- **Navigation**: Back button returns to Skin History

### 9. Log Skin Condition (`/log-skin-condition`)
- **Purpose**: Add new skin entry
- **Components**:
  - Camera/upload interface
  - Rating sliders
  - Factor selection (products used, diet, etc.)
  - Notes field
- **Interactions**:
  - Submitting creates new entry
  - Cancel returns to previous screen
- **Navigation**: Back button returns to Home

### 10. Products (`/products`)
- **Purpose**: Analysis of product effects and recommendations
- **Components**:
  - Product categories
  - Recent scanned products
  - Product recommendations
  - Trending products
- **Interactions**:
  - Tapping product navigates to product detail
- **Navigation**: Bottom navigation, filters for different product types

### 11. Product Detail (`/product/:type/:id`)
- **Purpose**: Detailed information about specific product
- **Components**:
  - Product image and overview
  - Ingredient analysis
  - Compatibility score
  - Related products
  - "For You" analysis
- **Interactions**:
  - Add to routine button
  - View similar products
- **Navigation**: Back button returns to Products

### 12. Scanned Products (`/scanned-products`)
- **Purpose**: History of products scanned by user
- **Components**:
  - Product list with images and ratings
  - Filter/sort options
- **Interactions**:
  - Tapping product navigates to product detail
- **Navigation**: Back button returns to Products

### 13. Trending Products (`/trending-products`)
- **Purpose**: Popular and recommended products
- **Components**:
  - Trending product cards
  - Rating and popularity indicators
- **Interactions**:
  - Tapping product navigates to product detail
- **Navigation**: Back button returns to Products

### 14. Recommendations Detail (`/recommendations-detail/:id`)
- **Purpose**: Detailed view of specific recommendation
- **Components**:
  - Recommendation title and description
  - Scientific background
  - Implementation steps
  - Related products/factors
- **Interactions**:
  - Action buttons based on recommendation type
- **Navigation**: Back button returns to previous screen

### 15. AI Recommendation Detail (`/recommendations-detail/:type/:id`)
- **Purpose**: AI-generated specific recommendation
- **Components**:
  - Similar to standard recommendation but dynamically generated
  - More personalized content
- **Interactions**:
  - Same as standard recommendations
- **Navigation**: Back button returns to previous screen

### 16. Profile (`/profile`)
- **Purpose**: User profile and settings
- **Components**:
  - User information
  - Skin goal progress
  - Achievement badges
  - Settings access
- **Interactions**:
  - Edit profile
  - Navigate to settings
- **Navigation**: Bottom navigation, settings button

### 17. Settings (`/settings`)
- **Purpose**: App configuration options
- **Components**:
  - Account settings
  - Notification preferences
  - Privacy settings
  - Help/Support
  - Logout
- **Interactions**:
  - Toggle switches for preferences
  - Logout button
- **Navigation**: Back button returns to Profile

### 18. Weekly Skin Analysis (`/weekly-skin-analysis`)
- **Purpose**: Weekly summary and insights
- **Components**:
  - Weekly chart/graph
  - Comparison to previous week
  - Key insights highlighted
  - Recommended actions
- **Interactions**:
  - Tapping insights navigates to detail
  - Action buttons for recommendations
- **Navigation**: Back button returns to Home

### 19. Insights & Trends (`/insights-trends`)
- **Purpose**: Analyze correlations and trends
- **Components**:
  - Trend charts
  - Factor correlation cards
  - Time-based analysis
- **Interactions**:
  - Filtering by different factors
  - Tapping correlation navigates to detail
- **Navigation**: Back button returns to Home

### 20. Category Analysis (`/category-analysis`)
- **Purpose**: Analysis by category (food, products, lifestyle)
- **Components**:
  - Category selection
  - Impact charts
  - Positive/negative factor lists
- **Interactions**:
  - Selecting category updates analysis
  - Tapping factor navigates to detail
- **Navigation**: Back button returns to Insights

### 21. Chat (`/chat`)
- **Purpose**: AI chat assistant for skin advice
- **Components**:
  - Chat interface
  - Message history
  - Suggestion chips
- **Interactions**:
  - Text input for questions
  - Tap suggestion chips for quick queries
- **Navigation**: Back button returns to Home

### 22. Explore (`/explore`)
- **Purpose**: Educational content and community features
- **Components**:
  - Content cards (articles, tips)
  - Community section
  - Search functionality
- **Interactions**:
  - Tapping content navigates to detail
  - Filter tabs for different content types
- **Navigation**: Back button returns to Home

### 23. Explore Item Detail (`/explore/:itemId`)
- **Purpose**: Detailed view of explore content
- **Components**:
  - Content header and body
  - Related content
  - Action buttons
- **Interactions**:
  - Sharing options
  - Navigation to related content
- **Navigation**: Back button returns to Explore

### 24. Search (`/search`)
- **Purpose**: Search across all app content
- **Components**:
  - Search input
  - Filter options
  - Result categories
  - Recent searches
- **Interactions**:
  - Typing updates results
  - Tapping result navigates to detail
- **Navigation**: Back button returns to previous screen

## Global Navigation

### Bottom Navigation Bar
- **Components**: 
  - Home icon (Dashboard)
  - Skin icon (Skin History)
  - Products icon (Products section)
  - Profile icon (User profile)
  - Center Plus Button (Actions menu)
- **Interactions**:
  - Tapping icon navigates to respective section
  - Plus button opens action menu (Scan Product, Take Selfie, Ask Anything)

### Back Button
- Present on all screens except main tabs
- Returns to previous screen or hierarchical parent

## Design System

### Color Palette

#### Base Colors
- Skin Black: `#1E1E1E` - Primary text and icons
- Gray: `#F8F8FA` - Background and muted areas
- Light Gray: `#F2F2F7` - Subtle backgrounds
- White: `#FFFFFF` - Card backgrounds, foregrounds
- Flame: `#FF6B01` - Accent color, call-to-action
- Red: `#FF4559` - Error states, negative indicators
- Blue: `#6BB9FF` - Information, links
- Amber: `#FFC170` - Warnings, cautions
- Teal: `#20B2AA` - Success states, positive indicators

#### Status Colors
- Success: `#34C759`
- Warning: `#FFC170`
- Error: `#FF4559`
- Info: `#6BB9FF`

### Typography

#### Font Family
- Primary: Inter (sans-serif)
- Fallbacks: -apple-system, BlinkMacSystemFont, "Segoe UI", etc.

#### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

#### Font Weights
- normal: 400
- medium: 500
- semibold: 600
- bold: 700

#### Text Styles
- Heading 1: `text-3xl font-bold text-skin-black tracking-tight`
- Heading 2: `text-2xl font-semibold text-skin-black`
- Heading 3: `text-xl font-medium text-skin-black`
- Body: `text-base text-skin-black`
- Body Muted: `text-base text-muted-foreground`
- Small: `text-sm text-muted-foreground`
- Link: `text-blue-600 hover:underline cursor-pointer`

### Spacing

#### Base Units
- Based on 4px (0.25rem) increments
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 2.5rem (40px)
- 3xl: 3rem (48px)
- 4xl: 4rem (64px)

#### Layout Spacing
- Page padding: 1rem (16px)
- Card padding: 1.5rem (24px)
- Section margin: 1.5rem (24px)
- Stack gap (small): 0.5rem (8px)
- Stack gap (medium): 1rem (16px)
- Stack gap (large): 1.5rem (24px)

### Component Styling

#### Buttons

**Primary Button**
- Class: `bg-skin-black text-white px-6 py-3 rounded-full font-medium shadow-md`
- High contrast, prominent placement

**Secondary Button**
- Class: `bg-white text-skin-black border border-skin-black/20 px-6 py-3 rounded-full font-medium`
- Lower contrast than primary

**Icon Button**
- Class: `p-2 rounded-full bg-white flex items-center justify-center`
- Square or circular for action buttons with icons

#### Cards

**Standard Card**
- Class: `ios-card` or `bg-white rounded-3xl shadow-sm p-5 border-0`
- Clean white background with subtle shadow
- Generous padding and rounded corners

**Interactive Card**
- Class: `ios-card hover:shadow-md transition-shadow cursor-pointer`
- Cards that are clickable/interactive with hover effects

#### Form Elements

**Text Input**
- Class: `flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base`
- Clean, minimal styling with subtle border

**Checkbox/Radio**
- Simple, clean styling with custom checked state using brand colors

#### Tags/Badges

**Standard Tag**
- Class: `inline-flex items-center text-sm rounded-full px-3 py-1`
- Used for labels, categories, statuses

## Theming and Responsiveness

### Theming
- The app uses CSS variables for theming, with a light theme by default
- Theme tokens are available in the `theme` directory
- Components access theme values via Tailwind CSS classes or direct CSS variables

### Responsiveness
- Mobile-first design approach
- Max width of content area: 32rem (512px)
- Pages are centered on larger screens
- Bottom navigation adjusts for different device sizes

## Icons
- Uses the `lucide-react` icon library
- Standard icon size: `h-5 w-5`
- Icons match surrounding text color unless highlighting specific actions

## Accessibility
- Semantic HTML elements used throughout
- Sufficient color contrast for text readability
- Focus states for interactive elements
- Alternative text for images
- Appropriate ARIA attributes where needed
