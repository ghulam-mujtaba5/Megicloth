"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  buttonText: string;
}

export interface HomepageSettings {
  heroSlides: HeroSlide[];
  featuredCategories: string[]; // Array of category IDs
  featuredBrands: string[]; // Array of brand IDs
}

interface HomepageContextType {
  settings: HomepageSettings;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateFeaturedCategories: (categoryIds: string[]) => void;
  updateFeaturedBrands: (brandIds: string[]) => void;
}

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export function useHomepage() {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error('useHomepage must be used within a HomepageProvider');
  }
  return context;
}

const initialSettings: HomepageSettings = {
  heroSlides: [
    {
      id: '1',
      title: 'Discover Our New Collection',
      subtitle: 'High-quality fabrics for every occasion. Explore the latest trends.',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1920&q=80',
      link: '/collections/new-arrivals',
      buttonText: 'Shop Now',
    },
    {
      id: '2',
      title: 'Summer Sale is Here!',
      subtitle: 'Get up to 50% off on selected items. Limited time offer.',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80',
      link: '/collections/sale',
      buttonText: 'Explore Sale',
    },
    {
      id: '3',
      title: 'Luxury Fabrics, Unbeatable Prices',
      subtitle: 'Experience the finest materials for your creations.',
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1920&q=80',
      link: '/collections/luxury',
      buttonText: 'Discover Luxury',
    },
  ],
  featuredCategories: ['1', '2', '3', '4'],
  featuredBrands: ['1', '2', '3', '4', '5', '6'],
};

export function HomepageProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<HomepageSettings>(initialSettings);

  const updateHeroSlides = useCallback((slides: HeroSlide[]) => {
    setSettings(prev => ({ ...prev, heroSlides: slides }));
  }, []);

  const updateFeaturedCategories = useCallback((categoryIds: string[]) => {
    setSettings(prev => ({ ...prev, featuredCategories: categoryIds }));
  }, []);

  const updateFeaturedBrands = useCallback((brandIds: string[]) => {
    setSettings(prev => ({ ...prev, featuredBrands: brandIds }));
  }, []);

  const value = { settings, updateHeroSlides, updateFeaturedCategories, updateFeaturedBrands };

  return <HomepageContext.Provider value={value}>{children}</HomepageContext.Provider>;
}
