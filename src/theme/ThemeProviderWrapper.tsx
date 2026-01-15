import { ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';
import { useAccessibilityStore } from '../store/accessibilityStore';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state) => state.mode);
  const fontSize = useAccessibilityStore((state) => state.fontSize);

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small': return 0.875;
      case 'medium': return 1;
      case 'large': return 1.125;
      case 'extra-large': return 1.25;
      default: return 1;
    }
  };

  const fontSizeMultiplier = getFontSizeMultiplier();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#be0078cc' : '#ff00d0',
          },
          secondary: {
            main: mode === 'light' ? '#dc004e' : '#ff00d0',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontSize: 14 * fontSizeMultiplier,
          h1: { fontSize: `${2.3 * fontSizeMultiplier}rem` },
          h2: { fontSize: `${2 * fontSizeMultiplier}rem` },
          h3: { fontSize: `${1.75 * fontSizeMultiplier}rem` },
          h4: { fontSize: `${1.5 * fontSizeMultiplier}rem` },
          h5: { fontSize: `${1.25 * fontSizeMultiplier}rem` },
          h6: { fontSize: `${1 * fontSizeMultiplier}rem` },
          body1: { fontSize: `${1 * fontSizeMultiplier}rem` },
          body2: { fontSize: `${0.875 * fontSizeMultiplier}rem` },
          button: { fontSize: `${0.875 * fontSizeMultiplier}rem` },
          caption: { fontSize: `${0.75 * fontSizeMultiplier}rem` },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#be0079' : '#1e1e1e',
                color: mode === 'light' ? '#ffffff' : '#ff00d0',
              },
            },
          },
        },
      }),
    [mode, fontSizeMultiplier]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
