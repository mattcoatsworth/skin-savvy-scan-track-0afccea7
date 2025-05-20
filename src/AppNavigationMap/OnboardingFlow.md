
# Onboarding Flow

## Overview

The onboarding flow is a sequential series of screens presented to users when they first launch the app. This process collects essential information to personalize the user's experience.

## Navigation Structure

### Flow Diagram

```
Start → Gender Selection → Birthdate → Skin Type → Skin Concerns → Skin Goals → 
[Female Path] → Menstrual Cycle → Food Allergies → Product Allergies → 
Goal Timeline → Current Routine → Routine Effectiveness → Family History → Home Page
```

### Page Details

1. **Gender Selection**
   - Path: `/onboarding`
   - Navigation: Unidirectional to Birthdate page
   - Back Button: Not visible (first screen)
   - Next Button: Enabled only when gender is selected

2. **Birthdate**
   - Path: `/onboarding/female/birthdate` or `/onboarding/male/birthdate`
   - Navigation: Unidirectional to Skin Type page
   - Back Button: Returns to Gender Selection
   - Next Button: Enabled only when birthdate is selected

3. **Skin Type**
   - Path: `/onboarding/female/skin-type` or `/onboarding/male/skin-type`
   - Navigation: Unidirectional to Skin Concerns page
   - Back Button: Returns to Birthdate page
   - Next Button: Enabled only when skin type is selected

4. **Skin Concerns**
   - Path: `/onboarding/female/skin-concerns` or `/onboarding/male/skin-concerns`
   - Navigation: Unidirectional to Skin Goals page
   - Back Button: Returns to Skin Type page
   - Next Button: Enabled only when at least one concern is selected

5. **Skin Goals**
   - Path: `/onboarding/female/skin-goals` or `/onboarding/male/skin-goals`
   - Navigation: Females proceed to Menstrual Cycle page, Males proceed to Food Allergies
   - Back Button: Returns to Skin Concerns page
   - Next Button: Enabled only when at least one goal is selected

6. **Menstrual Cycle** (Female path only)
   - Path: `/onboarding/female/menstrual-cycle`
   - Navigation: Unidirectional to Food Allergies page
   - Back Button: Returns to Skin Goals page
   - Next Button: Always enabled (cycle tracking is optional)

7. **Food Allergies**
   - Path: `/onboarding/female/food-allergies` or `/onboarding/male/food-allergies`
   - Navigation: Unidirectional to Product Allergies page
   - Back Button: Returns to previous page (Skin Goals or Menstrual Cycle)
   - Next Button: Always enabled (allergies are optional)

8. **Product Allergies**
   - Path: `/onboarding/female/product-allergies` or `/onboarding/male/product-allergies`
   - Navigation: Unidirectional to Goal Timeline page
   - Back Button: Returns to Food Allergies page
   - Next Button: Always enabled (allergies are optional)

9. **Goal Timeline**
   - Path: `/onboarding/female/goal-timeline` or `/onboarding/male/goal-timeline`
   - Navigation: Unidirectional to Current Routine page
   - Back Button: Returns to Product Allergies page
   - Next Button: Enabled only when a timeline option is selected

10. **Current Routine**
    - Path: `/onboarding/female/current-routine` or `/onboarding/male/current-routine`
    - Navigation: Unidirectional to Routine Effectiveness page
    - Back Button: Returns to Goal Timeline page
    - Next Button: Always enabled (routine details are optional)

11. **Routine Effectiveness**
    - Path: `/onboarding/female/routine-effectiveness` or `/onboarding/male/routine-effectiveness`
    - Navigation: Unidirectional to Family History page
    - Back Button: Returns to Current Routine page
    - Next Button: Always enabled (default effectiveness value is provided)

12. **Family History**
    - Path: `/onboarding/female/family-history` or `/onboarding/male/family-history`
    - Navigation: Completes onboarding and navigates to Home page
    - Back Button: Returns to Routine Effectiveness page
    - Next Button: Always enabled (family history is optional)

## Special Navigation Patterns

1. **Progress Indicator**: All screens display the current step and total steps.
2. **Back Button**: All screens except the first one have a back button.
3. **Skip Button**: Not available; all screens must be viewed in sequence.
4. **Conditional Paths**: Different questions are asked based on gender selection.

## Implementation Notes for Native iOS

- Use `UIPageViewController` for the onboarding flow to enable smooth transitions between screens
- The progress indicator can be implemented using a custom view with step indicators
- Back button should be placed in the navigation bar's left slot
- Next button should be a prominent button at the bottom of each screen
- Form validation should be implemented to enable/disable next button based on required inputs
- User data should be stored in UserDefaults during onboarding and then synced with backend upon completion
