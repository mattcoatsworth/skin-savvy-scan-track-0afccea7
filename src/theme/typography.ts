
/**
 * Typography definitions for cross-platform use
 */

export const fontFamily = {
  sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  // React Native will use platform-specific fonts
  sansNative: {
    ios: "San Francisco",
    android: "Roboto",
    default: "System"
  },
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
};

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48
};

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
};

export const letterSpacing = {
  tight: -0.025,
  normal: 0,
  wide: 0.025
};

// Predefined text styles
export const textVariants = {
  h1: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: 'inherit'
  },
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    color: 'inherit'
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    color: 'inherit'
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    color: 'inherit'
  },
  bodyMuted: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    color: 'inherit' // will be text-muted-foreground in the app
  },
  small: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    color: 'inherit' // will be text-muted-foreground in the app
  },
  link: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit', // will be text-blue-600 in the app
    textDecoration: 'none'
  }
};

export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  textVariants
};

export type TypographyType = typeof typography;
