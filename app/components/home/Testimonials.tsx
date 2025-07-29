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

const testimonials = [
  {
    name: 'Ayesha Khan',
    location: 'Lahore',
    avatar: 'https://picsum.photos/seed/avatarA/256/256',
    testimonial: "The fabric quality is exceptional! I'm so impressed with the vibrant colors and the softness of the material. Will definitely be shopping here again.",
  },
  {
    name: 'Bilal Ahmed',
    location: 'Karachi',
    avatar: 'https://picsum.photos/seed/avatarB/256/256',
    testimonial: 'Fast delivery and excellent customer service. The unstitched suit I ordered was exactly as described. Highly recommended!',
  },
  {
    name: 'Fatima Ali',
    location: 'Islamabad',
    avatar: 'https://picsum.photos/seed/avatarC/256/256',
    testimonial: "I love the unique designs Megicloth offers. It's my go-to store for finding beautiful, high-quality fabrics for every season.",
  },
];

const Testimonials = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: '#f9fafb', position: 'relative' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 2, color: 'neutral.800' }}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" sx={{ color: 'neutral.600' }}>
            Real stories from our satisfied customers.
          </Typography>
        </Box>
        <Box sx={{ pb: '60px' }}>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
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
                <Card sx={{
                  mx: 'auto',
                  maxWidth: 700,
                  borderRadius: '16px',
                  boxShadow: 3,
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}>
                  <CardContent>
                    <FormatQuoteIcon sx={{ fontSize: 50, color: 'primary.200', transform: 'rotate(180deg)', mb: 4 }} />
                    <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 6, color: 'neutral.600', lineHeight: 1.7 }}>
                      {item.testimonial}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Avatar src={item.avatar} alt={item.name} sx={{ mr: 2, width: 56, height: 56 }} />
                      <div>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'neutral.800' }}>{item.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'neutral.500' }}>{item.location}</Typography>
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
      <>
        <IconButton className="swiper-button-prev-testimonials" sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'primary.main',
          backgroundColor: 'white',
          boxShadow: 3,
          left: { xs: '2%', md: '10%' },
          '&:hover': {
            backgroundColor: 'neutral.100',
          },
        }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton className="swiper-button-next-testimonials" sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'primary.main',
          backgroundColor: 'white',
          boxShadow: 3,
          right: { xs: '2%', md: '10%' },
          '&:hover': {
            backgroundColor: 'neutral.100',
          },
        }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </>
    </Box>
  );
};

export default Testimonials;
