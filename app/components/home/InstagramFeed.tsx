'use client';

import { Box, Grid, Typography, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Image from 'next/image';

const feedItems = [
  { img: 'https://picsum.photos/seed/instaA/400/400', alt: 'A stylish fabric layout', likes: '1.2k', comments: '45' },
  { img: 'https://picsum.photos/seed/instaB/400/400', alt: 'Close-up of a textured fabric', likes: '876', comments: '23' },
  { img: 'https://picsum.photos/seed/instaC/400/400', alt: 'A model wearing a custom outfit', likes: '2.1k', comments: '88' },
  { img: 'https://picsum.photos/seed/instaD/400/400', alt: 'A stack of colorful fabrics', likes: '980', comments: '31' },
  { img: 'https://picsum.photos/seed/instaE/400/400', alt: 'Detailed embroidery work', likes: '1.5k', comments: '56' },
  { img: 'https://picsum.photos/seed/instaF/400/400', alt: 'A person sewing with our fabric', likes: '750', comments: '19' },
];

const InstagramFeed = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: 'neutral.100' }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 1, color: 'neutral.800' }}>
        Follow Us on Instagram
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'neutral.600', mb: 7 }}>
        @megicloth
      </Typography>
      <Grid container spacing={0.5} sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
        {feedItems.map((item, index) => (
          <Grid item xs={4} sm={4} md={2} key={index} sx={{
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            '& .overlay': {
              opacity: 0,
              transition: (theme) => theme.transitions.create('opacity'),
            },
            '&:hover .overlay': {
              opacity: 1,
            },
            '& .insta-image': {
              transition: (theme) => theme.transitions.create('transform', { duration: 400, easing: 'ease-in-out' }),
            },
            '&:hover .insta-image': {
              transform: 'scale(1.1)',
            },
          }}>
            <Image
              src={item.img}
              alt={item.alt}
              width={400}
              height={400}
              className="insta-image"
              style={{ aspectRatio: '1 / 1', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box className="overlay" sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mr: 4 }}>
                  <FavoriteBorderIcon sx={{ mr: 1, fontSize: 18 }} />
                  <span>{item.likes}</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                  <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: 18 }} />
                  <span>{item.comments}</span>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 7 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<InstagramIcon />}
          href="https://www.instagram.com/megicloth"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: '9999px',
            textTransform: 'none',
            py: 1.5,
            px: 3,
            fontWeight: 600,
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            }
          }}
        >
          Follow on Instagram
        </Button>
      </Box>
    </Box>
  );
};

export default InstagramFeed;
