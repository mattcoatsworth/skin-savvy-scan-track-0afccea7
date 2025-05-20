
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
- Class: `ios-card` or `bg-white rounded-xl shadow-sm p-4 border`
- Container for related content
- Clean white background with subtle shadow
- Generous padding and rounded corners

### Interactive Card
- Class: `ios-card hover:shadow-md transition-shadow cursor-pointer`
- Cards that are clickable/interactive
- Includes hover effect
- Example: Product items, selectable options

### Card with Left Border Highlight
- Class: `border-l-4 border-l-[color]`
- Used to indicate card category or status
- Color semantics:
  - Green/Emerald: Health, nutrition, positive
  - Blue: Energy, hydration, information
  - Amber: Warning, needs attention
  - Red: Error, critical

## Card Layout

### Card Header
- Class: `flex justify-between items-center mb-3`
- Contains title and optional action button
- Title uses `flex items-center gap-2` for icon + text
- Action button usually `Button variant="ghost" size="sm"`

### Card Content Layout
- Class: `space-y-2` for stacked content
- Field layout: Label above value
- Label class: `text-xs text-muted-foreground mb-1`
- Value class: `text-sm`

### Card Footer
- Class: `mt-3 pt-3 border-t border-gray-100`
- Contains secondary information or actions
- Usually `flex items-center justify-between`

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

## Progress Bars

### Standard Progress Bar
- Container: `w-full bg-gray-200 rounded-full h-2`
- Fill: `bg-blue-500 h-2 rounded-full` with width as percentage
- Used for showing completion status
- Color semantics match meaning (blue for energy, green for health)

## Rating Elements

### Rating Circle
- Class: `flex flex-col items-center justify-center bg-white rounded-full h-[40px] w-[40px] shadow-sm`
- Contains day and rating value
- Day: `text-xs text-muted-foreground`
- Rating is shown through colored border or background

### Rating Badge
- Class: `px-2 py-0.5 rounded text-xs font-medium`
- Color based on rating value
- Used to show status at a glance

## Weekly History
- Days displayed in a horizontal row with `flex space-x-2`
- Each day is a small circle with date and colored indicator
- Current day has highlight effect
- Day class: `flex flex-col items-center`
- Day indicator: `h-2 w-2 rounded-full mt-1` with color based on rating

## Sections

### Content Section
- Class: `ios-section` or `mb-6`
- Consistent spacing between sections
- Clear headings with `text-lg font-semibold mb-3`

## Typography in Components

### Headings
- H1: `text-xl font-bold` - Page titles
- H2: `text-lg font-semibold` - Section titles
- H3: `text-base font-medium` - Card headings

### Body Text
- Standard: `text-base` - Main content
- Small: `text-sm` - Card content, secondary information
- Extra small: `text-xs` - Labels, metadata

## Icons in Components

- Standard size: `h-5 w-5` for card headers
- Small size: `h-4 w-4` for inline and smaller contexts
- Placement: Aligned with text using `flex items-center gap-2`
- Color typically matches contextual meaning (green for health, blue for info)
- Common icon positions:
  - Left of heading in card header
  - Right side in card footer
  - Inside buttons (left aligned with text)
  - As standalone action buttons

## Spacing Within Components

- Between cards: `mb-6` or `space-y-6` when in a flex container
- Card internal padding: `p-4` (16px)
- Between card sections: `mb-3` or `space-y-3`
- Between related items: `space-y-2`
- Icon-to-text gap: `gap-2` (8px)
- Field label to value: `mb-1` (4px)

## Card Examples

### Meal Plan Card
```jsx
<Card className="overflow-hidden border-l-4 border-l-emerald-400">
  <CardContent className="p-4">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <Salad className="h-5 w-5 text-emerald-500" />
        <h3 className="font-medium text-base">Today's Meal Plan</h3>
      </div>
      <Link to="/fyp">
        <Button variant="ghost" size="sm" className="text-xs">
          View Full Plan
        </Button>
      </Link>
    </div>
    
    <div className="space-y-2">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Breakfast</p>
        <p className="text-sm">Oatmeal with berries</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Lunch</p>
        <p className="text-sm">Grilled chicken salad</p>
      </div>
    </div>

    <div className="mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-xs text-emerald-600">Optimized for skin health</p>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  </CardContent>
</Card>
```

### Skin Energy Card
```jsx
<Card className="overflow-hidden border-l-4 border-l-blue-400">
  <CardContent className="p-4">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium text-base">Skin Energy</h3>
      </div>
      <Link to="/energy">
        <Button variant="ghost" size="sm" className="text-xs">
          View Details
        </Button>
      </Link>
    </div>
    
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm">Current Energy Level</p>
      <p className="font-semibold text-sm text-blue-600">78%</p>
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">Hydration</p>
        <p className="text-xs font-medium">Good</p>
      </div>
    </div>
  </CardContent>
</Card>
```
