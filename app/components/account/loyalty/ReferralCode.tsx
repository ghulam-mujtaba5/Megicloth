"use client";

import { useState, useEffect } from 'react';
import { getUserProfileWithReferral } from '@/app/lib/actions/loyalty';
import { Box, Typography, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { ContentCopy, CheckCircle } from '@mui/icons-material';

export default function ReferralCode() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getUserProfileWithReferral()
      .then(result => {
        if (result.success && result.profile?.referral_code) {
          setReferralCode(result.profile.referral_code);
        } else {
          setError(result.error || 'Could not find your referral code.');
        }
      })
      .catch(() => setError('An unexpected error occurred.'))
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  if (loading) {
    return <Paper sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Paper>;
  }

  if (error) {
    return <Paper sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Paper>;
  }

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
        Your Referral Code
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', my: 1 }}>
        Share this code with friends. They get a discount, and you get points!
      </Typography>
      <Box sx={{ 
        p: 1, 
        border: '2px dashed', 
        borderColor: 'primary.main', 
        borderRadius: 1, 
        my: 2, 
        backgroundColor: 'primary.lightest' 
      }}>
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ fontWeight: 'bold', letterSpacing: '2px', color: 'primary.dark' }}
        >
          {referralCode}
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={copied ? <CheckCircle /> : <ContentCopy />}
        onClick={handleCopy}
        disabled={copied}
      >
        {copied ? 'Copied!' : 'Copy Code'}
      </Button>
    </Paper>
  );
}
