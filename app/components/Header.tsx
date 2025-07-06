"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tooltip from "@mui/material/Tooltip";

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: null },
    { label: "Products", href: "/products", icon: null },
    { label: "Collections", href: "/collections", icon: null },
    { label: "About", href: "/about", icon: null },
    { label: "Contact", href: "/contact", icon: null },
  ];

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const drawer = (
    <Box sx={{ width: { xs: '100vw', sm: 320 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: '#ffffff',
          p: 3,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1 }}>
            Megicloth
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#ffffff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Premium Unstitched Fabrics
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1, p: 0 }}>
        {navLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton
              component={Link}
              href={link.href}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%)',
                },
              }}
            >
              {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
              <ListItemText 
                primary={link.label} 
                primaryTypographyProps={{ 
                  fontWeight: 600, 
                  fontSize: '1.1rem',
                  color: '#1e293b',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <Box sx={{ p: 3, background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1e293b' }}>
            Cart Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {cartCount} item{cartCount !== 1 ? 's' : ''}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#10b981' }}>
              {formatPrice(cartTotal)}
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/cart"
            variant="contained"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{
              background: 'linear-gradient(45deg, #2563eb, #1e40af)',
              color: '#ffffff',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            View Cart
          </Button>
        </Box>
      )}

      {/* Contact Info */}
      <Box sx={{ p: 3, background: '#1e293b', color: '#ffffff' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Contact Us
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalPhoneIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            +92 300 1234567
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            info@megicloth.com
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Karachi, Pakistan
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255,255,255,0.95)' 
            : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70 }, 
          px: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Slide direction="right" in={true} timeout={800}>
            <Typography
              variant="h5"
              component={Link}
              href="/"
              sx={{
                color: scrolled ? '#1e293b' : '#ffffff',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                letterSpacing: 1,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: scrolled ? '#2563eb' : '#e0e7ff',
                },
              }}
            >
              Megicloth
            </Typography>
          </Slide>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Fade in={true} timeout={1000}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: scrolled ? '#475569' : '#ffffff',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      position: 'relative',
                      '&:hover': {
                        background: 'transparent',
                        color: scrolled ? '#2563eb' : '#e0e7ff',
                        '&::after': {
                          transform: 'scaleX(1)',
                        },
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '100%',
                        height: 2,
                        background: scrolled ? '#2563eb' : '#ffffff',
                        transform: 'scaleX(0)',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Fade>
          )}

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search Button */}
            <Tooltip title="Search">
              <IconButton
                sx={{
                  color: scrolled ? '#475569' : '#ffffff',
                  '&:hover': {
                    background: scrolled ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Favorites */}
            <Tooltip title="Favorites">
              <IconButton
                sx={{
                  color: scrolled ? '#475569' : '#ffffff',
                  '&:hover': {
                    background: scrolled ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>

            {/* Cart */}
            <Tooltip title="Shopping Cart">
              <IconButton
                component={Link}
                href="/cart"
                sx={{
                  color: scrolled ? '#475569' : '#ffffff',
                  position: 'relative',
                  '&:hover': {
                    background: scrolled ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <Badge 
                  badgeContent={cartCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      minWidth: 20,
                      height: 20,
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Account */}
            <Tooltip title="Account">
              <IconButton
                sx={{
                  color: scrolled ? '#475569' : '#ffffff',
                  '&:hover': {
                    background: scrolled ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: scrolled ? '#475569' : '#ffffff',
                  ml: 1,
                  '&:hover': {
                    background: scrolled ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Cart Preview for Desktop */}
        {!isMobile && cartCount > 0 && (
          <Fade in={true} timeout={300}>
            <Box
              sx={{
                background: 'rgba(255,255,255,0.98)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={`${cartCount} item${cartCount !== 1 ? 's' : ''} in cart`}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Total: {formatPrice(cartTotal)}
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/cart"
                variant="contained"
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #059669, #047857)',
                  },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Fade>
        )}
      </AppBar>

      {/* Spacer for fixed header */}
      <Box sx={{ height: { xs: 64, sm: 70 } }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
