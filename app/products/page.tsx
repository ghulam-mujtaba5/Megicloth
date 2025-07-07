"use client";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

export default function Products() {
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
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", background: "#f8fafc", py: { xs: 1, sm: 4 } }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          fontSize: { xs: 20, sm: 32, md: 40 },
          letterSpacing: 1,
          textAlign: "center",
          mb: { xs: 2, sm: 4 },
          mt: { xs: 1, sm: 4 }
        }}
      >
        All Products
      </Typography>
      <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 2, sm: 3 }, mt: { xs: 1, sm: 2 } }}>
        <Box component="hr" sx={{ border: 0, borderTop: "2px solid #e0e7ef", width: { xs: "98%", sm: "90%" }, mx: "auto", opacity: 0.5 }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 2, sm: 3 }, px: 1 }}>
        <TextField
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          size="small"
          inputProps={{ 'aria-label': 'Search products' }}
          sx={{
            borderRadius: 2,
            fontSize: { xs: 14, sm: 15 },
            width: "100%",
            maxWidth: { xs: 260, sm: 340 },
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.2s",
            '&:focus-within': { boxShadow: "0 2px 8px rgba(37,99,235,0.10)" }
          }}
        />
      </Box>
      <Grid container spacing={{ xs: 1.5, sm: 4 }} justifyContent="center" sx={{ px: { xs: 0.5, sm: 3 } }}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box sx={{ height: { xs: 320, sm: 420 }, borderRadius: 3, background: '#e0e7ef', width: '100%', maxWidth: 320, mx: 'auto', animation: 'pulse 1.5s infinite', '@keyframes pulse': { '0%': { opacity: 1 }, '50%': { opacity: 0.5 }, '100%': { opacity: 1 } } }} />
            </Grid>
          ))
        ) : filteredProducts.length === 0 ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#888", fontSize: 18, py: 4 }}>
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
