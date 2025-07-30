"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginWithEmailPassword, loginWithGoogle, loginWithFacebook, loginWithApple } from '@/app/auth/actions';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { alpha } from '@mui/material/styles';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { user, isLoading, revalidateUser } = useAuth();
  const router = useRouter();
  const [state, formAction] = useFormState(loginWithEmailPassword, null);
  const [showPassword, setShowPassword] = useState(false);

  console.log("\n--- [LoginPage] Rendering ---");
  console.log("[LoginPage] Auth context state:", { user, isLoading });
  console.log("[LoginPage] Server action form state:", state);

  const formErrors = state?.errors && '_form' in state.errors ? state.errors._form : undefined;
  const emailErrors = state?.errors && 'email' in state.errors ? state.errors.email : undefined;
  const passwordErrors = state?.errors && 'password' in state.errors ? state.errors.password : undefined;

  const {
    register,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  



  // Redirect already authenticated users to profile page
  useEffect(() => {
    if (user && !isLoading) {
      window.location.href = '/profile';
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (state?.success) {
      const performRedirect = async () => {
        try {
          console.log("[LoginPage] Login successful! Revalidating user session...");
          toast.success('Logged in successfully! Redirecting...');
          await revalidateUser();
          console.log("[LoginPage] Session revalidated. Reloading the page to update auth state.");
          window.location.href = '/';
        } catch (error) {
          console.error("[LoginPage] Error during post-login redirect:", error);
          toast.error("An error occurred after login. Please try again.");
        }
      };
      performRedirect();
    } else if (state?.message && state.errors) {
      console.error("[LoginPage] Form error detected:", state.message);
      toast.error(state.message);
    }
  }, [state, router, revalidateUser]);

  const glassCardSx = {
    borderRadius: 4,
    background: 'rgba(255,255,255,0.65)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.25)',
    overflow: 'hidden',
    p: { xs: 3, md: 4 },
  };

  const neoInputSx = {
    '& .MuiOutlinedInput-root': {
      background: alpha('#f0f2f5', 0.6),
      borderRadius: 2,
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        boxShadow: `0 0 0 2px ${alpha('#2563eb', 0.2)}`,
      },
    },
  };

  const neoButtonSx = {
    borderRadius: 2,
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
  };

  // Show a loading spinner while checking auth status to prevent flashing the login form
  if (isLoading || user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={glassCardSx}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    letterSpacing: '-1px',
                  }}
                >
                  Welcome Back
                </Typography>
              </motion.div>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                Sign in to your Megicloth account
              </Typography>
            </Box>

            <form action={formAction}>
              {formErrors && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formErrors.join(', ')}
                </Alert>
              )}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                {...register('email')}
                helperText={emailErrors?.[0] || errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3, ...neoInputSx }}
                autoComplete="email"
                autoFocus
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={!!passwordErrors || !!errors.password}
                helperText={passwordErrors?.[0] || errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="Toggle password visibility"
                        sx={{ color: '#64748b' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2, ...neoInputSx }}
                autoComplete="current-password"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Link href="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  ...neoButtonSx,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(37, 99, 235, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                  },
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Divider sx={{ my: 3, fontWeight: 700, color: '#64748b' }}>OR</Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              <form action={loginWithGoogle}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ ...neoButtonSx, color: '#ea4335', borderColor: alpha('#d1d5db', 0.8) }}
              >
                Continue with Google
              </Button>
            </form>
              <form action={loginWithFacebook}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{ ...neoButtonSx, color: '#1877f3', borderColor: alpha('#d1d5db', 0.8) }}
              >
                Continue with Facebook
              </Button>
              </form>
              <form action={loginWithApple}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                startIcon={<Apple />}
                sx={{ ...neoButtonSx, color: '#111', borderColor: alpha('#d1d5db', 0.8) }}
              >
                Continue with Apple
              </Button>
              </form>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Don&#39;t have an account?{' '}
                <Link href="/auth/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}