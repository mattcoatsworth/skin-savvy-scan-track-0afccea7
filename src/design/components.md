
# Component Design Guidelines

This document outlines the styling guidelines for common components used throughout the application.
All components follow iOS-inspired design principles with a focus on accessibility and usability.

## Buttons

### Primary Button
- Class: `ios-btn` or `bg-skin-black text-white px-6 py-3 rounded-full font-medium shadow-md`
- Used for primary actions
- High contrast, prominent placement
- Example: Save, Continue, Submit

### Secondary Button
- Class: `bg-white text-skin-black border border-skin-black/20 px-6 py-3 rounded-full font-medium`
- Used for secondary actions
- Lower contrast than primary
- Example: Cancel, Back, Alternative option

### Icon Button
- Class: `p-2 rounded-full bg-white flex items-center justify-center`
- Used for action buttons with icons
- Square or circular
- Example: Back, Close, Add

## Cards

### Standard Card
- Class: `ios-card` or `bg-white rounded-3xl shadow-sm p-5 border-0`
- Container for related content
- Clean white background with subtle shadow
- Generous padding and rounded corners

### Interactive Card
- Class: `ios-card hover:shadow-md transition-shadow cursor-pointer`
- Cards that are clickable/interactive
- Includes hover effect
- Example: Product items, selectable options

## Form Elements

### Text Input
- Class: `flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base`
- Clean, minimal styling
- Clear focus states
- Subtle border

### Textarea
- Class: `min-h-[120px] rounded-md border border-input`
- Multi-line text input
- Consistent with other form elements

### Checkbox/Radio
- Simple, clean styling
- Custom checked state with brand colors
- Easy to tap target size

## Tags/Badges

### Standard Tag
- Class: `factor-tag` or `inline-flex items-center text-sm rounded-full px-3 py-1`
- Used for labels, categories, statuses
- Small, compact
- Various background colors based on meaning

## Sections

### Content Section
- Class: `ios-section` or `mb-8`
- Consistent spacing between sections
- Clear headings

## Typography

### Headings
- H1: `text-3xl font-bold text-skin-black tracking-tight`
- H2: `text-2xl font-semibold text-skin-black`
- H3: `text-xl font-medium text-skin-black`

### Body Text
- Standard: `text-base text-skin-black`
- Muted: `text-base text-muted-foreground`

### Small Text
- Class: `text-sm text-muted-foreground`
- Used for secondary information

## Icons

- Use icons from `lucide-react` 
- Standard size: `h-5 w-5`
- Consistent placement within components
- Match color with surrounding text unless highlighting
