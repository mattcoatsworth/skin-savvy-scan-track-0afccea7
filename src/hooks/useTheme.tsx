
import { useState, useEffect } from 'react';

type ThemeType = 'default' | 'spring' | 'summer';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('skin-savvy-theme');
    
    // If no saved theme, check user gender for default
    if (!savedTheme) {
      const userGender = localStorage.getItem('userGender');
      // Set summer as default for male users
      if (userGender === 'male') {
        return 'summer';
      }
    }
    
    return (savedTheme as ThemeType) || 'default';
  });

  useEffect(() => {
    // Apply theme to document body and save to localStorage
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('skin-savvy-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
