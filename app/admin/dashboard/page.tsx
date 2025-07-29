"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { getAnalyticsSummary } from '@/app/lib/actions/analytics';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import RecentOrders from './RecentOrders';

export default function AdminDashboard() {
  const [summary, setSummary] = useState<{ totalRevenue: number; totalSales: number; totalCustomers: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAnalyticsSummary()
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load analytics summary.');
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sales Overview (Last 7 Days)</Typography>
            <SalesChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Orders</Typography>
            <RecentOrders />
          </Paper>
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography color="error" sx={{ p: 2 }}>{error}</Typography>
          </Grid>
        )}
        {summary && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard 
                title="Total Revenue" 
                value={`$${summary.totalRevenue.toLocaleString()}`} 
                icon={<MonetizationOnIcon sx={{ fontSize: 40 }} />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard 
                title="Total Sales" 
                value={summary.totalSales.toLocaleString()} 
                icon={<ShoppingCartIcon sx={{ fontSize: 40 }} />} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard 
                title="Total Customers" 
                value={summary.totalCustomers.toLocaleString()} 
                icon={<PeopleIcon sx={{ fontSize: 40 }} />} 
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
