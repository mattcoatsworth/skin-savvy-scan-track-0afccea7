
/**
 * React Native Style Conversion Guide
 * 
 * This file demonstrates how to convert our web JS styles to React Native styles.
 * It's a reference for when we migrate to React Native.
 */

/**
 * Example React Native conversion:
 * 
 * Web:
 * <div 
 *   className="rounded-lg border bg-white shadow-sm p-4"
 *   style={{ 
 *     borderRadius: borders.radius.lg,
 *     padding: spacing.md
 *   }}
 * >
 *   <h2 className="text-lg font-semibold mb-2">Title</h2>
 * </div>
 * 
 * React Native:
 * <View style={styles.card}>
 *   <Text style={styles.cardTitle}>Title</Text>
 * </View>
 * 
 * const styles = StyleSheet.create({
 *   card: {
 *     borderRadius: 8,
 *     backgroundColor: colors.background.card,
 *     padding: 16,
 *     shadowColor: "#000",
 *     shadowOffset: { width: 0, height: 1 },
 *     shadowOpacity: 0.2,
 *     shadowRadius: 1.41,
 *     elevation: 2,
 *   },
 *   cardTitle: {
 *     fontSize: 18,
 *     fontWeight: '600',
 *     marginBottom: 8,
 *   }
 * });
 */

// This is just a template - in React Native you would use StyleSheet.create
export const reactNativeStyles = {
  // Card conversion
  card: {
    borderRadius: 12, // from borders.radius.xl
    backgroundColor: 'white', // from colors.background.card
    overflow: 'hidden',
    // React Native shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  
  // Button conversion
  button: {
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8, // from borders.radius.md
      paddingHorizontal: 16, // from spacing.md
      paddingVertical: 8, // from spacing.sm
    },
    variants: {
      primary: {
        backgroundColor: '#1E1E1E', // from colors.skin.black
        color: 'white',
      },
      secondary: {
        backgroundColor: '#F2F2F7', // from colors.skin.lightgray
        color: '#1E1E1E',
      },
    },
  },
  
  // Typography conversion
  text: {
    h1: {
      fontSize: 30, // from typography.fontSize['3xl']
      fontWeight: '700', // from typography.fontWeight.bold
      lineHeight: 38, // approximate from lineHeight.tight
    },
    body: {
      fontSize: 16, // from typography.fontSize.base
      fontWeight: '400', // from typography.fontWeight.normal
      lineHeight: 24, // approximate from lineHeight.normal
    },
  },
  
  /**
   * Important React Native considerations:
   * 
   * 1. Layout: React Native uses Flexbox by default
   * 2. No CSS inheritance - styles don't cascade between parent/child
   * 3. Units: No px, rem, etc. - just numbers representing density-independent pixels
   * 4. No media queries - use Dimensions API or responsive hooks
   * 5. Shadows work differently between iOS/Android
   * 6. No background gradients without libraries
   * 7. Fonts require explicit loading with useFonts hook
   */
};

export default reactNativeStyles;
