'use client';

import { Avatar, Box, Container, Typography, IconButton, Card, CardContent } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Ayesha Khan',
    location: 'Lahore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    testimonial: "The fabric quality is exceptional! I'm so impressed with the vibrant colors and the softness of the material. Will definitely be shopping here again.",
  },
  {
    name: 'Bilal Ahmed',
    location: 'Karachi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    testimonial: 'Fast delivery and excellent customer service. The unstitched suit I ordered was exactly as described. Highly recommended!',
  },
  {
    name: 'Fatima Ali',
    location: 'Islamabad',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    testimonial: "I love the unique designs Megicloth offers. It's my go-to store for finding beautiful, high-quality fabrics for every season.",
  },
];

const Testimonials = () => {
  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="md">
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h2" className={styles.title}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Real stories from our satisfied customers.
          </Typography>
        </div>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          className={styles.swiperContainer}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-testimonials',
            prevEl: '.swiper-button-prev-testimonials',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Card className={styles.testimonialCard}>
                <CardContent>
                  <FormatQuoteIcon className={styles.quoteIcon} />
                  <Typography variant="h6" className={styles.testimonialText}>
                    {item.testimonial}
                  </Typography>
                  <div className={styles.authorContainer}>
                    <Avatar src={item.avatar} alt={item.name} className={styles.avatar} />
                    <div>
                      <Typography variant="h6" className={styles.authorName}>{item.name}</Typography>
                      <Typography variant="body2" className={styles.authorLocation}>{item.location}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <>
        <IconButton className={`${styles.navButton} ${styles.prevButton} swiper-button-prev-testimonials`}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton className={`${styles.navButton} ${styles.nextButton} swiper-button-next-testimonials`}>
          <ArrowForwardIosIcon />
        </IconButton>
      </>
    </Box>
  );
};

export default Testimonials;
