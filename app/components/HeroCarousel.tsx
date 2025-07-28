"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useHomepage } from '../context/HomepageContext';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';



const HeroCarousel = () => {
  const { settings } = useHomepage();
  const { heroSlides } = settings;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ position: 'relative', height: isMobile ? '70vh' : '85vh', width: '100%', overflow: 'hidden' }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobile}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="hero-swiper"
        style={{ height: '100%', width: '100%' }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
                priority={index === 0}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: 'white',
                  p: 3,
                }}
              >
                <Box className="swiper-slide-content">
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  fontWeight={700}
                  sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  component="p"
                  sx={{ my: 2, maxWidth: '700px', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                >
                  {slide.subtitle}
                </Typography>
                <Button
                  component={Link}
                  href={slide.link || '/collections/all'}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, fontWeight: 'bold', px: 6, py: 1.5, borderRadius: '50px', transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}
                >
                  {slide.buttonText}
                </Button>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroCarousel;
