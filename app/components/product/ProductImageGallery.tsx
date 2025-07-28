"use client";

import { useState } from 'react';
import ImageZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const neoBoxSx = {
  borderRadius: 4,
  background: '#f7fafc',
  boxShadow: '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
  border: '1.5px solid #e2e8f0',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  '&:hover': {
    boxShadow: '0 12px 32px rgba(31,38,135,0.10), 0 1.5px 8px #e0e7ef',
    borderColor: '#cbd5e1',
  },
  padding: 2,
};

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Box sx={neoBoxSx}>
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        <ImageZoom>
          <CardMedia
            component="img"
            height={isMobile ? 300 : 400}
            image={images[selectedImage]}
            alt={productName}
            sx={{ objectFit: 'cover' }}
          />
        </ImageZoom>
      </Card>

      <Grid container spacing={1}>
        {images.map((image, index) => (
          <Grid item xs={3} key={index}>
            <Card
              sx={{
                width: '100%',
                height: 80,
                borderRadius: 2,
                cursor: 'pointer',
                border: selectedImage === index ? `3px solid ${theme.palette.primary.main}` : '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => setSelectedImage(index)}
            >
              <CardMedia
                component="img"
                height={80}
                image={image}
                alt={`${productName} ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
