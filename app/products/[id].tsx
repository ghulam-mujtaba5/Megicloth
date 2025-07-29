"use client";

import { notFound } from "next/navigation";
import { products } from '@/app/data/products';
import { useCart } from "../context/CartContext";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Image from 'next/image';

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();
  const imageUrl = Array.isArray(product.images) && product.images.length > 0
    ? (product.images[0].startsWith('http') ? product.images[0] : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80')
    : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';
  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh", py: { xs: 2, sm: 4 } }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 6 }, alignItems: { xs: "center", md: "flex-start" }, background: "#fff", borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", p: { xs: 2, sm: 4 } }}>
        <Box sx={{ minWidth: 260, maxWidth: 340, width: "100%", mb: { xs: 2, md: 0 } }}>
          <Image
            src={imageUrl}
            alt={product.name}
            width={600}
            height={240}
            style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 12, background: '#f3f4f6' }}
            priority
          />
        </Box>
        <Box sx={{ flex: 1, width: "100%" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{product.name}</Typography>
          <Typography sx={{ color: "#666", fontSize: 16, mb: 2 }}>{product.description}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#10b981" }}>Rs. {product.salePrice ?? product.price}</Typography>
            {product.salePrice && (
              <Typography sx={{ textDecoration: "line-through", color: "#888", fontSize: 17, ml: 1 }}>Rs. {product.price}</Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Chip label={product.category} color="primary" size="small" sx={{ fontWeight: 600 }} />
            <Chip label={product.stock > 0 ? "In Stock" : "Out of Stock"} color={product.stock > 0 ? "success" : "error"} size="small" />
            <Chip label={`SKU: ${product.sku}`} size="small" />
            <Rating value={product.rating ?? 0} precision={0.1} readOnly size="small" sx={{ ml: 1 }} />
          </Box>
          <Button
            onClick={() => addToCart(product)}
            variant="contained"
            sx={{
              background: "#10b981",
              color: "#fff",
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 18,
              px: 5,
              py: 1.5,
              boxShadow: "0 1px 4px rgba(16,185,129,0.08)",
              mt: 2,
              '&:hover': { background: "#059669" }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
