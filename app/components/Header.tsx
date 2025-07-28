"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';

import SearchIcon from "@mui/icons-material/Search";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { products } from "../data/products";

const RECENT_SEARCHES_KEY = 'megicloth_recent_searches';

export default function Header() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useWishlist();
  const pathname = usePathname();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<typeof products>([]);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const [mobileHighlightedIndex, setMobileHighlightedIndex] = useState(-1);
  const [mobileRecentSearches, setMobileRecentSearches] = useState<string[]>([]);
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      setRecentSearches(stored ? JSON.parse(stored) : []);
      setMobileRecentSearches(stored ? JSON.parse(stored) : []);
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 6);
    setRecentSearches(updated);
    setMobileRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    setHighlightedIndex(-1);
  }, [search]);

  useEffect(() => {
    if (mobileSearch.trim().length > 0) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(mobileSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(mobileSearch.toLowerCase())
      ).slice(0, 6);
      setMobileSearchResults(results);
    } else {
      setMobileSearchResults([]);
    }
    setMobileHighlightedIndex(-1);
  }, [mobileSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = searchResults.length > 0 ? searchResults : recentSearches;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex > -1) {
        const selected = items[highlightedIndex];
        if (typeof selected === 'string') {
          setSearch(selected);
        } else {
          saveRecentSearch(selected.name);
          window.location.href = `/products/${selected.id}`;
        }
      } else if (search.trim()) {
        saveRecentSearch(search);
      }
      setSearchFocused(false);
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  const handleMobileSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = mobileSearchResults.length > 0 ? mobileSearchResults : mobileRecentSearches;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMobileHighlightedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMobileHighlightedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      if (mobileHighlightedIndex > -1) {
        const selected = items[mobileHighlightedIndex];
        if (typeof selected === 'string') {
          setMobileSearch(selected);
        } else {
          saveRecentSearch(selected.name);
          window.location.href = `/products/${selected.id}`;
        }
      } else if (mobileSearch.trim()) {
        saveRecentSearch(mobileSearch);
      }
       setMobileSearchFocused(false);
    } else if (e.key === 'Escape') {
       setMobileSearchFocused(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Shop", href: "/products", dropdown: [
        { label: "All Products", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "Sale", href: "/sale" },
      ]
    },
    { label: "Blog", href: "/blog" },
    {
      label: "Pages", href: "#", dropdown: [
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "Privacy", href: "/privacy" },
        { label: "Contact", href: "/contact" },
      ]
    },
  ];

  const accountLinks = [
    { label: "My Account", href: "/account", icon: <AccountCircleIcon fontSize="small" /> },
    { label: "Wishlist", href: "/account/wishlist", icon: <FavoriteIcon fontSize="small" /> },
    { label: "Cart", href: "/cart", icon: <ShoppingCartIcon fontSize="small" /> },
    { label: "Checkout", href: "/checkout", icon: <ShoppingBagIcon fontSize="small" /> },
    ...(user?.role === 'admin' ? [{ label: "Admin Dashboard", href: "/admin/dashboard", icon: <SettingsIcon fontSize="small" /> }] : []),
  ];

  const handleDrawerToggle = useCallback(() => setDrawerOpen(prev => !prev), []);
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(price);

  const glassAppBarSx = {
    background: 'rgba(255,255,255,0.75)',
    boxShadow: scrolled ? '0 4px 24px 0 rgba(31, 38, 135, 0.10)' : 'none',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1.5px solid #e2e8f0',
    transition: 'box-shadow 0.3s, background 0.3s',
  };

  const brandName = (
    <Typography variant="h4" component={Link} href="/" aria-label="Megicloth Home" sx={{
      fontWeight: 900, letterSpacing: '-2px',
      background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
      backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      fontFamily: 'Poppins, Inter, sans-serif', userSelect: 'none', textDecoration: 'none',
    }}>
      Megicloth
    </Typography>
  );

  const navLinksDesktop = (
    <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
      {navLinks.map((link) => (
        <Box key={link.label} onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)} onMouseLeave={() => link.dropdown && setOpenDropdown(null)}>
          <Button component={Link} href={link.href} sx={{
            color: 'text.primary', fontWeight: 600, fontSize: '1rem',
            textTransform: 'none', position: 'relative',
            '&:after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'primary.main', transform: pathname === link.href || (link.dropdown && openDropdown === link.label) ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.3s ease' }
          }}>
            {link.label}
          </Button>
          {link.dropdown && (
            <Popper open={openDropdown === link.label} anchorEl={document.querySelector(`a[href="${link.href}"]`)} placement="bottom-start" transition disablePortal>
              {({ TransitionProps }) => (
                <Paper elevation={3} sx={{ mt: 1, borderRadius: 2, overflow: 'hidden' }} {...TransitionProps}>
                  <List dense disablePadding>
                    {link.dropdown.map(item => (
                      <ListItemButton key={item.href} component={Link} href={item.href} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              )}
            </Popper>
          )}
        </Box>
      ))}
    </Box>
  );

  const searchBarDesktop = (
    <Box ref={setSearchAnchorEl} sx={{ position: 'relative', width: { md: 250, lg: 350 } }}>
      <TextField fullWidth size="small" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 150)} onKeyDown={handleSearchKeyDown} sx={{ '.MuiOutlinedInput-root': { borderRadius: 50 } }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }} autoComplete="off" />
      {searchFocused && (searchResults.length > 0 || recentSearches.length > 0) && (
        <Popper open={true} anchorEl={searchAnchorEl} placement="bottom" transition sx={{ zIndex: 1200, width: '100%' }}>
          {({ TransitionProps }) => (
            <Paper elevation={3} sx={{ mt: 1, borderRadius: 2 }} {...TransitionProps}>
              <List dense>
                {search.trim() && searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <ListItem key={result.id} disablePadding selected={highlightedIndex === idx} onMouseDown={() => { saveRecentSearch(result.name); window.location.href = `/products/${result.id}`; }}>
                      <ListItemButton><ListItemAvatar><Avatar src={result.image} alt={result.name} variant="rounded" /></ListItemAvatar><ListItemText primary={result.name} secondary={formatPrice(result.salePrice ?? result.price)} /></ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  recentSearches.map((term, idx) => (
                    <ListItem key={term} disablePadding selected={highlightedIndex === idx} onMouseDown={() => setSearch(term)}>
                      <ListItemButton><ListItemText primary={term} /></ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          )}
        </Popper>
      )}
    </Box>
  );

  const actionsDesktop = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {isAuthenticated ? (
        <Tooltip title="My Account">
          <IconButton onClick={handleUserMenuOpen} size="small">
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>{user?.firstName?.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Button component={Link} href="/login" variant="contained" disableElevation sx={{ borderRadius: 50 }}>Login</Button>
      )}
      <Tooltip title="Wishlist">
        <IconButton component={Link} href="/account/wishlist" aria-label={`Wishlist with ${wishlistCount} items`}>
          <Badge badgeContent={wishlistCount} color="secondary"><FavoriteIcon /></Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title="Cart">
        <IconButton component={Link} href="/cart" aria-label={`Cart with ${cartCount} items`}>
          <Badge badgeContent={cartCount} color="primary"><ShoppingCartIcon /></Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={glassAppBarSx}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="Open menu" onClick={handleDrawerToggle}><MenuIcon /></IconButton>
        </Box>
        {brandName}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center' }}>{navLinksDesktop}</Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {searchBarDesktop}
          {actionsDesktop}
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
        <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-1.5px', background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Poppins, Inter, sans-serif' }}>Megicloth</Typography>
            <IconButton onClick={handleDrawerToggle} aria-label="Close menu"><CloseIcon /></IconButton>
          </Box>
          <TextField size="small" placeholder="Search products..." value={mobileSearch} onChange={e => setMobileSearch(e.target.value)} onFocus={() => setMobileSearchFocused(true)} onBlur={() => setTimeout(() => setMobileSearchFocused(false), 150)} onKeyDown={handleMobileSearchKeyDown} sx={{ background: '#f7fafc', borderRadius: 2, mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }} autoComplete="off" />
          {mobileSearchFocused && (mobileSearchResults.length > 0 || mobileRecentSearches.length > 0) && (
            <Paper elevation={3} sx={{ mt: 0.5, mb: 2, borderRadius: 2 }}>
              <List dense>
                {mobileSearch.trim() && mobileSearchResults.length > 0 ? (
                  mobileSearchResults.map((result, idx) => (
                    <ListItem key={result.id} disablePadding selected={mobileHighlightedIndex === idx} onMouseDown={() => { saveRecentSearch(result.name); window.location.href = `/products/${result.id}`; }}>
                      <ListItemButton><ListItemAvatar><Avatar src={result.image} alt={result.name} variant="rounded" /></ListItemAvatar><ListItemText primary={result.name} secondary={formatPrice(result.salePrice ?? result.price)} /></ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  mobileRecentSearches.map((term, idx) => (
                    <ListItem key={term} disablePadding selected={mobileHighlightedIndex === idx} onMouseDown={() => setMobileSearch(term)}>
                      <ListItemButton><ListItemText primary={term} /></ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          )}
          <List component="nav" sx={{ flex: 1, overflowY: 'auto' }}>
            {navLinks.map((link) => link.dropdown ? (
              <div key={link.label}>
                <ListItemButton onClick={() => setOpenMobileMenu(openMobileMenu === link.label ? null : link.label)} sx={{ borderRadius: 2, fontWeight: 700 }}>
                  <ListItemText primary={link.label} />
                  {openMobileMenu === link.label ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openMobileMenu === link.label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.dropdown.map((item) => (
                      <ListItemButton key={item.href} component={Link} href={item.href} sx={{ pl: 4, borderRadius: 2 }} onClick={handleDrawerToggle}>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} sx={{ borderRadius: 2, fontWeight: 700 }} onClick={handleDrawerToggle}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose} PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 }, '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 } } }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {accountLinks.map((link) => (
          <MenuItem key={link.href} component={Link} href={link.href} onClick={handleUserMenuClose}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            {link.label}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
