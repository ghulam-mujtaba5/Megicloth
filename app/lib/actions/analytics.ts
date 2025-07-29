"use server";

import { createClient } from '@/app/lib/supabase/server';

export async function getSalesByDate() {
  const supabase = createClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('orders')
    .select('created_at, total')
    .in('status', ['shipped', 'delivered'])
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching sales data:', error);
    throw new Error('Could not fetch sales data.');
  }

  // Process data to group by date
  const salesMap = new Map<string, number>();
  for (const order of data) {
    const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesMap.set(date, (salesMap.get(date) || 0) + order.total);
  }

  const chartData = Array.from(salesMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return chartData;
}

export async function getRecentOrders() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('id, created_at, total, status, shipping_name')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching recent orders:', error);
    throw new Error('Could not fetch recent orders.');
  }

  return data;
}

export async function getAnalyticsSummary() {
  const supabase = createClient();

  // Fetch total revenue - only for completed/shipped orders
  const { data: revenueData, error: revenueError } = await supabase
    .from('orders')
    .select('total')
    .in('status', ['shipped', 'delivered']);

  if (revenueError) {
    console.error('Error fetching revenue:', revenueError);
    throw new Error('Could not fetch revenue data.');
  }

  const totalRevenue = revenueData.reduce((acc, order) => acc + order.total, 0);

  // Fetch total sales (number of orders)
  const { count: salesCount, error: salesError } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  if (salesError) {
    console.error('Error fetching sales count:', salesError);
    throw new Error('Could not fetch sales count.');
  }

  // Fetch total customers
  const { count: customerCount, error: customerError } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  if (customerError) {
    console.error('Error fetching customer count:', customerError);
    throw new Error('Could not fetch customer count.');
  }

  return {
    totalRevenue,
    totalSales: salesCount || 0,
    totalCustomers: customerCount || 0,
  };
}
