import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './AboutHero.module.css';

const AboutHero = () => {
  return (
    <Box className={styles.heroContainer}>
      <Typography
        variant="h2"
        className={styles.title}
        sx={{
          background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        Our Story: Weaving the Future of Pakistani Textiles
      </Typography>
      <Typography variant="h6" className={styles.subtitle}>
        Megicloth was born from a desire to celebrate and elevate the rich, vibrant heritage of the Pakistani textile industry. We provide a modern, premium, and accessible platform that connects talented local artisans and manufacturers with a discerning audience, both at home and abroad.
      </Typography>
    </Box>
  );
};

export default AboutHero;
