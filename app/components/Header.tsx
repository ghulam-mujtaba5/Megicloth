
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
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
import Divider from "@mui/material/Divider";
import React from "react";


export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navLinks = [
    { label: "Products", href: "/products" },
    { label: "Cart", href: "/cart", icon: <Badge badgeContent={cartCount} color="success" sx={{ '& .MuiBadge-badge': { fontWeight: 700, fontSize: 12 } }}><ShoppingCartIcon /></Badge> },
    { label: "Checkout", href: "/checkout" },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: "#2563eb" }}>Megicloth</Typography>
        <IconButton onClick={() => setDrawerOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component={Link} href={link.href} sx={{ py: 1.5 }}>
              {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 17 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ background: "#2563eb", mb: { xs: 2, sm: 4 }, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 3 } }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: isMobile ? 1 : 0,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: { xs: 20, sm: 24 },
            letterSpacing: 1,
            mr: { xs: 0, md: 4 },
            ml: { xs: 1, md: 0 },
          }}
        >
          Megicloth
        </Typography>
        {isMobile ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ ml: 1 }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, ml: 4 }}>
            {navLinks.map((link) => (
              <Box key={link.label} sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  href={link.href}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 17,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    position: "relative"
                  }}
                >
                  {link.icon && <Box sx={{ mr: 0.5 }}>{link.icon}</Box>}
                  {link.label}
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 18, borderBottomLeftRadius: 18 } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
