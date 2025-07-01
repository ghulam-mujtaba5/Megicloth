
"use client";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setFilteredProducts(
        products.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        )
      );
      setLoading(false);
    }, 400); // Simulate loading and debounce search
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        background: "#f8fafc",
        minHeight: "100vh",
        px: { xs: 1.5, sm: 2, md: 4 },
        py: { xs: 1.5, sm: 2, md: 4 },
        mx: "auto"
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(100deg, #1e293b 0%, #2563eb 100%)",
          color: "#fff",
          borderRadius: { xs: 2, sm: 3 },
          p: { xs: 2.5, sm: 5 },
          mt: { xs: 1, sm: 4 },
          mb: { xs: 2, sm: 5 },
          textAlign: "center",
          boxShadow: { xs: "0 2px 8px rgba(37,99,235,0.10)", sm: "0 8px 32px rgba(37,99,235,0.10)" },
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.3s",
          mx: { xs: 0, sm: 0 },
          '&:hover': { boxShadow: { xs: "0 4px 16px rgba(37,99,235,0.18)", sm: "0 12px 40px rgba(37,99,235,0.18)" } }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png') repeat",
            opacity: 0.08,
            zIndex: 0
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 22, sm: 30, md: 38 },
              fontWeight: 900,
              m: 0,
              letterSpacing: 1,
              lineHeight: 1.1,
              maxWidth: 340,
              mx: "auto"
            }}
          >
            Unstitched Luxury Fabrics
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, sm: 17 }, mt: 1.5, fontWeight: 500, color: "#e0e7ff" }}>
            Premium Men’s & Women’s Unstitched Clothes
          </Typography>
          <Typography sx={{ fontSize: { xs: 12, sm: 14 }, mt: 1.2, color: "#c7d2fe" }}>
            Shop the latest collections. Fast delivery, easy returns, and the best prices in Pakistan.
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            sx={{
              mt: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              background: "#fff",
              color: "#2563eb",
              borderRadius: 2,
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 },
              boxShadow: { xs: "0 1px 6px rgba(37,99,235,0.10)", sm: "0 2px 12px rgba(37,99,235,0.10)" },
              textTransform: "none",
              letterSpacing: 1,
              transition: "background 0.2s, color 0.2s",
              '&:hover': { background: "#e0e7ff", color: "#1e293b" }
            }}
            aria-label="Shop all products"
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Divider */}
      <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 2, sm: 4 }, mt: { xs: 1, sm: 2 } }}>
        <Box component="hr" sx={{ border: 0, borderTop: "2px solid #e0e7ef", width: { xs: "100%", sm: "90%" }, mx: "auto", opacity: 0.5 }} />
      </Box>

      {/* Section Title and View All */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          mb: { xs: 2, sm: 3 },
          gap: { xs: 1, sm: 2 },
          px: { xs: 0.5, sm: 1 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: 17, sm: 26, md: 32 },
            fontWeight: 800,
            color: "#222",
            textAlign: "left",
            letterSpacing: 1,
            mb: { xs: 1, sm: 0 },
            flex: 1
          }}
        >
          Featured Products
        </Typography>
        <Button
          component={Link}
          href="/products"
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            fontSize: { xs: 13, sm: 15 },
            px: { xs: 2, sm: 3 },
            py: { xs: 0.8, sm: 1 },
            color: "#2563eb",
            borderColor: "#2563eb",
            textTransform: "none",
            letterSpacing: 0.5,
            minWidth: { xs: 100, sm: 0 },
            alignSelf: { xs: "stretch", sm: "auto" },
            '&:hover': { background: "#e0e7ff", borderColor: "#2563eb" }
          }}
          aria-label="View all products"
        >
          View All
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 2, sm: 3 }, px: 0 }}>
        <TextField
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          size="small"
          inputProps={{ 'aria-label': 'Search products' }}
          sx={{
            borderRadius: 2,
            fontSize: { xs: 13, sm: 15 },
            width: "100%",
            maxWidth: { xs: 260, sm: 340 },
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.2s",
            '&:focus-within': { boxShadow: "0 2px 8px rgba(37,99,235,0.10)" }
          }}
        />
      </Box>

      {/* Products Grid */}
      <Grid
        container
        spacing={{ xs: 1.2, sm: 2.5 }}
        justifyContent="center"
        sx={{ px: { xs: 0, sm: 1 } }}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box
                sx={{
                  height: { xs: 220, sm: 320 },
                  borderRadius: 3,
                  background: '#e0e7ef',
                  width: '100%',
                  maxWidth: 320,
                  mx: 'auto',
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
            </Grid>
          ))
        ) : filteredProducts.length === 0 ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#888", fontSize: 16, py: 4 }}>
              No products found.
            </Typography>
          </Grid>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box sx={{ transition: 'transform 0.18s', '&:hover': { transform: 'translateY(-6px) scale(1.03)' } }}>
                <ProductCard product={product} />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
