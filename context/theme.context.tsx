import React, {
    createContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
  } from 'react';
  import { useColorScheme } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { LightTheme, DarkTheme, ThemeName, Theme } from '../constants/theme';
  
  type ThemeContextType = {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => Promise<void>;
    isSystemTheme: boolean;
    setSystemTheme: (useSystem: boolean) => Promise<void>;
  };
  
  const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
  
  export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme();
    const [themeName, setThemeName] = useState<ThemeName>('light');
    const [isSystemTheme, setIsSystemTheme] = useState(true);
  
    // Memoized theme object
    const theme = useMemo(() => (
      themeName === 'dark' ? DarkTheme : LightTheme
    ), [themeName]);
  
    // Load saved preferences
    useEffect(() => {
      const loadPreferences = async () => {
        try {
          const [savedTheme, systemPref] = await Promise.all([
            AsyncStorage.getItem('userTheme'),
            AsyncStorage.getItem('useSystemTheme'),
          ]);
  
          if (systemPref === 'false' && savedTheme) {
            setThemeName(savedTheme as ThemeName);
            setIsSystemTheme(false);
          } else {
            setThemeName(systemTheme || 'light');
            setIsSystemTheme(true);
          }
        } catch (error) {
          console.error('Error loading theme:', error);
        }
      };
  
      loadPreferences();
    }, []);
  
    // Handle system theme changes
    useEffect(() => {
      if (isSystemTheme && systemTheme) {
        setThemeName(systemTheme);
      }
    }, [systemTheme, isSystemTheme]);
  
    // Unified toggle function
    const toggleTheme = useCallback(async () => {
      const newTheme = themeName === 'dark' ? 'light' : 'dark';
      await Promise.all([
        AsyncStorage.setItem('userTheme', newTheme),
        AsyncStorage.setItem('useSystemTheme', 'false'),
      ]);
      setThemeName(newTheme);
      setIsSystemTheme(false);
    }, [themeName]);
  
    // System theme handler
    const setSystemTheme = useCallback(async (useSystem: boolean) => {
      if (useSystem) {
        await AsyncStorage.setItem('useSystemTheme', 'true');
        setIsSystemTheme(true);
        setThemeName(systemTheme || 'light');
      } else {
        await AsyncStorage.setItem('useSystemTheme', 'false');
        setIsSystemTheme(false);
      }
    }, [systemTheme]);
  
    // Memoized context value
    const contextValue = useMemo(() => ({
      theme,
      isDarkMode: themeName === 'dark',
      toggleTheme,
      isSystemTheme,
      setSystemTheme,
    }), [theme, themeName, toggleTheme, isSystemTheme, setSystemTheme]);
  
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  };