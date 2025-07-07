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
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  Google,
  Facebook,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { alpha } from "@mui/material/styles";

const steps = ["Personal Info", "Account Details", "Terms & Conditions"];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    newsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        }
        if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
        break;

      case 1: // Account Details
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = "Password must contain uppercase, lowercase, and number";
        }
        if (!formData.confirmPassword.trim()) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;

      case 2: // Terms & Conditions
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = "You must accept the terms and conditions";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(activeStep)) return;

    setIsLoading(true);
    
    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      });
      
      if (result.success) {
        toast.success("Registration successful! Welcome to Megicloth.");
        router.push("/");
      } else {
        toast.error(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    toast.info(`${provider} registration coming soon!`);
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
                  Create Account
                </Typography>
              </motion.div>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                Join Megicloth and start your premium experience
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            <Box component="form" onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Tell us about yourself
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={neoInputSx}
                      autoComplete="given-name"
                      autoFocus
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      sx={neoInputSx}
                      autoComplete="family-name"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={neoInputSx}
                    autoComplete="tel"
                  />
                </Box>
              )}
              {activeStep === 1 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Account Details
                  </Typography>
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
                    sx={{ ...neoInputSx, mb: 3 }}
                    autoComplete="email"
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
                    sx={{ ...neoInputSx, mb: 2 }}
                    autoComplete="new-password"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            aria-label="Toggle confirm password visibility"
                            sx={{ color: '#64748b' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={neoInputSx}
                    autoComplete="new-password"
                  />
                </Box>
              )}
              {activeStep === 2 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Terms & Conditions
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                        color="primary"
                      />
                    }
                    label={<span>I accept the <b>terms and conditions</b></span>}
                  />
                  {errors.termsAccepted && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.termsAccepted}
                    </Alert>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.newsletter}
                        onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                        color="primary"
                      />
                    }
                    label={<span>Subscribe to our newsletter</span>}
                  />
                </Box>
              )}

              {/* Stepper Navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ ...neoButtonSx, color: '#64748b', borderColor: alpha('#64748b', 0.2) }}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      ...neoButtonSx,
                      background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                      color: '#fff',
                      boxShadow: '0 4px 16px #2563eb22',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                        color: '#fff',
                      },
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      ...neoButtonSx,
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      color: '#fff',
                      boxShadow: '0 4px 16px #10b98122',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #059669, #047857)',
                        color: '#fff',
                      },
                    }}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                )}
              </Box>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3, fontWeight: 700, color: '#64748b' }}>or</Divider>

            {/* Social Register Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialRegister('Google')}
                sx={{ ...neoButtonSx, color: '#ea4335', borderColor: alpha('#ea4335', 0.2) }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialRegister('Facebook')}
                sx={{ ...neoButtonSx, color: '#1877f3', borderColor: alpha('#1877f3', 0.2) }}
              >
                Continue with Facebook
              </Button>
            </Box>

            {/* Login Link */}
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