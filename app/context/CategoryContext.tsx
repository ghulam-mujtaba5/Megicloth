"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const initialCategories: Category[] = [
  { id: '1', name: 'Apparel', description: 'All types of clothing for men, women, and children.', imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=60', createdAt: new Date().toISOString() },
  { id: '2', name: 'Accessories', description: 'Belts, scarves, hats, and more.', imageUrl: 'https://images.unsplash.com/photo-1523268755815-fe7c3ba3a574?auto=format&fit=crop&w=800&q=60', createdAt: new Date().toISOString() },
  { id: '3', name: 'Footwear', description: 'Shoes, sandals, and boots.', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=60', createdAt: new Date().toISOString() },
  { id: '4', name: 'Home Goods', description: 'Bedding, towels, and other home textiles.', imageUrl: 'https://images.unsplash.com/photo-1556955112-28cde3817b0a?auto=format&fit=crop&w=800&q=60', createdAt: new Date().toISOString() },
];

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (category: Omit<Category, 'id' | 'createdAt'>) => {
    setCategories(prev => [...prev, { ...category, id: String(Date.now()), createdAt: new Date().toISOString() }]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
