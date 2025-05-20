
# Navigation Colors and Styling

## Overview

This document defines the color schemes, transitions, and styling patterns used in the navigation elements of the Skin Savvy app. Consistent navigation styling is crucial for providing a cohesive user experience.

## Color Schemes

### Primary Navigation (Tab Bar)

- **Background Color**: White (`#FFFFFF`)
- **Inactive Tab Color**: Gray (`#6B7280`)
- **Active Tab Indicator**: None (flat design)
- **Tab Icons**: 
  - Active: Dark Gray (`#111827`)
  - Inactive: Gray (`#6B7280`)
- **Action Button**: 
  - Background: Black (`#000000`)
  - Icon: White (`#FFFFFF`)

### Secondary Navigation (In-Page Tabs)

- **Background Color**: Light Gray (`#F3F4F6`)
- **Inactive Tab**: Transparent
- **Active Tab**: White (`#FFFFFF`) with shadow
- **Tab Text**:
  - Active: Black (`#000000`)
  - Inactive: Gray (`#6B7280`)

### Header Navigation

- **Background**: White (`#FFFFFF`)
- **Title Color**: Black (`#000000`)
- **Back Button**: Black (`#000000`)
- **Action Icons**: Teal (`#14B8A6`) or Black (`#000000`)

## Transitions and Animations

### Page Transitions

- **Standard Page Push**: Right-to-left slide (native iOS behavior)
- **Page Pop**: Left-to-right slide (native iOS behavior)
- **Modal Presentation**: Bottom-to-top slide
- **Modal Dismissal**: Top-to-bottom slide
- **Transition Duration**: 0.3 seconds (standard iOS duration)

### Tab Transitions

- **Main Tab Bar**: Crossfade content with subtle scale (0.2s duration)
- **In-Page Tabs**: Horizontal slide in direction of tab selection

### Action Button Animation

- **Menu Open**: Radial expansion with slight bounce (0.3s duration)
- **Menu Close**: Quick collapse (0.2s duration)
- **Button Press**: Slight scale down during press state

## Navigation Patterns

### Hierarchical Navigation

- Uses standard iOS navigation controller pattern
- Title in navigation bar reflects current page
- Back button shows arrow icon only (no text)
- Deep hierarchies may use "breadcrumbs" in title

### Tab-Based Navigation

- Main tabs at bottom of screen
- In-page tabs use horizontal arrangement
- Selected tab indicated by different background and text style
- Swipe gestures supported for in-page tab switching

### Modal Navigation

- Used for temporary tasks or focused workflows
- Presents from bottom of screen
- Includes handle at top for drag dismissal
- Always includes X or Cancel button in top corner

## Accessibility Considerations

- Tab bar icons include labels
- All navigation elements meet minimum tap target size (44x44pt)
- Navigation supports VoiceOver with appropriate labels
- Dynamic Type supported in all navigation elements

## Implementation Notes for Native iOS

- Use `UITabBarController` for main navigation
- Use custom tab bar implementation for in-page tabs
- Implement `UINavigationController` for hierarchical navigation
- Create custom transitions using `UIViewControllerAnimatedTransitioning`
- Use `UITabBarAppearance` for styling tab bar (iOS 13+)
- Use `UINavigationBarAppearance` for styling navigation bar (iOS 13+)
- Implement consistent hitboxes for all navigation elements
- Ensure appropriate contrast for all text elements
