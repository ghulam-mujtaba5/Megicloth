"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

import { useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
// ...existing imports...
// ...existing imports...
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";

// ...existing imports...
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
// ...existing imports...
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { products } from "../../data/products";

const RECENT_SEARCHES_KEY = 'megicloth_recent_searches';

export default function Header() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  // ...existing code...
  const wishlistCount = wishlist.length;
  
  // ...existing code...
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Mobile drawer search state
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<typeof products>([]);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const [mobileHighlightedIndex, setMobileHighlightedIndex] = useState(-1);
  const [mobileRecentSearches, setMobileRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      setRecentSearches(stored ? JSON.parse(stored) : []);
    }
  }, []);

  // Load recent searches for mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      setMobileRecentSearches(stored ? JSON.parse(stored) : []);
    }
  }, [drawerOpen]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 6);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live search logic
  useEffect(() => {
    if (search.trim().length > 0) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6);
      setSearchResults(results);
      setHighlightedIndex(-1);
    } else {
      setSearchResults([]);
      setHighlightedIndex(-1);
    }
  }, [search]);

  // Live search for mobile
  useEffect(() => {
    if (mobileSearch.trim().length > 0) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(mobileSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(mobileSearch.toLowerCase())
      ).slice(0, 6);
      setMobileSearchResults(results);
      setMobileHighlightedIndex(-1);
    } else {
      setMobileSearchResults([]);
      setMobileHighlightedIndex(-1);
    }
  }, [mobileSearch]);

  // Keyboard navigation for search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResults.length && !recentSearches.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(i => (i < (searchResults.length || recentSearches.length) - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(i => (i > 0 ? i - 1 : (searchResults.length || recentSearches.length) - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        if (searchResults.length > 0) {
          window.location.href = `/products/${searchResults[highlightedIndex].id}`;
          saveRecentSearch(searchResults[highlightedIndex].name);
        } else if (recentSearches.length > 0) {
          setSearch(recentSearches[highlightedIndex]);
        }
      } else if (search.trim()) {
        saveRecentSearch(search);
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  // Keyboard navigation for mobile search
  const handleMobileSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!mobileSearchResults.length && !mobileRecentSearches.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMobileHighlightedIndex(i => (i < (mobileSearchResults.length || mobileRecentSearches.length) - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMobileHighlightedIndex(i => (i > 0 ? i - 1 : (mobileSearchResults.length || mobileRecentSearches.length) - 1));
    } else if (e.key === 'Enter') {
      if (mobileHighlightedIndex >= 0) {
        if (mobileSearchResults.length > 0) {
          window.location.href = `/products/${mobileSearchResults[mobileHighlightedIndex].id}`;
          saveRecentSearch(mobileSearchResults[mobileHighlightedIndex].name);
        } else if (mobileRecentSearches.length > 0) {
          setMobileSearch(mobileRecentSearches[mobileHighlightedIndex]);
        }
      } else if (mobileSearch.trim()) {
        saveRecentSearch(mobileSearch);
      }
    } else if (e.key === 'Escape') {
      setMobileSearchFocused(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: null },
    { label: "Shop", href: "/products", icon: null },
    { label: "Categories", href: "/categories", icon: null },
    { label: "Sale", href: "/sale", icon: null },
    { label: "About", href: "/about", icon: null },
    { label: "Contact", href: "/contact", icon: null },
  ];

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Glassmorphism style for AppBar
  const glassAppBarSx = {
    background: 'rgba(255,255,255,0.75)',
    boxShadow: scrolled ? '0 4px 24px 0 rgba(31, 38, 135, 0.10)' : 'none',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1.5px solid #e2e8f0',
    transition: 'box-shadow 0.3s',
  };

  // Stylized brand name
  const brandName = (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 900,
        letterSpacing: '-2px',
        background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: 'Poppins, Inter, sans-serif',
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
      }}
      component={Link}
      href="/"
      aria-label="Megicloth Home"
    >
      Megicloth
    </Typography>
  );

  // Nav links (desktop)
  const navLinksDesktop = (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center', ml: 4 }}>
      {navLinks.map((link) => (
        <Button
          key={link.label}
          component={Link}
          href={link.href}
          sx={{
            fontWeight: 700,
            fontSize: '1.08rem',
            color: '#1e293b',
            background: 'transparent',
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'all 0.2s',
            '&:hover': {
              background: alpha('#2563eb', 0.08),
              color: '#2563eb',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );

  // Search bar (desktop)
  const searchBarDesktop = (
    <Box sx={{ flex: 1, maxWidth: 600, ml: 4, display: { xs: 'none', md: 'flex' } }} ref={setSearchAnchorEl}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search for products, brands, and categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 150)} // Delay to allow click on results
        onKeyDown={handleSearchKeyDown}
        sx={{
          background: '#f7fafc',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid #e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#2563eb',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
              boxShadow: `0 0 0 2px ${alpha('#2563eb', 0.2)}`,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" aria-hidden="true" />
            </InputAdornment>
          ),
          'aria-label': 'Search products',
          role: 'combobox',
          'aria-expanded': searchFocused,
          'aria-controls': 'search-autocomplete-list',
        }}
        autoComplete="off"
      />
      <Popper
        open={searchFocused && (searchResults.length > 0 || recentSearches.length > 0)}
        anchorEl={searchAnchorEl}
        placement="bottom"
        transition
        disablePortal
        sx={{ width: searchAnchorEl?.clientWidth, zIndex: 1201 }}
      >
        <Paper elevation={3} sx={{ mt: 0.5, borderRadius: 2, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)' }}>
          <List dense id="search-autocomplete-list" role="listbox">
            {search.trim() && searchResults.length > 0 ? (
              searchResults.map((result, idx) => (
                <ListItem key={result.id} disablePadding selected={highlightedIndex === idx} role="option" aria-selected={highlightedIndex === idx}>
                  <ListItemButton component={Link} href={`/products/${result.id}`} sx={{ gap: 2 }} onClick={() => saveRecentSearch(result.name)}>
                    <ListItemAvatar>
                      <Avatar src={result.image} alt={result.name} variant="rounded" sx={{ width: 40, height: 40, mr: 1 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={result.name}
                      secondary={result.description}
                      primaryTypographyProps={{ fontWeight: 700, color: '#1e293b' }}
                      secondaryTypographyProps={{ color: '#64748b', fontSize: '0.85rem' }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981', ml: 2 }}>
                      {formatPrice(result.salePrice ?? result.price)}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              recentSearches.map((term, idx) => (
                <ListItem key={term} disablePadding selected={highlightedIndex === idx} role="option" aria-selected={highlightedIndex === idx}>
                  <ListItemButton onClick={() => { setSearch(term); setSearchFocused(false); }}>
                    <ListItemText primary={term} primaryTypographyProps={{ fontWeight: 700, color: '#2563eb' }} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Popper>
    </Box>
  );

  // Cart, wishlist, profile icons (desktop)
  const actionsDesktop = (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, ml: 4 }}>
      <Tooltip title="Wishlist">
        <IconButton component={Link} href="/wishlist" aria-label={`Wishlist: ${wishlistCount} items`} sx={{ color: '#ef4444', position: 'relative' }}>
          <Badge badgeContent={wishlistCount} color="error" overlap="circular" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title="Cart">
        <IconButton component={Link} href="/cart" aria-label={`Cart: ${cartCount} items`} sx={{ color: '#2563eb', position: 'relative' }}>
          <Badge badgeContent={cartCount} color="primary" overlap="circular" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {isAuthenticated ? (
        <>
          <Tooltip title="Account">
            <IconButton
              onClick={handleUserMenuOpen}
              aria-label="Open user menu"
              aria-controls={Boolean(anchorEl) ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              sx={{ color: '#1e293b', ml: 1 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563eb', fontWeight: 700 }}>
                {user?.firstName ? user.firstName[0] : <PersonIcon />}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            MenuListProps={{
              'aria-labelledby': 'user-menu-button',
            }}
          >
            <MenuItem component={Link} href="/profile" onClick={handleUserMenuClose}>
              <AccountCircleIcon sx={{ mr: 1 }} /> My Profile
            </MenuItem>
            <MenuItem component={Link} href="/profile?tab=orders" onClick={handleUserMenuClose}>
              <ShoppingBagIcon sx={{ mr: 1 }} /> My Orders
            </MenuItem>
            <MenuItem component={Link} href="/profile?tab=settings" onClick={handleUserMenuClose}>
              <SettingsIcon sx={{ mr: 1 }} /> Account Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Tooltip title="Login">
          <IconButton
            component={Link}
            href={'/auth/login'}
            aria-label="Login"
            sx={{ color: '#1e293b', ml: 1 }}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  // Mobile drawer toggle
  const mobileMenuButton = (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerToggle}
      sx={{ display: { md: 'none' }, ml: 1 }}
    >
      <MenuIcon />
    </IconButton>
  );

  // ...existing code...

  return (
    <AppBar position="sticky" elevation={0} sx={glassAppBarSx}>
      <Toolbar sx={{ minHeight: { xs: 64, md: 80 }, px: { xs: 2, md: 6 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {brandName}
        {navLinksDesktop}
        {searchBarDesktop}
        {actionsDesktop}
        {mobileMenuButton}
      </Toolbar>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        aria-label="Mobile navigation drawer"
        role="navigation"
        transitionDuration={350}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleDrawerToggle} aria-label="Close menu" sx={{ mr: 1 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-1.5px', background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Poppins, Inter, sans-serif' }}>
              Megicloth
            </Typography>
          </Box>
          {/* Mobile search bar */}
          <TextField
            size="small"
            placeholder="Search products..."
            value={mobileSearch}
            onChange={e => setMobileSearch(e.target.value)}
            onFocus={() => setMobileSearchFocused(true)}
            onBlur={() => setTimeout(() => setMobileSearchFocused(false), 150)}
            onKeyDown={handleMobileSearchKeyDown}
            sx={{ background: '#f7fafc', borderRadius: 2, mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" aria-hidden="true" />
                </InputAdornment>
              ),
              'aria-label': 'Search products',
              role: 'combobox',
              'aria-expanded': mobileSearchFocused,
              'aria-controls': 'mobile-search-autocomplete-list',
            }}
            autoComplete="off"
          />
          {/* Mobile search results dropdown */}
          {mobileSearchFocused && (mobileSearchResults.length > 0 || mobileRecentSearches.length > 0) && (
            <Paper elevation={3} sx={{ mt: 0.5, mb: 2, borderRadius: 2, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)' }}>
              <List dense id="mobile-search-autocomplete-list" role="listbox">
                {mobileSearch.trim() && mobileSearchResults.length > 0 ? (
                  mobileSearchResults.map((result, idx) => (
                    <ListItem key={result.id} disablePadding selected={mobileHighlightedIndex === idx} role="option" aria-selected={mobileHighlightedIndex === idx}>
                      <ListItemButton component={Link} href={`/products/${result.id}`} sx={{ gap: 2 }} onClick={() => saveRecentSearch(result.name)}>
                        <ListItemAvatar>
                          <Avatar src={result.image} alt={result.name} variant="rounded" sx={{ width: 40, height: 40, mr: 1 }} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={result.name}
                          secondary={result.description}
                          primaryTypographyProps={{ fontWeight: 700, color: '#1e293b' }}
                          secondaryTypographyProps={{ color: '#64748b', fontSize: '0.85rem' }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981', ml: 2 }}>
                          {formatPrice(result.salePrice ?? result.price)}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  mobileRecentSearches.map((term, idx) => (
                    <ListItem key={term} disablePadding selected={mobileHighlightedIndex === idx} role="option" aria-selected={mobileHighlightedIndex === idx}>
                      <ListItemButton onClick={() => { setMobileSearch(term); setMobileSearchFocused(false); }}>
                        <ListItemText primary={term} primaryTypographyProps={{ fontWeight: 700, color: '#2563eb' }} />
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          )}
          {/* Navigation links */}
          <List aria-label="Main navigation" sx={{ flex: 1 }}>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} sx={{ borderRadius: 2, fontWeight: 700, transition: 'background 0.2s', '&:hover, &:focus': { background: alpha('#2563eb', 0.08) } }}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* ... existing drawer content ... */}
        </Box>
      </Drawer>
    </AppBar>
  );
}
