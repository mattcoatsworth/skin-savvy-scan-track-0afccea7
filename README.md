
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/14c3a734-fac8-4607-8ab1-319e2e218f4f

## Onboarding Flow

### Dynamic Progress Bar
The onboarding flow features a responsive progress bar that:
- Shows the user's current position in the multi-step onboarding process
- Updates automatically as users advance through screens
- Calculates progress percentage based on current step and total steps
- Uses a smooth transition animation when advancing between steps

### Gender-Specific Customization
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

## Rating System

### Overview
Skin Savvy uses a comprehensive rating system (0-100 scale) to evaluate products, activities, and skin conditions. This standardized approach provides users with clear, actionable insights across the app.

### Rating Scale Design
- **0-19**: Poor compatibility/effect (Red indicators)
- **20-39**: Fair compatibility/effect (Orange-red indicators)
- **40-59**: OK compatibility/effect (Yellow indicators)
- **60-79**: Good compatibility/effect (Light green indicators)
- **80-100**: Excellent compatibility/effect (Bright green indicators)

### Visual Design Elements
- **Circular Progress Indicators**: Used throughout the app to display ratings with color-coded progress rings
- **Background Colors**: Light versions (20% opacity) of the main color provide subtle context
- **Label System**: Each numeric rating includes a text label (Poor, Fair, OK, Good, Great)
- **Personalization**: "For You" badge appears when the rating is personalized to the user

### Rating Sources
1. **General Ratings**: Based on scientific research and ingredient analysis
2. **Personalized Ratings**: Modified based on user's skin type, concerns, and historical data
3. **Impact Analysis**: Products and activities are categorized as having "Positive," "Neutral," or "Negative" impact

### Rating Calculation
Ratings are derived from multiple factors:
- Ingredient safety profiles from regulatory databases
- Scientific research on effectiveness for skin health
- Aggregate user reporting from our community
- Personalized factors based on your skin type and concerns
- Historical skin log correlations

The rating system integrates with both the OpenAI API (for personalized recommendations and analysis) and TogetherAI API (for interactive chat experiences) to provide comprehensive skin health insights.

## Insights & Trends Badge Design

The Insights & Trends section features a specialized badge system to help users quickly identify the nature and impact of each insight:

### Category Badges
- **Positive Impact**: Green background (#E6F7EE) with dark green text (#1E7C45), indicating beneficial insights
- **Negative Impact**: Light red background (#FBE9E9) with dark red text (#C92D2D), indicating areas of concern
- **Neutral Impact**: Light gray background (#F2F2F7) with dark gray text (#6E6E73), indicating general information

### Icon System
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

### Hover & Interaction States
- Cards feature subtle shadow enhancement on hover
- Background lightens slightly on hover
- Cards expand with a smooth transition when clicked

## Icon & Emoji Design System

The application uses a cohesive icon and emoji system following iOS-inspired design principles:

### Icon System

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

#### Specific Icon Usage
- **Bottom Navigation**: Simple line icons that switch to filled versions when active
- **Buttons**: Smaller 16px icons paired with text for clarity
- **Headers**: 24px icons for consistent header layout
- **Cards**: 20px icons in card headers and actions
- **Lists**: 16px icons in list items for visual hierarchy

### Emoji Design System

Skin Savvy uses a carefully curated set of emojis to communicate emotional and status information:

#### Emoji Style
- **Aesthetic**: iOS-style emojis for platform consistency
- **Size**: 18px for inline text, 24px for standalone usage
- **Background**: Emojis occasionally appear with circular light backgrounds (10% opacity)

#### Emoji Usage Context
- **Skin Condition**: 😊 (Good), 😐 (Neutral), 😟 (Poor)
- **Reaction Indicators**: ✨ (Improvement), 🔥 (Irritation), 💧 (Hydration)
- **Progress Markers**: 🎯 (Goal), 🏆 (Achievement), 📈 (Progress)
- **Daily Factors**: 🌞 (Sun), 💤 (Sleep), 🥗 (Diet), 💪 (Exercise)

#### Emoji Combinations
Standardized emoji combinations are used for specific insights:
- **💧+📈**: Improved hydration
- **🥗+✨**: Positive diet impact
- **😴+👎**: Poor sleep impact
- **☀️+🔥**: Sun irritation

The icon and emoji systems are designed to work together, creating a visual language that is both functional and emotionally resonant, enhancing the user experience throughout the app.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/14c3a734-fac8-4607-8ab1-319e2e218f4f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/14c3a734-fac8-4607-8ab1-319e2e218f4f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
