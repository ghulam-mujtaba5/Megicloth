'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, Tabs, Tab, Typography, Container } from '@mui/material';
import { Person, ShoppingBag, Favorite, LocationOn, Settings as SettingsIcon } from '@mui/icons-material';

import ProfileHeader from './ProfileHeader';
import AccountDetails from './AccountDetails';
import OrderHistory from './OrderHistory';
import AddressManager from './AddressManager';
import Wishlist from './Wishlist';
import Settings from './Settings';
import withAuth from '../auth/withAuth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const glassCardSx = {
  borderRadius: 4,
  background: 'rgba(255,255,255,0.65)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.25)',
  overflow: 'hidden',
  p: { xs: 2, md: 4 },
};

const ProfileClientPage = () => {
  const searchParams = useSearchParams();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    const tabMap: { [key: string]: number } = {
      'profile': 0,
      'orders': 1,
      'addresses': 2,
      'wishlist': 3,
      'settings': 4,
    };
    if (tab && tab in tabMap) {
      setTabValue(tabMap[tab]);
    }
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              textAlign: 'center',
              mb: 2,
              background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1.5px',
            }}
          >
            My Profile
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              mb: 3,
              fontWeight: 500,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Manage your account, orders, and addresses
          </Typography>
        </Box>

        <Box sx={glassCardSx}>
          <ProfileHeader />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs" variant="scrollable" scrollButtons="auto">
              <Tab icon={<Person />} iconPosition="start" label="Profile" />
              <Tab icon={<ShoppingBag />} iconPosition="start" label="Orders" />
              <Tab icon={<LocationOn />} iconPosition="start" label="Addresses" />
              <Tab icon={<Favorite />} iconPosition="start" label="Wishlist" />
              <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <AccountDetails />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OrderHistory />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <AddressManager />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Wishlist />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Settings />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}

export default withAuth(ProfileClientPage);
