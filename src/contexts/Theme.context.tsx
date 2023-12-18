import { useEffect, useContext, createContext, useState, FC, ReactNode } from "react";

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
    children: ReactNode;
}

type ThemeContextProps = {
    theme: Theme;
    toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'theme';

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light')

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)

        window.localStorage.setItem(THEME_STORAGE_KEY, newTheme)
        document.body.classList.remove(theme);
        document.body.classList.add(newTheme);
    }

    useEffect(() => {
        const localTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
        const preferredColorScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches
            ? "dark"
            : "light";
        const initialTheme = localTheme || preferredColorScheme;

        setTheme(initialTheme)
        document.body.classList.add(initialTheme)
    }, [])

    const value = { theme, toggleTheme }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
  
    if (context === null) {
      throw new Error("useTheme must be used within a ThemeContextProvider");
    }
  
    return context;
}