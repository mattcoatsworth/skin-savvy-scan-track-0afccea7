# Skin Page Styling Guide

This document provides detailed styling information for the Skin page components, ensuring consistent design across the application.

## Base Styles

### Colors

```css
/* Primary colors */
--skin-teal: #14B8A6;
--skin-blue: #3B82F6;
--skin-purple: #8B5CF6;
--skin-red: #EF4444;
--skin-green: #10B981;
--skin-yellow: #FACC15;
--skin-orange: #FB923C;

/* Rating colors */
--rating-excellent: #4ADE80;
--rating-good: #22C55E;
--rating-average: #FACC15;
--rating-fair: #FB923C;
--rating-poor: #F87171;

/* Background colors */
--bg-default: #F8FAFC;
--bg-card: #FFFFFF;
--bg-muted: #F1F5F9;
--bg-hover: #F8FAFC;

/* Text colors */
--text-primary: #1E1E1E;
--text-secondary: #555555;
--text-muted: #888888;
--text-light: #D1D5DB;
```

### Typography

```css
/* Font sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */

/* Font weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Spacing scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
```

### Borders & Shadows

```css
/* Borders */
--border-radius-sm: 0.25rem;   /* 4px */
--border-radius-md: 0.375rem;  /* 6px */
--border-radius-lg: 0.5rem;    /* 8px */
--border-radius-xl: 0.75rem;   /* 12px */
--border-radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

## Common Component Styles

### Cards

Standard card styling:

```jsx
<Card className="ios-card">
  <CardContent className="p-4">
    {/* Card content */}
  </CardContent>
</Card>
```

The `ios-card` class should include:

```css
.ios-card {
  border-radius: 12px;
  border: 1px solid #F1F5F9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.2s ease;
}

.ios-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Progress Bars

Progress bar styling:

```jsx
<Progress value={75} className="h-2" />
```

Custom colored progress bar:

```jsx
<Progress 
  value={rating} 
  className="h-2" 
  style={{ 
    backgroundColor: getRatingBgColor(rating),
    color: getRatingColor(rating) 
  }} 
/>
```

### Buttons

Primary action button:

```jsx
<button 
  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
             text-white font-medium rounded-full shadow-lg 
             hover:shadow-xl transition-all duration-200"
>
  Log New Entry
</button>
```

Secondary button:

```jsx
<button 
  className="px-4 py-2 bg-slate-100 text-slate-800 font-medium 
             rounded-md hover:bg-slate-200 transition-colors"
>
  Cancel
</button>
```

Link button:

```jsx
<Link 
  to="/monthly-analysis"
  className="block bg-slate-100 hover:bg-slate-200 transition-colors p-4 rounded-lg text-center"
>
  View Monthly Analysis
</Link>
```

### Tabs

Tab navigation:

```jsx
<Tabs 
  defaultValue="daily" 
  className="w-full"
  onValueChange={(value) => setActiveView(value as SkinViewType)}
>
  <TabsList className="grid grid-cols-3 w-full mb-6">
    <TabsTrigger value="daily">Daily</TabsTrigger>
    <TabsTrigger value="weekly">Weekly</TabsTrigger>
    <TabsTrigger value="monthly">Monthly</TabsTrigger>
  </TabsList>
  
  <TabsContent value="daily" className="mt-0">
    {/* Daily content */}
  </TabsContent>
  
  {/* Other tab contents */}
</Tabs>
```

### Badges

Rating badge:

```jsx
<span 
  className="px-2 py-0.5 text-xs rounded-full font-medium"
  style={{ 
    backgroundColor: getRatingBgColor(score),
    color: getRatingColor(score)
  }}
>
  {score} - {getRatingLabel(score)}
</span>
```

Category badge:

```jsx
<span className="inline bg-slate-200 text-slate-700 px-2 py-0.5 text-xs">
  {category}
</span>
```

Difficulty badge:

```jsx
<span className={getDifficultyBadgeClass(difficulty)}>
  {difficulty}
</span>
```

## Layout Patterns

### Grid Layouts

Two column grid:

```jsx
<div className="grid grid-cols-2 gap-2">
  {items.map(item => (
    <div key={item.id} className="bg-slate-50 p-3 rounded-lg">
      {/* Item content */}
    </div>
  ))}
</div>
```

Calendar grid:

```jsx
<div className="grid grid-cols-7 gap-1">
  {days.map((day, i) => (
    <button
      key={i}
      className="flex items-center justify-center aspect-square rounded-md text-xs"
      onClick={() => selectDay(day)}
    >
      {day}
    </button>
  ))}
</div>
```

### Flex Layouts

Space between with alignment:

```jsx
<div className="flex justify-between items-center">
  <div>{/* Left content */}</div>
  <div>{/* Right content */}</div>
</div>
```

Icon with text:

```jsx
<div className="flex items-start">
  <Icon className="text-2xl mr-3" />
  <div>
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
</div>
```

## Responsive Design

### Mobile-First Approach

All components are designed for mobile first, with a max-width container:

```jsx
<div className="max-w-md mx-auto px-4 py-6">
  {/* Page content */}
</div>
```

### Screen Size Adjustments

For larger screens:

```jsx
<div className="space-y-3 md:space-y-4 lg:space-y-6">
  {/* Content with responsive spacing */}
</div>
```

For very small screens:

```jsx
<h1 className="text-xl sm:text-2xl font-bold">Weekly Report</h1>
```

## Animation and Transitions

### Hover Effects

Card hover effect:

```css
.ios-card {
  transition: all 0.2s ease;
}

.ios-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Button Interactions

Button press effect:

```css
.action-button {
  transition: transform 0.1s ease;
}

.action-button:active {
  transform: scale(0.98);
}
```

## Accessibility Considerations

### Color Contrast

Ensure text has sufficient contrast against backgrounds:

- Regular text: 4.5:1 ratio minimum
- Large text: 3:1 ratio minimum

### Focus States

Provide visible focus states for keyboard navigation:

```css
.interactive-element:focus {
  outline: 2px solid var(--skin-blue);
  outline-offset: 2px;
}
```

### Screen Reader Support

Add appropriate ARIA labels for non-text elements:

```jsx
<button 
  aria-label="Select previous week"
  className="p-2 rounded-full hover:bg-gray-100"
  onClick={goToPreviousWeek}
>
  <ChevronLeft className="h-5 w-5" />
</button>
```

## Icon Usage

### Size Guidelines

- Small icons: 16px (h-4 w-4)
- Standard icons: 20px (h-5 w-5)
- Large icons: 24px (h-6 w-6)
- Feature icons: 32px+ (h-8 w-8 or larger)

### Icon with Text

Standard pattern:

```jsx
<div className="flex items-center">
  <Icon className="h-5 w-5 mr-2" />
  <span>Label Text</span>
</div>
```

## Custom Utility Classes

Add these utility classes to your global CSS:

```css
.ios-card {
  /* Card styling as described above */
}

.bg-skin-teal {
  background-color: var(--skin-teal);
}

.text-skin-teal {
  color: var(--skin-teal);
}

/* And similar classes for other custom colors */
```
