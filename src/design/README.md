
# Design System Documentation

This folder contains documentation for the design system used throughout the application. It centralizes all design tokens, styles, and guidelines to maintain consistency across the application.

## Contents

- `colors.ts` - Color palette definitions
- `typography.ts` - Typography styles and scale
- `spacing.ts` - Spacing and layout guidelines
- `borders.ts` - Border radius and styles
- `shadows.ts` - Shadow definitions
- `animations.ts` - Animation definitions
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

## Important: Adding the Inter Font

To complete the font integration, add the following link to the `<head>` section of your index.html file:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

This will load the Inter font from Google Fonts with the necessary weights (400, 500, 600, and 700).
