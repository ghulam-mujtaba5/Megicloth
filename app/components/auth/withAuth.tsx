'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log(`[withAuth] Auth check. isLoading: ${isLoading}, user: ${!!user}`);
      if (!isLoading && !user) {
        console.log('[withAuth] User not authenticated. Redirecting to /auth/login.');
        router.push('/auth/login');
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            textAlign: 'center',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Verifying your session...
          </Typography>
        </Box>
      );
    }

    if (!user) {
      // Render nothing while redirecting
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
