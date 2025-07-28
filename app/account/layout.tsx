"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Seo from '../components/Seo';

const accountNavLinks = [
  { text: 'Orders', href: '/account', icon: <ShoppingBagOutlinedIcon /> },
  { text: 'Wishlist', href: '/account/wishlist', icon: <FavoriteBorderOutlinedIcon /> },
  { text: 'Address Book', href: '/account/addresses', icon: <HomeOutlinedIcon /> },
  { text: 'Profile Settings', href: '/account/settings', icon: <PersonOutlineOutlinedIcon /> },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Seo title="My Account | Megicloth" description="Manage your orders, wishlist, addresses, and profile settings."/>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
          My Account
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <List component="nav">
                {accountNavLinks.map((link) => (
                  <Link href={link.href} passHref key={link.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton selected={pathname === link.href}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.text} />
                    </ListItemButton>
                  </Link>
                ))}
                <ListItemButton onClick={logout}>
                  <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
