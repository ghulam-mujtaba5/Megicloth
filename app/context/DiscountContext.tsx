"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expirationDate?: string;
  usageLimit?: number;
  timesUsed: number;
}

interface DiscountContextType {
  discounts: Discount[];
  addDiscount: (discount: Omit<Discount, 'id' | 'timesUsed'>) => void;
  updateDiscount: (discount: Discount) => void;
  deleteDiscount: (discountId: string) => void;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export function useDiscounts() {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error('useDiscounts must be used within a DiscountProvider');
  }
  return context;
}

const mockDiscounts: Discount[] = [
  {
    id: 'd1',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    expirationDate: '2024-08-31',
    usageLimit: 100,
    timesUsed: 25,
  },
  {
    id: 'd2',
    code: 'WELCOME500',
    type: 'fixed',
    value: 500,
    expirationDate: '2024-12-31',
    timesUsed: 10,
  },
];

export function DiscountProvider({ children }: { children: ReactNode }) {
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);

  const addDiscount = useCallback((discountData: Omit<Discount, 'id' | 'timesUsed'>) => {
    const newDiscount: Discount = {
      ...discountData,
      id: `disc-${Date.now()}`,
      timesUsed: 0,
    };
    setDiscounts(prev => [...prev, newDiscount]);
  }, []);

  const updateDiscount = useCallback((updatedDiscount: Discount) => {
    setDiscounts(prev => prev.map(d => d.id === updatedDiscount.id ? updatedDiscount : d));
  }, []);

  const deleteDiscount = useCallback((discountId: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== discountId));
  }, []);

  const value = { discounts, addDiscount, updateDiscount, deleteDiscount };

  return <DiscountContext.Provider value={value}>{children}</DiscountContext.Provider>;
}
