
/**
 * This is an example of how to convert the Button component to React Native
 * using our cross-platform theme system.
 * 
 * Note: This file is for reference only and won't be used in the web app.
 * When implementing React Native, you'll need to install the react-native package.
 */

import React from 'react';
// These imports are commented out since this is just a reference file
// When implementing in React Native, uncomment these imports
// import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Mock types for React Native components to avoid TypeScript errors
interface TouchableOpacityProps {
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  children: React.ReactNode;
}

interface TextProps {
  style?: any;
  children: React.ReactNode;
}

interface ViewProps {
  style?: any;
  children: React.ReactNode;
}

// Mock components
const TouchableOpacity = ({ children, ...props }: TouchableOpacityProps) => <div {...props}>{children}</div>;
const Text = ({ children, ...props }: TextProps) => <span {...props}>{children}</span>;
const View = ({ children, ...props }: ViewProps) => <div {...props}>{children}</div>;

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = 'default',
  size = 'md',
  onPress,
  disabled = false,
  leftIcon,
  rightIcon
}: ButtonProps) => {
  // Map variant to theme styles
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return theme.components.button.primary;
      case 'secondary':
        return theme.components.button.secondary;
      case 'outline':
        return theme.components.button.outline;
      case 'ghost':
        return {};
      case 'destructive':
        return theme.components.button.destructive;
      default:
        return theme.components.button.primary;
    }
  };

  // Map size to theme styles
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return theme.components.button.sizes.sm;
      case 'md':
        return theme.components.button.sizes.md;
      case 'lg':
        return theme.components.button.sizes.lg;
      default:
        return theme.components.button.sizes.md;
    }
  };

  // Fixed type issue: Explicitly combine the style objects
  const buttonStyle = {
    ...theme.components.button.base,
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...(disabled && { opacity: 0.5 })
  };

  // Fixed type issue: Explicitly access textColor from the variant style
  const getTextColor = () => {
    if (variant === 'primary') return theme.components.button.primary.color;
    if (variant === 'secondary') return theme.components.button.secondary.color;
    if (variant === 'outline') return theme.components.button.outline.color;
    if (variant === 'destructive') return theme.components.button.destructive.color;
    return theme.colors.skin.black;
  };

  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={{ marginRight: theme.spacing.base[2] }}>{leftIcon}</View>}
      
      {typeof children === 'string' ? (
        <Text style={{ color: getTextColor(), fontWeight: theme.typography.fontWeight.medium, textAlign: 'center' }}>
          {children}
        </Text>
      ) : (
        children
      )}
      
      {rightIcon && <View style={{ marginLeft: theme.spacing.base[2] }}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

// Mock StyleSheet API
const StyleSheet = {
  create: (styles: any) => styles
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: theme.spacing.base[2],
  },
  iconRight: {
    marginLeft: theme.spacing.base[2],
  }
});

export default Button;
