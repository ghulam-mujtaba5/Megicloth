"use client";

import { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Toaster } from "react-hot-toast";


// Create emotion cache
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

const createAppTheme = () => createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 800,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      '@media (min-width:768px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      '@media (min-width:768px)': {
        fontSize: '2.25rem',
      },
    },
    h3: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (min-width:768px)': {
        fontSize: '1.875rem',
      },
    },
    h4: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      '@media (min-width:768px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      '@media (min-width:768px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      '@media (min-width:768px)': {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#475569',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#64748b',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      '@media (min-width:768px)': {
        fontSize: '1rem',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { HomepageProvider } from '../context/HomepageContext';

export default function AppProviders({ children }: AppProvidersProps) {
  const theme = createAppTheme();
  const emotionCache = createEmotionCache();
  return (
    <MuiThemeProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        <HomepageProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </HomepageProvider>
      </CacheProvider>
    </MuiThemeProvider>
  );
}
