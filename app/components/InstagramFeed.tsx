"use client";

import { Box, Grid, Typography, Card, CardMedia, Button } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const feedItems = [
  { img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80", alt: "A stylish fabric layout", likes: "1.2k", comments: "45" },
  { img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", alt: "Close-up of a textured fabric", likes: "876", comments: "23" },
  { img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", alt: "A model wearing a custom outfit", likes: "2.1k", comments: "88" },
  { img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", alt: "A stack of colorful fabrics", likes: "980", comments: "31" },
  { img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", alt: "Detailed embroidery work", likes: "1.5k", comments: "56" },
  { img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", alt: "A person sewing with our fabric", likes: "750", comments: "19" },
];

const InstagramFeed = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Typography variant="h4" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 1 }}>
        Follow Us on Instagram
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 5 }}>
        @megicloth
      </Typography>
      <Grid container spacing={0.5} sx={{ px: { xs: 1, md: 4 } }}>
        {feedItems.map((item, index) => (
          <Grid item xs={4} sm={4} md={2} key={index}>
            <Card sx={{ position: 'relative', borderRadius: 0, '&:hover .overlay': { opacity: 1 } }}>
              <CardMedia
                component="img"
                image={item.img}
                alt={item.alt}
                sx={{ aspectRatio: '1 / 1', transition: 'transform 0.3s ease' , '&:hover': { transform: 'scale(1.1)' }}}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FavoriteBorderIcon sx={{ mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.likes}</Typography>
                  <ChatBubbleOutlineIcon sx={{ ml: 2, mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.comments}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<InstagramIcon />}
          href="https://www.instagram.com" // Replace with actual Instagram profile URL
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: 8, textTransform: 'none', px: 4, py: 1.5 }}
        >
          Follow on Instagram
        </Button>
      </Box>
    </Box>
  );
};

export default InstagramFeed;
