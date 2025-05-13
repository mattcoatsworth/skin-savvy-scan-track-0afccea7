
import { useState, useEffect } from 'react';

type ThemeType = 'default' | 'spring' | 'summer';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('skin-savvy-theme');
    return (savedTheme as ThemeType) || 'default';
  });

  useEffect(() => {
    // Apply theme to document body and save to localStorage
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('skin-savvy-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
