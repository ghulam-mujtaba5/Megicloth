'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Image from 'next/image';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section aria-label="Newsletter Signup" className={styles.section}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box className={styles.container}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={6} className={styles.imageContainer}>
                <Image
                  src="https://images.unsplash.com/photo-1551803091-e3e85b604c54?auto=format&fit=crop&w=627&q=80"
                  alt="Fashionable clothes on a rack"
                  width={627}
                  height={627}
                  className={styles.image}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className={styles.content}>
                  <Typography variant="h4" component="h2" className={styles.title}>
                    Stay in the Loop
                  </Typography>
                  <Typography variant="body1" className={styles.description}>
                    Subscribe to our newsletter for the latest updates, new arrivals, and exclusive offers.
                  </Typography>
                  <Box component="form" className={styles.form}>
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      className={styles.emailInput}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      startIcon={<MailOutlineIcon />}
                      className={styles.subscribeButton}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </section>
  );
};

export default Newsletter;
