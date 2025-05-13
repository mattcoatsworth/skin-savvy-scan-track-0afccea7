
/**
 * Border definitions for cross-platform use
 */

export const radius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999
};

export const width = {
  none: 0,
  hairline: 0.5, // React Native uses this term for the thinnest possible line
  thin: 1,
  thick: 2,
  heavy: 4
};

export const style = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
};

export const presets = {
  card: {
    borderWidth: width.none,
    borderRadius: radius['3xl']
  },
  input: {
    borderWidth: width.thin,
    borderRadius: radius.xl
  },
  button: {
    borderWidth: width.none,
    borderRadius: radius.full
  },
  buttonRect: {
    borderWidth: width.none,
    borderRadius: radius.xl
  },
  pill: {
    borderWidth: width.none,
    borderRadius: radius.full
  },
  tag: {
    borderWidth: width.none,
    borderRadius: radius.full
  }
};

export const borders = {
  radius,
  width,
  style,
  presets
};

export type BordersType = typeof borders;
