
# Action Button Navigation

## Overview

The Action Button is a central floating button in the app's bottom navigation bar that provides quick access to key creation actions. It expands to show multiple options when tapped.

## Button Location

The Action Button is positioned in the center of the bottom navigation bar, appearing as a prominent + (plus) icon.

## Expanded Menu Options

When tapped, the Action Button displays a popover menu with the following options:

1. **Log Today's Skin**
   - Icon: FileEdit (document/pencil icon)
   - Action: Navigates to `/log-skin-condition`

2. **Scan Product**
   - Icon: Camera
   - Action: Opens camera interface for product scanning

3. **Take Selfie**
   - Icon: Image (photo icon)
   - Action: Opens camera interface in selfie mode for skin analysis

4. **Ask Anything**
   - Icon: MessageSquare (chat icon)
   - Action: Navigates to `/chat`

5. **Profile Page**
   - Icon: User
   - Action: Navigates to `/profile`

## Interaction Pattern

- **Tap Action Button**: Opens the popover menu with options displayed vertically
- **Tap Outside Menu**: Dismisses the menu without taking action
- **Tap Menu Option**: Performs the associated action and dismisses the menu
- **Second Tap on Action Button**: Dismisses the menu if already open

## Navigation Paths

1. **Log Today's Skin**: 
   - Destination: `/log-skin-condition`
   - Purpose: Create a new skin condition entry for the current day

2. **Scan Product**:
   - Destination: Camera interface
   - Purpose: Scan a product barcode or packaging for identification
   - After scan: Navigate to scanned product detail or creation form

3. **Take Selfie**:
   - Destination: Camera interface (front-facing)
   - Purpose: Capture skin condition for AI analysis
   - After capture: Navigate to analysis results page

4. **Ask Anything**:
   - Destination: `/chat`
   - Purpose: Open AI chat interface for skin-related questions

5. **Profile Page**:
   - Destination: `/profile`
   - Purpose: View and edit user profile information

## Implementation Notes for Native iOS

- Implement using a custom floating button component
- Use spring animation for menu expansion and collapse
- Position menu above the button with appropriate spacing
- Implement a semi-transparent overlay behind the menu to indicate modal state
- Button should have elevation effect and prominent color
- Consider haptic feedback when opening menu
- Ensure menu doesn't extend off-screen (adjust position if needed)
- Handle cases when some actions may be unavailable (e.g., camera permissions denied)
- The menu appearance should match the app's design language
- For the expanded menu, use `UIMenu` API on iOS 13+ for native feel
