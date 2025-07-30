"use client";

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, CssBaseline } from '@mui/material';
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
import CampaignIcon from '@mui/icons-material/Campaign';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StyleIcon from '@mui/icons-material/Style';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon /> },
  { text: 'Products', href: '/admin/products', icon: <StorefrontIcon /> },
  { text: 'Orders', href: '/admin/orders', icon: <ShoppingCartIcon /> },
  { text: 'Users', href: '/admin/users', icon: <PeopleIcon /> },
  { text: 'Categories', href: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Inventory', href: '/admin/inventory', icon: <InventoryIcon /> },
  { text: 'Discounts', href: '/admin/discounts', icon: <LocalOfferIcon /> },
  { text: 'Campaigns', href: '/admin/campaigns', icon: <CampaignIcon /> },
  { text: 'Blog', href: '/admin/blog', icon: <ArticleIcon /> },
  { text: 'Reviews', href: '/admin/reviews', icon: <RateReviewIcon /> },
  { text: 'Testimonials', href: '/admin/testimonials', icon: <FormatQuoteIcon /> },
  { text: 'Style Guides', href: '/admin/style-guides', icon: <StyleIcon /> },
  { text: 'Settings', href: '/admin/settings', icon: <SettingsIcon /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Only check localStorage for admin_logged_in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      if (!isLoggedIn) {
        router.push('/admin/login');
      }
    }
  }, [router]);

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
