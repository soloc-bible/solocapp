export interface ThemeColors {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    border: string;
};

export interface Theme {
    dark: boolean;
    colors: ThemeColors;
};

export const LightTheme: Theme = {
    dark: false,
    colors: {
        background: "#ffffff",
        text: "#000000",
        primary: "#",
        secondary: "",
        card: "",
        border: "",
    },

};

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        background: "",
        text: "",
        primary: "",
        secondary: "",
        card: "",
        border: "",
    },
};

export type ThemeName = 'light' | 'dark'