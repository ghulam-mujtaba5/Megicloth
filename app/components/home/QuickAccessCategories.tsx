'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import styles from './QuickAccessCategories.module.css';

const categories = [
  {
    name: 'Cotton',
    href: '/products?category=cotton',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6d5f9435a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Linen',
    href: '/products?category=linen',
    imageUrl: 'https://images.unsplash.com/photo-1604935583329-639158913a34?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Silk',
    href: '/products?category=silk',
    imageUrl: 'https://images.unsplash.com/photo-1583209502004-3c888c6a3a9a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wool',
    href: '/products?category=wool',
    imageUrl: 'https://images.unsplash.com/photo-1593121924398-d42a284a4c33?auto=format&fit=crop&w=800&q=80',
  },
];

const QuickAccessCategories = () => {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={styles.title}>
          Shop By Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Link href={category.href} passHref className={styles.cardLink}>
                <div className={styles.card}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={400}
                    height={350}
                    className={styles.cardImage}
                  />
                  <div className={styles.overlay}>
                    <Typography variant="h5" component="h3" className={styles.categoryName}>
                      {category.name}
                    </Typography>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default QuickAccessCategories;
