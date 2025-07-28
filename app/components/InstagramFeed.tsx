'use client';

import { Box, Grid, Typography, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Image from 'next/image';
import styles from './InstagramFeed.module.css';

const feedItems = [
  { img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', alt: 'A stylish fabric layout', likes: '1.2k', comments: '45' },
  { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', alt: 'Close-up of a textured fabric', likes: '876', comments: '23' },
  { img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', alt: 'A model wearing a custom outfit', likes: '2.1k', comments: '88' },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', alt: 'A stack of colorful fabrics', likes: '980', comments: '31' },
  { img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', alt: 'Detailed embroidery work', likes: '1.5k', comments: '56' },
  { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', alt: 'A person sewing with our fabric', likes: '750', comments: '19' },
];

const InstagramFeed = () => {
  return (
    <Box component="section" className={styles.section}>
      <Typography variant="h4" component="h2" className={styles.title}>
        Follow Us on Instagram
      </Typography>
      <Typography variant="body1" className={styles.subtitle}>
        @megicloth
      </Typography>
      <Grid container spacing={0.5} className={styles.gridContainer}>
        {feedItems.map((item, index) => (
          <Grid item xs={4} sm={4} md={2} key={index} className={styles.gridItem}>
            <Image
              src={item.img}
              alt={item.alt}
              width={400}
              height={400}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <FavoriteBorderIcon className={styles.statIcon} />
                  <span>{item.likes}</span>
                </div>
                <div className={styles.statItem}>
                  <ChatBubbleOutlineIcon className={styles.statIcon} />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={styles.followButtonContainer}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<InstagramIcon />}
          href="https://www.instagram.com/megicloth" // TODO: Replace with actual Instagram profile URL
          target="_blank"
          rel="noopener noreferrer"
          className={styles.followButton}
        >
          Follow on Instagram
        </Button>
      </div>
    </Box>
  );
};

export default InstagramFeed;
