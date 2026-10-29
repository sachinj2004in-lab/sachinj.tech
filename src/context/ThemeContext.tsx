import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    document.body.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    try {
      localStorage.setItem('sachin-portfolio-theme', 'light');
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    // Light Theme is the only available theme
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
