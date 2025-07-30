"use client";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useMemo } from "react";
import { useAuth } from './context/AuthContext';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

// Create emotion cache
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

// Create a custom theme that matches our design system
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          '@media (min-width:768px)': {
            padding: '12px 24px',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563eb',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563eb',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '16px 0 0 16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          '& .MuiRating-iconFilled': {
            color: '#fbbf24',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const theme = useMemo(() => createAppTheme(), []);
  const emotionCache = useMemo(() => createEmotionCache(), []);
  const { user } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header key={user ? user.id : 'logged-out'} />
          <Box component="main" sx={{ flexGrow: 1, minHeight: '70vh' }}>{children}</Box>
          <Footer />
        </Box>
      </CacheProvider>
    </MuiThemeProvider>
  );
}
