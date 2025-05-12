
# Component Design Standards

## Selfie Section

The standardized selfie section should follow these guidelines:

1. **Layout**: Two-column grid with equal spacing between AM and PM selfies
2. **Headers**: 
   - Morning selfies use amber/orange color (#F59E0B)
   - Evening selfies use indigo color (#818CF8)
   - Font should be medium weight
   - Headers are centered above their respective images

3. **Image Containers**:
   - Square aspect ratio (1:1)
   - Light gray background (#F3F4F6)
   - Rounded corners (lg = 0.5rem)
   - Images should fill the container with object-fit: cover

4. **Empty State**:
   - Show camera icon in gray (#D1D5DB)
   - Display "No Photo" text below the icon
   - Center both vertically and horizontally

5. **Image Counter**:
   - Show "X of Y images" text below each image container
   - Use small, centered text in gray color (#6B7280)
   - Where X is the current number of images and Y is the maximum allowed

6. **Interactive Behavior**:
   - Container should be clickable to add a new photo (unless in read-only mode)
   - Open a dialog for photo capture or selection when clicked

### Example Usage

```jsx
<SelfieSection 
  amImages={morningImages}
  pmImages={eveningImages}
  onAddImage={handleAddImage}
  maxImages={4}
  readOnly={false}
  title="Selfies"
/>
```

### Props

- `amImages`: Array of morning selfie image URLs (or null)
- `pmImages`: Array of evening selfie image URLs (or null)
- `onAddImage`: Function to call when adding an image (type, index) => void
- `maxImages`: Maximum number of images allowed per type (default: 4)
- `readOnly`: Whether the section should be interactive (default: false)
- `title`: Section title (default: "Selfies")
