
# FYP (For You Page) Navigation

## Overview

The FYP (For You Page) provides personalized recommendations for users based on their skin health and goals. It features two primary sections: Skin Energy analysis and personalized Meal Plans.

## Page Structure

The FYP page is structured with:

1. **Header with Back Button**
2. **Tab Navigation**:
   - Skin Energy Tab
   - Meal Plan Tab
3. **Tab Content** (changes based on selected tab)

## Tab Details

### Skin Energy Tab

Shows detailed information about the user's skin health and energy levels, including:

1. **Energy Score Card**:
   - Overall score with percentage
   - Key factors affecting score

2. **Energy Factors Section**:
   - Hydration
   - Sleep
   - Nutrition
   - Stress
   - Each with individual ratings

3. **Recommended Actions**:
   - Personalized recommendations to improve energy score

### Meal Plan Tab

Shows personalized meal plans optimized for skin health:

1. **Weekly Plan View**:
   - Day selector (buttons for each day of the week)
   - Meals for selected day (Breakfast, Lunch, Dinner, Snacks)

2. **Food Preferences Section**:
   - "Include these foods" input with tags
   - "Foods to avoid" input with tags
   - Each preference can be added via text input + button

3. **Meal Detail Cards**:
   - Recipe name
   - Brief description
   - "View Recipe" button

## Navigation Paths

### Main Navigation
- **Back Button**: Returns to previous screen (typically Home)
- **Tab Navigation**: Switches between Skin Energy and Meal Plan tabs without page navigation

### Skin Energy Tab Navigation
- **Recommendation Item Tap**: Navigates to detailed recommendation page (`/recommendations-detail/[id]`)

### Meal Plan Tab Navigation
- **Day Selection**: Changes displayed meals without page navigation
- **View Recipe Button**: Navigates to recipe details page (`/recipe-ideas/[day]/[mealType]`)
- **Add Food Preference**: Adds food item to preference list (in-place interaction)
- **Remove Food Preference**: Removes food item from preference list (in-place interaction)

## Implementation Notes for Native iOS

- Implement tabs using `UISegmentedControl` or custom tab interface
- Use `UIStackView` for laying out meal cards and preference sections
- Implement day selector using a horizontal `UICollectionView` with custom selection
- Food preferences should use a custom tag input component:
  - Text field with add button
  - Tags displayed as removable badges
  - Store preferences in UserDefaults and sync with backend
- Meal plan detail cards should use shadow and corner radius for elevation effect
- Animations should be used for tab transitions
- Consider implementing skeleton loading states while meal plan data is being fetched
