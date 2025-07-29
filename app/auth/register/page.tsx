"use client";

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  loginWithGoogle,
  loginWithFacebook,
} from '@/app/auth/actions';
import { registerWithEmailPassword } from '@/app/lib/actions/auth';
import {
  Container, Box, Typography, TextField, Button, Alert, Divider, IconButton, 
  InputAdornment, Checkbox, FormControlLabel, FormHelperText, FormControl
} from '@mui/material';
import {
  Visibility, VisibilityOff, Email, Lock, Person, Phone, Google, Facebook
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { registerFormSchema } from '@/app/lib/schemas';

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const initialState = { errors: {} };

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerWithEmailPassword, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      termsAccepted: true,
    },
  });

  const { register, control, formState: { errors, isSubmitting } } = form;

  const getFieldError = (fieldName: keyof RegisterFormValues) => {
    if (state.errors && fieldName in state.errors) {
        const serverError = state.errors[fieldName as keyof typeof state.errors];
        if (serverError) return serverError[0];
    }
    return errors[fieldName]?.message;
  };

  const formErrors = state.errors && '_form' in state.errors ? state.errors._form : undefined;

  const glassCardSx = {
    borderRadius: 4,
    p: { xs: 3, sm: 4, md: 5 },
    bgcolor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px) saturate(150%)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: '550px',
  };

  const neoButtonSx = {
    py: 1.5,
    px: 3,
    fontWeight: 700,
    borderRadius: 2,
    textTransform: 'none',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px #00000018, 0 1px 2px #00000010',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px #00000020, 0 2px 4px #00000018',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={glassCardSx}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Create Your Account
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569' }}>
                Join MegiCloth and start your fashion journey.
              </Typography>
            </Box>

            <form onSubmit={form.handleSubmit((data) => formAction(data))}>
              {formErrors && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formErrors.join(', ')}
                </Alert>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField {...register('firstName')} label="First Name" fullWidth error={!!getFieldError('firstName')} helperText={getFieldError('firstName')} InputProps={{ startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment> }} />
                    <TextField {...register('lastName')} label="Last Name" fullWidth error={!!getFieldError('lastName')} helperText={getFieldError('lastName')} InputProps={{ startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment> }} />
                </Box>
                <TextField {...register('email')} label="Email Address" type="email" fullWidth error={!!getFieldError('email')} helperText={getFieldError('email')} InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }} />
                <TextField {...register('phone')} label="Phone Number (Optional)" fullWidth error={!!getFieldError('phone')} helperText={getFieldError('phone')} InputProps={{ startAdornment: <InputAdornment position="start"><Phone color="action" /></InputAdornment> }} />
                <TextField {...register('password')} label="Password" type={showPassword ? 'text' : 'password'} fullWidth error={!!getFieldError('password')} helperText={getFieldError('password')} InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
                <TextField {...register('confirmPassword')} label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} fullWidth error={!!getFieldError('confirmPassword')} helperText={getFieldError('confirmPassword')} InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
                
                <FormControl error={!!getFieldError('termsAccepted')}>
                    <Controller
                        name="termsAccepted"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={!!field.value}
                                        onChange={e => field.onChange(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: '#475569' }}>
                                        I agree to the{' '}
                                        <Link href="/terms" style={{ color: '#2563eb', fontWeight: 'bold' }}>Terms of Service</Link>{' '}and{' '}
                                        <Link href="/privacy" style={{ color: '#2563eb', fontWeight: 'bold' }}>Privacy Policy</Link>.
                                    </Typography>
                                }
                            />
                        )}
                    />
                    {getFieldError('termsAccepted') && <FormHelperText>{getFieldError('termsAccepted')}</FormHelperText>}
                </FormControl>

                <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ ...neoButtonSx, background: 'linear-gradient(45deg, #10b981, #059669)', color: '#fff' }}>
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 3, fontWeight: 700, color: '#64748b' }}>or</Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              <form action={loginWithGoogle}>
                <Button type="submit" fullWidth variant="outlined" startIcon={<Google />} sx={{ ...neoButtonSx, color: '#ea4335', borderColor: alpha('#d1d5db', 0.8) }}>
                  Continue with Google
                </Button>
              </form>
              <form action={loginWithFacebook}>
                <Button type="submit" fullWidth variant="outlined" startIcon={<Facebook />} sx={{ ...neoButtonSx, color: '#1877f3', borderColor: alpha('#d1d5db', 0.8) }}>
                  Continue with Facebook
                </Button>
              </form>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}