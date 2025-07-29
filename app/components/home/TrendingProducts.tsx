'use client';

import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box, Typography, IconButton, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './TrendingProducts.module.css';

const TrendingProducts = () => {
  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h2" className={styles.title}>
            Top Trending Products
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Discover what's popular right now.
          </Typography>
        </div>
        <Swiper
          className={styles.swiperContainer}
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
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <>
          <IconButton className={`${styles.navButton} ${styles.prevButton} swiper-button-prev-trending`}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton className={`${styles.navButton} ${styles.nextButton} swiper-button-next-trending`}>
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      </Container>
    </Box>
  );
};

export default TrendingProducts;
