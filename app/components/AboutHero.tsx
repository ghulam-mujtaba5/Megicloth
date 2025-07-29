import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import styles from './AboutHero.module.css';

const AboutHero = () => {
  return (
    <Fade in={true} timeout={700}>
      <Box className={styles.heroContainer}>
        <Typography variant="h2" className={styles.title}>
          Our Story: Weaving the Future of Pakistani Textiles
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          Megicloth was born from a desire to celebrate and elevate the rich, vibrant heritage of the Pakistani textile industry. We provide a modern, premium, and accessible platform that connects talented local artisans and manufacturers with a discerning audience, both at home and abroad.
        </Typography>
      </Box>
    </Fade>
  );
};

export default AboutHero;
