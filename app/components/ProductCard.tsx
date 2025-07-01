"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image.startsWith('http') ? product.image : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';
  const { addToCart } = useCart();
  const [hovered, setHovered] = React.useState(false);
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: hovered ? "0 6px 24px rgba(37,99,235,0.13)" : "0 2px 8px rgba(0,0,0,0.06)",
        width: "100%",
        minWidth: 220,
        maxWidth: 320,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 420,
        position: "relative",
        transition: "box-shadow 0.2s, transform 0.18s",
        transform: hovered ? "translateY(-4px) scale(1.025)" : "none",
        cursor: "pointer"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={product.name}
          sx={{ objectFit: "cover", borderRadius: 2, background: "#f3f4f6" }}
          onError={(e: any) => (e.target.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80')}
        />
        {product.salePrice && (
          <Chip label="Sale" color="error" size="small" sx={{ position: "absolute", top: 10, left: 10, fontWeight: 700, fontSize: 13, zIndex: 2 }} />
        )}
        {hovered && (
          <Button
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            variant="contained"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              background: "#10b981",
              color: "#fff",
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
              px: 2.5,
              py: 1,
              textTransform: "none",
              boxShadow: "0 1px 4px rgba(16,185,129,0.10)",
              zIndex: 3,
              opacity: 0.95,
              transition: "background 0.2s, opacity 0.2s",
              '&:hover': { background: "#059669", opacity: 1 }
            }}
            aria-label={`Quick add ${product.name} to cart`}
          >
            Quick Add
          </Button>
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20, mb: 0.5, color: "#222", textAlign: "center", minHeight: 48 }}>{product.name}</Typography>
        <Rating value={product.rating ?? 0} precision={0.1} readOnly size="small" sx={{ mb: 1 }} />
        <Typography sx={{ color: "#666", fontSize: 14, textAlign: "center", mb: 1, minHeight: 40 }}>{product.description}</Typography>
        <Box sx={{ fontSize: 18, fontWeight: 500, mt: 1, color: "#10b981", textAlign: "center" }}>
          Rs. {product.salePrice ?? product.price}
          {product.salePrice && (
            <Typography component="span" sx={{ textDecoration: "line-through", color: "#888", fontSize: 15, ml: 1 }}>
              Rs. {product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", gap: 1, mb: 1 }}>
        <Button
          component={Link}
          href={`/products/${product.id}`}
          variant="contained"
          sx={{ background: "#2563eb", color: "#fff", borderRadius: 2, fontWeight: 600, fontSize: 15, px: 3, py: 1, textTransform: "none", boxShadow: "0 1px 4px rgba(37,99,235,0.08)", '&:hover': { background: "#1e40af" } }}
          aria-label={`View details for ${product.name}`}
        >
          View Details
        </Button>
        <Button
          onClick={() => addToCart(product)}
          variant="contained"
          sx={{ background: "#10b981", color: "#fff", borderRadius: 2, fontWeight: 600, fontSize: 15, px: 3, py: 1, textTransform: "none", boxShadow: "0 1px 4px rgba(16,185,129,0.08)", '&:hover': { background: "#059669" } }}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
