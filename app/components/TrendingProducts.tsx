"use client";

import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box, Typography, IconButton, useTheme, useMediaQuery, Container } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TrendingProducts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, position: 'relative', backgroundColor: '#f7f9fc' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
            Top Trending Products
          </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover what's popular right now.
        </Typography>
      </Box>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation={{
          nextEl: '.swiper-button-next-trending',
          prevEl: '.swiper-button-prev-trending',
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          600: { slidesPerView: 2, spaceBetween: 20 },
          960: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        style={{ paddingBottom: '50px' }}
      >
        {products.slice(0, 8).map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMobile && (
        <>
          <IconButton
            className="swiper-button-prev-trending"
            sx={{
              position: 'absolute',
              left: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              color: 'primary.main',
              backgroundColor: 'white',
              boxShadow: 3,
              '&:hover': { backgroundColor: 'grey.100' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            className="swiper-button-next-trending"
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              color: 'primary.main',
              backgroundColor: 'white',
              boxShadow: 3,
              '&:hover': { backgroundColor: 'grey.100' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
      </Container>
    </Box>
  );
};

export default TrendingProducts;
