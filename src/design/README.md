
# Design System Documentation

This folder contains documentation for the design system used throughout the application. It centralizes all design tokens, styles, and guidelines to maintain consistency across the application.

## Contents

- `colors.ts` - Color palette definitions
- `typography.ts` - Typography styles and scale
- `spacing.ts` - Spacing and layout guidelines
- `borders.ts` - Border radius and styles
- `shadows.ts` - Shadow definitions
- `animations.ts` - Animation and transition definitions
- `components.md` - Component styling guidelines

## Design Philosophy

The application follows an iOS-inspired design system with:
- Clean, minimal interfaces
- Rounded corners
- Subtle shadows
- Generous whitespace
- Accessible color palette
- Inter font family for all text elements

All UI components are built using Tailwind CSS with shadcn/ui components as a foundation.

## Card Design Standards

### Standard Card
- Border radius: `rounded-xl` (0.75rem)
- Padding: Internal padding of `p-4` or `p-6` depending on content density
- Shadow: `shadow-sm` for subtle elevation
- Border: `border` (1px) with border color matching the theme
- Spacing between cards: `mb-6` or `space-y-6` when in a flex container

### Card with Left Border Highlight
- Left border: `border-l-4` with appropriate color (example: `border-l-emerald-400`)
- Border colors follow semantic meaning:
  - Green/Emerald: Positive, health-related, nutrition
  - Blue: Information, energy, hydration
  - Amber: Warning, alerts, attention needed
  - Red: Error, critical issues

### Card Header
- Title font size: `text-base` to `text-lg` with `font-medium` or `font-semibold`
- Icon spacing: `gap-2` between icon and title
- Action button: Top right, usually `Button` with `variant="ghost"` and `size="sm"`
- Bottom margin: `mb-3` after the header

### Card Content
- Section spacing: `space-y-2` for related content groups
- Labels: `text-xs text-muted-foreground` for field labels
- Values: `text-sm` for content text
- Progress bars: Height of `h-2` with full rounded corners `rounded-full`

### Card Footer
- Top border: `border-t border-gray-100` to separate from content
- Padding top: `pt-3` or `mt-3` for spacing after content
- Display: `flex items-center justify-between` for icon and text alignment

## Icons

- Default size: `h-5 w-5` for standard icons, `h-4 w-4` for compact UI elements
- Icon colors match semantic meaning (example: `text-emerald-500` for health)
- Icon placement: Centered with text using `flex items-center gap-2`

## Typography

- Headings: Range from `text-xl font-bold` (page titles) to `text-base font-medium` (section headers)
- Body text: `text-sm` for card content, `text-xs` for secondary information
- Muted text: `text-muted-foreground` applied to labels and secondary information
- Link text: Usually paired with `Button` component using `variant="ghost"` and `size="sm"`

## Card Animation

- Subtle hover effects with `transition-colors` for interactive elements
- Smooth transitions with `duration-200` timing

## Important: Adding the Inter Font

To complete the font integration, add the following link to the `<head>` section of your index.html file:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

This will load the Inter font from Google Fonts with the necessary weights (400, 500, 600, and 700).
