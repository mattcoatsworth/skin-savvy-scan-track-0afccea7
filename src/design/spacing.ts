
/**
 * Spacing definitions for the application.
 * These are based on a 4px base unit to maintain consistency across the app.
 */

export const spacing = {
  // Base spacing units
  base: {
    px: '1px',
    '0': '0',
    '0.5': '0.125rem', // 2px
    '1': '0.25rem',    // 4px
    '1.5': '0.375rem', // 6px
    '2': '0.5rem',     // 8px
    '2.5': '0.625rem', // 10px
    '3': '0.75rem',    // 12px
    '3.5': '0.875rem', // 14px
    '4': '1rem',       // 16px
    '5': '1.25rem',    // 20px
    '6': '1.5rem',    // 24px
    '7': '1.75rem',    // 28px
    '8': '2rem',       // 32px
    '9': '2.25rem',    // 36px
    '10': '2.5rem',    // 40px
    '11': '2.75rem',   // 44px
    '12': '3rem',      // 48px
    '14': '3.5rem',    // 56px
    '16': '4rem',      // 64px
    '20': '5rem',      // 80px
    '24': '6rem',      // 96px
    '28': '7rem',      // 112px
    '32': '8rem',      // 128px
    '36': '9rem',      // 144px
    '40': '10rem',     // 160px
    '44': '11rem',     // 176px
    '48': '12rem',     // 192px
  },
  
  // Layout spacing
  layout: {
    page: {
      padding: '1rem', // 16px
      maxWidth: '640px',
      bottomMargin: '5rem' // Space for fixed elements at bottom
    },
    section: {
      margin: '1.5rem', // 24px
      padding: '1.5rem', // 24px
      gap: '1.5rem' // 24px
    },
    card: {
      padding: '1rem', // 16px
      gap: '0.5rem', // 8px
      marginBottom: '1.5rem' // 24px between cards
    }
  },
  
  // Component specific spacing
  components: {
    button: {
      paddingX: '1rem', // 16px
      paddingY: '0.5rem', // 8px
      gap: '0.5rem' // 8px
    },
    input: {
      paddingX: '0.75rem', // 12px
      paddingY: '0.5rem' // 8px
    },
    card: {
      paddingX: '1rem', // 16px
      paddingY: '1rem', // 16px
      header: {
        marginBottom: '0.75rem' // 12px
      },
      content: {
        gap: '0.5rem' // 8px
      },
      footer: {
        marginTop: '0.75rem', // 12px
        paddingTop: '0.75rem' // 12px
      },
      borderLeft: '0.25rem' // 4px for colored left borders
    },
    iconText: {
      gap: '0.5rem' // 8px between icon and text
    },
    ratingCard: {
      daySize: '2.5rem', // 40px for the day circle
      gap: '0.5rem' // 8px between days
    }
  }
};

export default spacing;
