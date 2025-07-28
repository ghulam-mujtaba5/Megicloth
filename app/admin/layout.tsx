"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Container, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, CssBaseline } from '@mui/material';
import { CategoryProvider } from '../context/CategoryContext';
import { DiscountProvider } from '../context/DiscountContext';
import { BlogProvider } from '../context/BlogContext';
import { HomepageProvider } from '../context/HomepageContext';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon /> },
  { text: 'Products', href: '/admin/products', icon: <StorefrontIcon /> },
  { text: 'Orders', href: '/admin/orders', icon: <ShoppingCartIcon /> },
  { text: 'Categories', href: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Inventory', href: '/admin/inventory', icon: <InventoryIcon /> },
  { text: 'Discounts', href: '/admin/discounts', icon: <LocalOfferIcon /> },
  { text: 'Blog', href: '/admin/blog', icon: <ArticleIcon /> },
  { text: 'Settings', href: '/admin/settings', icon: <SettingsIcon /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Verifying access...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <CategoryProvider>
      <DiscountProvider>
        <BlogProvider>
          <HomepageProvider>
            <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Megicloth Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component="a" href={item.href}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
              </Box>
            </Box>
          </HomepageProvider>
        </BlogProvider>
      </DiscountProvider>
    </CategoryProvider>
  );
}
