"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Example nav structure
const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Sale", href: "/sale" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function NewNavbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);

  // --- Desktop Nav ---
  const renderDesktopLinks = () => (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, flex: 1, justifyContent: "center" }}>
      {NAV_LINKS.map((link) => (
        <Box
          key={link.label}
          sx={{ position: "relative" }}
          onMouseEnter={() => link.dropdown && setOpenDesktopDropdown(link.label)}
          onMouseLeave={() => link.dropdown && setOpenDesktopDropdown(null)}
        >
          <Button
            component={Link}
            href={link.href}
            sx={{
              color: pathname === link.href ? "primary.main" : "text.primary",
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              position: "relative",
              '&:after': link.dropdown ? {
                content: '""',
                display: 'inline-block',
                ml: 1,
                border: 'solid',
                borderWidth: '0 2px 2px 0',
                padding: '2px',
                transform: 'rotate(45deg)',
                borderColor: 'currentColor',
              } : undefined,
            }}
            aria-haspopup={!!link.dropdown}
            aria-expanded={openDesktopDropdown === link.label}
          >
            {link.label}
          </Button>
          {/* Dropdown */}
          {link.dropdown && openDesktopDropdown === link.label && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                bgcolor: "background.paper",
                boxShadow: 3,
                borderRadius: 2,
                minWidth: 180,
                zIndex: 10,
                py: 1,
              }}
              onMouseEnter={() => setOpenDesktopDropdown(link.label)}
              onMouseLeave={() => setOpenDesktopDropdown(null)}
            >
              {link.dropdown.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    display: "block",
                    width: "100%",
                    justifyContent: "flex-start",
                    color: pathname === item.href ? "primary.main" : "text.primary",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  // --- Mobile Nav ---
  const renderMobileLinks = () => (
    <List>
      {NAV_LINKS.map((link) =>
        link.dropdown ? (
          <Box key={link.label}>
            <ListItemButton
              onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              <ListItemText primary={link.label} />
              {openMobileDropdown === link.label ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMobileDropdown === link.label} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {link.dropdown.map((item) => (
                  <ListItemButton
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{ pl: 4, borderRadius: 2 }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ) : (
          <ListItem key={link.href} disablePadding>
            <ListItemButton
              component={Link}
              href={link.href}
              sx={{ fontWeight: 700, borderRadius: 2 }}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        )
      )}
    </List>
  );

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{
      background: "rgba(255,255,255,0.85)",
      boxShadow: "0 2px 16px 0 rgba(31, 38, 135, 0.08)",
      backdropFilter: "blur(10px)",
      borderBottom: "1.5px solid #e2e8f0",
    }}>
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
        {/* Brand */}
        <Typography
          variant="h4"
          component={Link}
          href="/"
          aria-label="Megicloth Home"
          sx={{
            fontWeight: 900,
            letterSpacing: "-2px",
            background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Poppins, Inter, sans-serif",
            userSelect: "none",
            textDecoration: "none",
            mr: 2,
          }}
        >
          Megicloth
        </Typography>
        {/* Desktop Nav */}
        {renderDesktopLinks()}
        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>J</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} ModalProps={{ keepMounted: true }}>
        <Box sx={{ width: 270, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: "-1.5px", background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Poppins, Inter, sans-serif" }}>
              Megicloth
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          {renderMobileLinks()}
        </Box>
      </Drawer>
    </AppBar>
  );
}
