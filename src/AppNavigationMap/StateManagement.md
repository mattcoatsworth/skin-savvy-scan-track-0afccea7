
# Navigation State Management

## Overview

This document outlines how navigation state should be managed in the native iOS implementation of Skin Savvy, including state preservation, deep linking, and history management.

## Navigation Stack Management

### Main Tab Navigation

- Each main tab should maintain its own navigation stack
- Switching tabs should preserve navigation stack for each tab
- Deep links should restore the appropriate tab and navigation stack

### Navigation History

- Back button should follow the actual navigation path taken by the user
- If navigating across tabs (via links), back button should return to the originating tab/screen
- Special cases for back navigation are defined in each page's documentation

## State Preservation and Restoration

### Application State

- App should save navigation state when entering background
- When returning to app, previously viewed screen should be restored
- Form data should be preserved when app is backgrounded

### Deep Linking

The app should support deep linking to specific screens. Common deep link patterns:

1. **Specific Page**: 
   - `skinsavvy://home`
   - `skinsavvy://skin`
   - `skinsavvy://fyp`
   - `skinsavvy://products`

2. **Detail Pages**:
   - `skinsavvy://product/{type}/{id}`
   - `skinsavvy://day-log/{date}`
   - `skinsavvy://recipe-ideas/{day}/{mealType}`
   - `skinsavvy://recommendations-detail/{id}`

3. **Specific Tab**:
   - `skinsavvy://fyp/meal-plan`
   - `skinsavvy://skin/weekly`
   - `skinsavvy://products/skincare`

### Form State Management

- Partially completed forms should preserve data if user navigates away
- Critical forms (like log entries) should prompt before discarding changes
- Forms should implement auto-save where appropriate

## Transition State Handling

### Loading States

- Show appropriate loading indicators during navigation transitions
- Use skeleton screens for content-heavy pages
- Loading states should not block UI for more than necessary

### Error States

- Handle navigation failures gracefully
- Provide retry options for failed loading
- Show appropriate error messages with context

## Context Management

### Passing Data Between Screens

- Use well-defined models for data passing between screens
- Avoid over-reliance on global state for screen-specific data
- Clean up context when no longer needed

### Parameter Handling

Parameters should be passed appropriately for different navigation scenarios:

- **Push navigation**: Pass model objects directly
- **Deep links**: Extract and validate parameters from URL
- **Tab switches**: Use a parameter store if data needs to persist

## Implementation Notes for Native iOS

- Use `UINavigationController` for managing navigation stacks
- Implement `UITabBarController` to manage tab-based navigation
- Use `NSUserActivity` for state restoration
- Implement `UIApplicationShortcutItem` for quick actions
- Create a navigation coordinator or router service to centralize navigation logic
- Use dependency injection for view controllers to receive necessary context
- Implement proper handling of universal links and custom URL schemes
- Consider using the Coordinator pattern for complex navigation flows
- Use proper state restoration identifiers for all view controllers
