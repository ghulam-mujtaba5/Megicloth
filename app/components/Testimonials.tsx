"use client";

import { Avatar, Box, Container, Typography, IconButton, useTheme, useMediaQuery, Card, CardContent } from "@mui/material";
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
    name: "Ayesha Khan",
    location: "Lahore",
    avatar: "https://i.pravatar.cc/150?u=ayesha",
    testimonial: "The fabric quality is exceptional! I'm so impressed with the vibrant colors and the softness of the material. Will definitely be shopping here again.",
  },
  {
    name: "Bilal Ahmed",
    location: "Karachi",
    avatar: "https://i.pravatar.cc/150?u=bilal",
    testimonial: "Fast delivery and excellent customer service. The unstitched suit I ordered was exactly as described. Highly recommended!",
  },
  {
    name: "Fatima Ali",
    location: "Islamabad",
    avatar: "https://i.pravatar.cc/150?u=fatima",
    testimonial: "I love the unique designs Megicloth offers. It's my go-to store for finding beautiful, high-quality fabrics for every season.",
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 8, backgroundColor: '#f9fafb', position: 'relative' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real stories from our satisfied customers.
          </Typography>
        </Box>
        <Box sx={{ pb: 6 }}> {/* Wrapper Box for Swiper styling */}
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
              <Card sx={{ mx: 'auto', maxWidth: 700, borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.05)', p: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <FormatQuoteIcon sx={{ fontSize: 50, color: 'primary.light', transform: 'rotate(180deg)', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                    {item.testimonial}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar src={item.avatar} alt={item.name} sx={{ mr: 2, width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.location}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
          </Swiper>
        </Box>
      </Container>
      {!isMobile && (
        <>
          <IconButton
            className="swiper-button-prev-testimonials"
            sx={{ position: 'absolute', left: '10%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: 'primary.main', backgroundColor: 'white', boxShadow: 3, '&:hover': { backgroundColor: 'grey.100' } }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            className="swiper-button-next-testimonials"
            sx={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, color: 'primary.main', backgroundColor: 'white', boxShadow: 3, '&:hover': { backgroundColor: 'grey.100' } }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default Testimonials;
