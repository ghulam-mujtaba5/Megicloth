"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, A11y } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useHomepage } from '../../context/HomepageContext';
import { Box, Typography, Button, useTheme, useMediaQuery, styled } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const OverlayBox = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.6) 100%)',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem',
});

const ContentContainer = styled(motion.div)({
  maxWidth: '800px',
});

const HeroCarousel = () => {
  const { settings } = useHomepage();
  const { heroSlides } = settings;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <Box sx={{ position: 'relative', height: isMobile ? '70vh' : '90vh', width: '100%', overflow: 'hidden' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, A11y]}
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></span>';
          },
        }}
        navigation={!isMobile}
        loop={true}
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        }}
        style={{ height: '100%', width: '100%' }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={90}
                  priority={index === 0} // Load the first image with high priority
                />
                <OverlayBox>
                  {isActive && (
                    <ContentContainer
                      initial="hidden"
                      animate="visible"
                      variants={contentVariants}
                    >
                      <Typography
                        variant={isMobile ? 'h3' : 'h2'}
                        component="h1"
                        fontWeight={700}
                        sx={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        component="p"
                        sx={{ my: 2, maxWidth: '700px', textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}
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
                    </ContentContainer>
                  )}
                </OverlayBox>
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroCarousel;
