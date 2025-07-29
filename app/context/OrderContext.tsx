"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import type { CartItem } from '../types';

export interface Order {
  id: string;
  userId: string;
  customerName: string; 
  date: string;
  items: CartItem[];
  total: number;
  shippingAddress: any;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  orderNotes?: string;
}

interface OrderContextType {
  orders: Order[]; 
  allOrders: Order[]; 
  addOrder: (cartItems: CartItem[], total: number, shippingAddress: any, paymentMethod: string, orderNotes?: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

const ALL_ORDERS_KEY = 'megicloth_all_orders';

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  // Load all orders from localStorage on initial load
  useEffect(() => {
    try {
        const storedOrders = localStorage.getItem(ALL_ORDERS_KEY);
        if (storedOrders) {
            setAllOrders(JSON.parse(storedOrders));
        }
    } catch (error) {
        console.error("Failed to parse orders from localStorage", error);
        setAllOrders([]);
    }
  }, []);

  // Persist all orders to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem(ALL_ORDERS_KEY, JSON.stringify(allOrders));
    } catch (error) {
        console.error("Failed to save orders to localStorage", error);
    }
  }, [allOrders]);

  const addOrder = useCallback((cartItems: CartItem[], total: number, shippingAddress: any, paymentMethod: string, orderNotes?: string) => {
    if (!user) return;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      customerName: `${user.firstName} ${user.lastName}`, 
      date: new Date().toISOString(),
      items: cartItems,
      total,
      shippingAddress,
      status: 'Pending',
      paymentMethod,
      orderNotes,
    };

    setAllOrders(prevOrders => [...prevOrders, newOrder]);
  }, [user]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setAllOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return allOrders.find(order => order.id === orderId);
  }, [allOrders]);

  // Filter orders for the current logged-in user
  const userOrders = user ? allOrders.filter(order => order.userId === user.id) : [];

  return (
    <OrderContext.Provider value={{ orders: userOrders, allOrders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}
