import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TeamIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import styles from './OurValues.module.css';

const values = [
  {
    icon: <VerifiedIcon fontSize="large" />,
    title: 'Quality',
    text: 'We are committed to offering only the highest quality fabrics and materials.',
    iconClass: styles.qualityIcon,
  },
  {
    icon: <Diversity3Icon fontSize="large" />,
    title: 'Authenticity',
    text: 'We celebrate the rich traditions and craftsmanship of Pakistani textiles.',
    iconClass: styles.authenticityIcon,
  },
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: 'Innovation',
    text: 'We leverage modern technology to create a seamless and enjoyable shopping experience.',
    iconClass: styles.innovationIcon,
  },
  {
    icon: <TeamIcon fontSize="large" />,
    title: 'Customer-Centricity',
    text: 'We put our customers at the heart of everything we do.',
    iconClass: styles.customerIcon,
  },
];

const OurValues = () => {
  return (
    <Box className={styles.section}>
      <Typography variant="h3" className={styles.title}>
        Our Values & Manufacturing Ethos
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {values.map((value) => (
          <Grid item xs={12} sm={6} md={3} key={value.title}>
            <Box className={styles.valueItem}>
              <Avatar className={`${styles.avatar} ${value.iconClass}`}>{value.icon}</Avatar>
              <Typography variant="h6" className={styles.valueTitle}>
                {value.title}
              </Typography>
              <Typography variant="body2" className={styles.valueText}>
                {value.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurValues;
