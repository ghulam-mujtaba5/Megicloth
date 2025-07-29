"use client";

import { useState } from 'react';
import { Box, Card, CardMedia, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Box sx={{ position: 'sticky', top: 88 }}>
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          mb: 1.5,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardMedia
              component="img"
              image={images[selectedImage]}
              alt={productName}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                cursor: 'zoom-in',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Card>

      <Grid container spacing={1.5}>
        {images.map((image, index) => (
          <Grid item xs={3} sm={2} md={3} key={index}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 2,
                cursor: 'pointer',
                overflow: 'hidden',
                border: '2px solid',
                borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                opacity: selectedImage === index ? 1 : 0.7,
                transition: 'border-color 0.3s, opacity 0.3s',
                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={() => setSelectedImage(index)}
            >
              <CardMedia
                component="img"
                image={image}
                alt={`${productName} thumbnail ${index + 1}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
