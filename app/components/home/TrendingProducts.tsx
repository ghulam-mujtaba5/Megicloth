'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { Product } from '../../types';
import ProductCard from '../product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box, Typography, IconButton, Container, Skeleton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './TrendingProducts.module.css';

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching trending products:', error);
        setError('Could not fetch trending products.');
        setProducts([]);
      } else {
        setProducts(data);
        setError(null);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const renderSkeletons = () => {
    return Array.from(new Array(4)).map((_, index) => (
      <SwiperSlide key={index}>
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }}/>
        <Skeleton width="80%" sx={{ mt: 1 }} />
        <Skeleton width="40%" />
      </SwiperSlide>
    ));
  };

  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h2" className={styles.title}>
            Top Trending Products
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Discover what&apos;s popular right now.
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
          {loading ? (
            renderSkeletons()
          ) : error ? (
            <Typography color="error" sx={{ textAlign: 'center', width: '100%' }}>{error}</Typography>
          ) : (
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          )}
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
