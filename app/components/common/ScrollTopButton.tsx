"use client";

import { useState, useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200 }}>
        <IconButton
          aria-label="Scroll to top"
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateY(-2px)',
            },
          }}
          onClick={scrollToTop}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
      </Box>
    </Zoom>
  );
}
