
/**
 * This is an example of how to convert the Button component to React Native
 * using our cross-platform theme system.
 * 
 * Note: This file is for reference only and won't be used in the web app.
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../theme';

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

  const buttonStyle = {
    ...theme.components.button.base,
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...(disabled && { opacity: 0.5 })
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      
      {typeof children === 'string' ? (
        <Text style={[styles.text, { color: buttonStyle.color }]}>
          {children}
        </Text>
      ) : (
        children
      )}
      
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </TouchableOpacity>
  );
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
