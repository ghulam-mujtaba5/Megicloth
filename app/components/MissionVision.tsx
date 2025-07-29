import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from './MissionVision.module.css';

const MissionVision = () => {
  return (
    <Grid container spacing={6} alignItems="center" className={styles.section}>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" className={styles.title}>
          Our Mission
        </Typography>
        <Typography variant="body1" className={styles.text}>
          To empower the Pakistani textile industry by providing a modern, accessible, and premium e-commerce platform for unstitched fabrics. We aim to connect artisans and manufacturers with a broader audience, celebrating the rich heritage of Pakistani textiles.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" className={styles.title}>
          Our Vision
        </Typography>
        <Typography variant="body1" className={styles.text}>
          To become the leading online destination for premium unstitched fabrics in Pakistan, known for our quality, customer experience, and commitment to the local textile industry.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MissionVision;
