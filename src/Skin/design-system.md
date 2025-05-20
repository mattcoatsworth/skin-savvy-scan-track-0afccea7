
# Skin Page Design System

## Color Palette

- **Background**: Light Gray (#F8FAFC)
- **Card Background**: White (#FFFFFF)
- **Primary Text**: Dark Gray (#1E1E1E)
- **Secondary Text**: Medium Gray (#555555)
- **Muted Text**: Gray (#888888)

### Rating Colors
- **Excellent**: Green (#4ADE80)
- **Good**: Light Green (#22C55E)
- **Average**: Yellow (#FACC15)
- **Fair**: Orange (#FB923C)
- **Poor**: Red (#F87171)

### Rating Background Colors
- **Excellent**: Light Green (#ECFDF5)
- **Good**: Pale Green (#F0FDF4)
- **Average**: Light Yellow (#FEFCE8)
- **Fair**: Light Orange (#FFF7ED)
- **Poor**: Light Red (#FEF2F2)

### Accent Colors
- **Primary Blue**: (#3B82F6)
- **Green**: (#10B981)
- **Red**: (#EF4444)
- **Purple**: (#8B5CF6)
- **Teal**: (#14B8A6)

## Typography

- **Font Family**: System UI font stack
- **Page Title**: 24px (1.5rem), Bold
- **Section Headers**: 18px (1.125rem), Semibold
- **Card Titles**: 16px (1rem), Medium
- **Body Text**: 14px (0.875rem), Regular
- **Small Text**: 12px (0.75rem), Regular
- **Badge Text**: 10px (0.625rem), Medium
- **Rating Value**: 48px (3rem), Bold

## Spacing

- **Page Padding**: 16px (1rem)
- **Card Padding**: 16px (1rem)
- **Section Spacing**: 24px (1.5rem)
- **Item Spacing**: 12px (0.75rem)
- **Inner Item Spacing**: 8px (0.5rem)
- **Card Corner Radius**: 12px (0.75rem)
- **Button Corner Radius**: 8px (0.5rem)
- **Badge Corner Radius**: 16px (1rem)

## Component Styles

### Cards
- **Base Card**:
  - White background
  - Shadow: 0 1px 3px rgba(0,0,0,0.1)
  - Border: 1px solid #F1F5F9
  - Border Radius: 12px
  - Padding: 16px

- **Interactive Card**:
  - Same as Base Card
  - Hover: Shadow 0 4px 6px rgba(0,0,0,0.1)
  - Active: Scale 0.98

### Buttons
- **Primary Button**:
  - Background: Linear gradient (blue to indigo)
  - Text: White
  - Padding: 12px 24px
  - Border Radius: 9999px (pill)
  - Shadow: 0 2px 5px rgba(0,0,0,0.1)

- **Secondary Button**:
  - Background: Light Gray (#F1F5F9)
  - Text: Dark Gray (#1E1E1E)
  - Padding: 12px 24px
  - Border Radius: 8px

- **Link Button**:
  - Text: Blue (#3B82F6)
  - No background
  - Hover: Underline

### Progress Bars
- **Height**: 8px
- **Border Radius**: 4px
- **Background**: Light Gray (#F1F5F9)
- **Fill**: Based on score/rating (uses rating colors)

### Badges
- **Corner Radius**: 9999px (pill)
- **Padding**: 2px 8px
- **Font Size**: 10px
- **Font Weight**: Medium
- **Colors**: Custom based on status

### Tabs
- **Container**:
  - Background: Light Gray (#F1F5F9)
  - Border Radius: 8px
  - Padding: 2px

- **Tab Item**:
  - Padding: 8px 16px
  - Text Size: 14px
  - Active: White background, Shadow
  - Inactive: Transparent background

## Icons
- **Size**: 20px (1.25rem)
- **Usage**: Paired with text for visual cues
- **Style**: Line icons (not filled)
- **Color**: Same as text color or accent colors

## Patterns and Elements

### Rating Visualization
- **Numeric Value**: Large, bold (i.e., "85")
- **Progress Bar**: Colored according to value
- **Text Label**: Optional ("Excellent", "Good", etc.)

### Trend Charts
- **Line Color**: Blue to indigo gradient
- **Background**: Transparent or very light gray
- **Point Markers**: Small circles
- **Axis Labels**: Small, muted text

### Date Selectors
- **Calendar Style**: Grid of dates
- **Selected Date**: Highlighted with border or background
- **Date with Entry**: Indicated with dot or color
- **No Entry**: Dimmed or gray

### Factor Cards
- **Icon**: Left-aligned, representing factor type
- **Title**: Factor type and status
- **Description**: Small, muted text with details

### Index Comparison
- **Your Score**: Prominently displayed
- **Comparison Line**: Visual indicator of where you stand
- **Reference Points**: Average, Excellent, etc.

## Responsive Design

- **Mobile First**: All elements designed for mobile screens
- **Max Width**: 448px for content container
- **Spacing Adjustments**: Reduced on smaller screens
- **Typography**: Slightly smaller on very small screens
- **Card Layout**: Stack vertically on mobile

## Interactions

- **Card Interactions**: Hover state with shadow increase
- **Button Press**: Subtle scale reduction
- **Tab Switching**: Smooth transition
- **Date Selection**: Immediate visual feedback

## Accessibility

- **Color Contrast**: Minimum 4.5:1 for text
- **Touch Targets**: Minimum 44x44px
- **Focus States**: Visible outlines for keyboard navigation
- **Screen Reader**: Appropriate ARIA labels
