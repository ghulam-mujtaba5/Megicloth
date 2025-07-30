import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import styles from './QuickAccessCategories.module.css';
import { getCategories } from '@/app/lib/data/products';

const QuickAccessCategories = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    return null; // Don't render the section if there are no categories
  }

  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={styles.title}>
          Shop By Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Link href={`/products?category=${category.slug}`} passHref className={styles.cardLink}>
                <div className={styles.card}>
                  <Image
                    src={category.imageUrl || 'https://picsum.photos/seed/placeholder/800/600'}
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
