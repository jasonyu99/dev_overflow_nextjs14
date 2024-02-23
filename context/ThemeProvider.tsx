'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface for the context value
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // State to manage the theme mode
  const [mode, setMode] = useState('');

  // Function to handle theme change based on localStorage and prefers-color-scheme
  const handleThemeChange = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Effect to trigger theme change when mode state changes
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  // Return the ThemeProvider component with the context provider
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to consume the theme context
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
