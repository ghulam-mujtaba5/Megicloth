"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
  Slide,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook,
  Apple,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { alpha } from "@mui/material/styles";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success("Login successful! Welcome back.");
        router.push("/");
      } else {
        toast.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  // Glassmorphism style for main card
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

  // Neomorphic style for input fields
  const neoInputSx = {
    background: '#f7fafc',
    boxShadow: '2px 2px 8px #e2e8f0, -2px -2px 8px #ffffff',
    borderRadius: 2,
    '& .MuiOutlinedInput-root': {
      background: '#f7fafc',
      borderRadius: 2,
    },
  };

  // Neomorphic style for buttons
  const neoButtonSx = {
    background: '#f7fafc',
    boxShadow: '2px 2px 8px #e2e8f0, -2px -2px 8px #ffffff',
    borderRadius: 2,
    fontWeight: 700,
    color: '#2563eb',
    '&:hover': {
      background: '#e2e8f0',
      color: '#1e40af',
      boxShadow: '0 4px 16px #2563eb22',
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
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
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
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

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Link href="/auth/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      '&:hover': { textDecoration: "underline" },
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
                disabled={isLoading}
                sx={{
                  ...neoButtonSx,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                  color: '#fff',
                  boxShadow: '0 4px 16px #2563eb22',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                    color: '#fff',
                  },
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3, fontWeight: 700, color: '#64748b' }}>or</Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('Google')}
                sx={{ ...neoButtonSx, color: '#ea4335', borderColor: alpha('#ea4335', 0.2) }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('Facebook')}
                sx={{ ...neoButtonSx, color: '#1877f3', borderColor: alpha('#1877f3', 0.2) }}
              >
                Continue with Facebook
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Apple />}
                onClick={() => handleSocialLogin('Apple')}
                sx={{ ...neoButtonSx, color: '#111', borderColor: alpha('#111', 0.2) }}
              >
                Continue with Apple
              </Button>
            </Box>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Don't have an account?{' '}
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