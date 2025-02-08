import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  gradientIntensity: number;
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (newTheme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('themeConfig');
    return savedTheme ? JSON.parse(savedTheme) : {
      primaryColor: '#2E7D32',
      secondaryColor: '#1565C0',
      gradientIntensity: 75,
    };
  });

  useEffect(() => {
    localStorage.setItem('themeConfig', JSON.stringify(theme));
    applyThemeToRoot(theme);
  }, [theme]);

  const applyThemeToRoot = (theme: ThemeConfig) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--primary-light', adjustColor(theme.primaryColor, 40));
    root.style.setProperty('--primary-dark', adjustColor(theme.primaryColor, -40));
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--secondary-light', adjustColor(theme.secondaryColor, 40));
    root.style.setProperty('--secondary-dark', adjustColor(theme.secondaryColor, -40));
  };

  const updateTheme = (newTheme: ThemeConfig) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to lighten/darken colors
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  
  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);
  
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
} 