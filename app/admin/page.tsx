"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Typography>Loading...</Typography></Box>;
  }

  if (!user || user.role !== "admin") {
    return <Alert severity="error">You do not have permission to access this page.</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ fontWeight: 900, mb: 4 }}>Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Rs 0 {/* TODO: Replace with real data */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                0 {/* TODO: Replace with real data */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Products</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                0 {/* TODO: Replace with real data */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                0 {/* TODO: Replace with real data */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* TODO: Add navigation links to products, orders, users management */}
    </Container>
  );
}
