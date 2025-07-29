"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6">Sales Overview</Typography>
            {/* Placeholder for sales chart */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6">Recent Orders</Typography>
            {/* Placeholder for recent orders */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6">Key Metrics</Typography>
            {/* Placeholder for key metrics */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
