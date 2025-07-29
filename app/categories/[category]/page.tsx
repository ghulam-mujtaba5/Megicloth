"use client";

import { useParams } from "next/navigation";
import { products } from "../../data/products";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Link from "next/link";
import Seo from "../../components/common/Seo";

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <>
      <Seo
        title={`${category} Fabrics | Megicloth`}
        description={`Shop premium ${category.toLowerCase()} fabrics at Megicloth. Discover our curated collection for every style and occasion.`}
        ogImage="/file.svg"
        canonical={`https://megicloth.com/categories/${encodeURIComponent(category)}`}
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={700}>
            <Box sx={{
              borderRadius: 4,
              background: 'rgba(255,255,255,0.65)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              p: { xs: 3, md: 6 },
              mb: 6,
              textAlign: 'center',
            }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
                {category} Collection
              </Typography>
              <Typography variant="h5" sx={{ color: '#64748b', mb: 3, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Explore our premium selection of {category.toLowerCase()} fabrics.
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {filtered.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" sx={{ mt: 2, color: '#64748b', fontWeight: 600 }}>
                    No products found in this category.
                  </Typography>
                </Box>
              </Grid>
            ) : (
              filtered.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card sx={{
                    borderRadius: 4,
                    background: '#f7fafc',
                    boxShadow: '2px 2px 8px #e2e8f0, -2px -2px 8px #ffffff',
                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                    '&:hover': { boxShadow: '0 12px 32px rgba(31,38,135,0.10), 0 1.5px 8px #e0e7ef', transform: 'scale(1.03)' },
                    display: 'flex', flexDirection: 'column', height: '100%',
                  }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 220, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>{product.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>{product.description}</Typography>
                      <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700, mb: 1 }}>
                        PKR {product.salePrice ?? product.price}
                      </Typography>
                      <Button
                        component={Link}
                        href={`/products/${product.id}`}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 700, mt: 1 }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
} 