
# Detail Pages Navigation

## Overview

This document covers the navigation patterns for various detail pages in the Skin Savvy app, including log entries, recommendations, products, and other specific detail views.

## Log Skin Condition Page

**Path**: `/log-skin-condition`

**Purpose**: Allow users to create a new skin condition entry for the current day.

**Navigation Elements**:
- **Back Button**: Returns to the originating page (Home, Skin, or Action Button menu)
- **Submit Button**: Saves the entry and navigates back to Skin page with updated data

## Day Log Detail

**Path**: `/day-log/[id]` or `/day-log/today`

**Purpose**: Show detailed information about a specific day's skin log.

**Navigation Elements**:
- **Back Button**: Returns to Skin page
- **Edit Button**: Switches to edit mode for the log
- **Factor Cards**: Tap navigates to factor detail pages
- **Recommendation Cards**: Tap navigates to recommendation detail pages

## Recent Log Detail

**Path**: `/recent-logs/[logId]`

**Purpose**: Show details of a recently logged scan or analysis.

**Navigation Elements**:
- **Back Button**: Returns to Recent Logs list or Home page
- **Factor Links**: Navigate to related factors
- **Action Buttons**: Navigate to specific recommended actions

## Recommendation Detail

**Path**: `/recommendations-detail/[id]` or `/recommendations-detail/[type]/[id]`

**Purpose**: Provide detailed information about a specific recommendation.

**Navigation Elements**:
- **Back Button**: Returns to previous page
- **Action Button**: Performs recommended action or marks as done
- **Related Products**: Navigate to product detail pages
- **Learn More Links**: Navigate to external resources or explore pages

## Product Detail

**Path**: `/product/[type]/[id]`

**Purpose**: Show detailed information about a specific product.

**Navigation Elements**:
- **Back Button**: Returns to previous page (Products, Search, or referral page)
- **Related Products**: Navigate to other product detail pages
- **Add to Routine Button**: Adds product to user's routine and confirms
- **Ingredient List Items**: Tap for ingredient detail popup

## Recipe Detail

**Path**: `/recipe-ideas/[day]/[mealType]`

**Purpose**: Show detailed recipe information for meal plan items.

**Navigation Elements**:
- **Back Button**: Returns to Meal Plan page
- **Ingredient List**: Displays recipe ingredients
- **Instructions**: Shows step-by-step cooking instructions
- **Nutrition Information**: Expandable section with details
- **Skin Benefits**: Information about skin health benefits

## Chat Page

**Path**: `/chat`

**Purpose**: Allow users to ask questions and receive AI-powered responses.

**Navigation Elements**:
- **Back Button**: Returns to previous page
- **Message Input**: Sends new messages
- **Suggestion Chips**: Quick access to common questions
- **Response Links**: May contain links to various pages in the app

## Weekly/Monthly Analysis Detail

**Path**: `/weekly-insight/[id]` or `/monthly-analysis/[id]`

**Purpose**: Show detailed analysis of patterns and correlations.

**Navigation Elements**:
- **Back Button**: Returns to Skin page
- **Chart Interactions**: May have interactive elements
- **Factor Links**: Navigate to factor detail pages
- **Recommendation Links**: Navigate to recommendation detail pages

## Implementation Notes for Native iOS

- Detail pages should typically use a standard `UINavigationController` pattern
- Use consistent header styles across all detail pages
- Implement smooth transitions and animations between pages
- Consider slide-in transitions for hierarchical navigation
- Allow gesture-based navigation (swipe back)
- Use appropriate sharing options for content that can be shared
- Implement proper state restoration so users can return to where they left off
- Handle deep linking to detail pages appropriately
- Ensure accessibility features work properly on all detail pages
- Consider implementing a "related content" section at the bottom of detail pages
