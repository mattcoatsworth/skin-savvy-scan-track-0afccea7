
# FYP Page Styling Guide

## Card Styling

### Standard Card
```jsx
<Card className="overflow-hidden border-gray-100 shadow-md">
  <CardContent className="p-5 space-y-4">
    {/* Content */}
  </CardContent>
</Card>
```

### Card with Colored Left Border
```jsx
<Card className="border-l-4 border-l-teal-400 shadow-sm">
  <CardContent className="p-4">
    {/* Content */}
  </CardContent>
</Card>
```

### Card with Gradient Header
```jsx
<Card className="overflow-hidden shadow-md border border-gray-100">
  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3.5 rounded-t-lg">
    <h3 className="text-md font-medium text-white">{title}</h3>
  </div>
  <CardContent className="p-5 bg-white">
    {/* Content */}
  </CardContent>
</Card>
```

## Button Styling

### Primary Button
```jsx
<Button 
  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all rounded-md"
>
  Button Text
</Button>
```

### Secondary Button
```jsx
<Button 
  variant="outline" 
  className="border-teal-100 bg-teal-50 text-teal-600 hover:bg-teal-100"
>
  Button Text
</Button>
```

### Icon Button
```jsx
<Button 
  variant="outline" 
  size="sm"
  className="border-gray-200 hover:bg-gray-50 text-gray-600"
>
  <Icon className="h-4 w-4 mr-2" />
  Button Text
</Button>
```

## Tab Styling
```jsx
<TabsList className="grid grid-cols-2 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
  <TabsTrigger 
    value="tab-1" 
    className="rounded-lg flex items-center justify-center h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm"
  >
    Tab 1
  </TabsTrigger>
  <TabsTrigger 
    value="tab-2" 
    className="rounded-lg flex items-center justify-center h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm"
  >
    Tab 2
  </TabsTrigger>
</TabsList>
```

## Form Element Styling

### Input
```jsx
<Input
  placeholder="Placeholder text..."
  className="flex-1 rounded-md border-gray-200 bg-white shadow-sm"
/>
```

### Tag Styling
```jsx
<div 
  className="bg-teal-50 text-teal-700 text-sm px-3 py-1 rounded-full flex items-center"
>
  Tag Text
  <button 
    className="ml-2 text-teal-500 hover:text-teal-700"
  >
    <X className="h-3 w-3" />
  </button>
</div>
```

## Icon with Background
```jsx
<div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white shadow-sm">
  <Icon className="h-4 w-4" />
</div>
```

## Scrollable Container
```jsx
<div className="relative">
  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-slate-50 to-transparent w-8 h-full flex items-center">
    <ChevronLeft className="h-5 w-5 text-gray-500" />
  </div>
  
  <div className="flex overflow-x-auto gap-2 pb-1.5 px-6 no-scrollbar scroll-smooth">
    {/* Scrollable content */}
  </div>
  
  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-slate-50 to-transparent w-8 h-full flex items-center justify-end">
    <ChevronRight className="h-5 w-5 text-gray-500" />
  </div>
</div>
```

## Typography

### Heading Styles
```jsx
<h1 className="text-2xl font-bold">Page Title</h1>
<h2 className="text-lg font-semibold text-gray-800">Section Title</h2>
<h3 className="text-base font-medium">Card Title</h3>
<h4 className="font-medium">Subsection Title</h4>
```

### Paragraph Styles
```jsx
<p className="text-sm text-gray-600">Regular paragraph text</p>
<p className="text-sm text-gray-500 italic">Note or disclaimer text</p>
<p className="text-xs text-muted-foreground">Small helper text</p>
```

## Loading States

### Button Loading State
```jsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      Loading...
    </>
  ) : "Button Text"}
</Button>
```

### Content Loading Indicator
```jsx
<div className="flex items-center justify-center py-4">
  <div className="flex space-x-2">
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
  </div>
</div>
```

## Responsive Design Notes

- Use flex layouts for most components
- Use grid for tab layouts and equal-width columns
- All text should be readable at mobile sizes (min 14px for body, 12px for notes)
- Cards should have consistent padding (16px minimum)
- Buttons should have minimum touch target of 44px
- Use horizontal scrolling with indicators for overflowing content
