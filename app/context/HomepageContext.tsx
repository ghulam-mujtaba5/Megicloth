"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the types for your homepage settings
interface HeroSlide {
  imageUrl: string;
  title: string;
  subtitle: string;
  link?: string;
  buttonText: string;
}

// 1. Define the types for your homepage settings
interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  featuredCategories: string[];
  featuredBrands: string[];
  heroSlides: HeroSlide[];
}

// 2. Define the context type
interface HomepageContextType {
  settings: HomepageSettings;
  setSettings: React.Dispatch<React.SetStateAction<HomepageSettings>>;
}

// 3. Create the context with a default value
const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

// 4. Create the Provider component
export const HomepageProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<HomepageSettings>({
    heroSlides: [
      {
        imageUrl: '/images/hero/hero-1.jpg',
        title: 'New Summer Collection',
        subtitle: 'Discover the latest trends in unstitched fabrics.',
        buttonText: 'Shop Now',
        link: '/products',
      },
      {
        imageUrl: '/images/hero/hero-2.jpg',
        title: 'Exquisite Lawn Prints',
        subtitle: 'Perfect for every occasion, crafted with elegance.',
        buttonText: 'Explore Designs',
        link: '/products?category=lawn',
      },
      {
        imageUrl: '/images/hero/hero-3.jpg',
        title: 'Festive Season Specials',
        subtitle: 'Get ready for the celebrations with our exclusive festive range.',
        buttonText: 'View Collection',
        link: '/products?category=festive',
      },
    ],
    heroTitle: 'Premium Unstitched Fabrics',
    heroSubtitle: 'Elevate your wardrobe with quality and style.',
    featuredCategories: ['1', '2', '3'], // Default category IDs
    featuredBrands: ['1', '2', '3', '4', '6'], // Default brand IDs
  });

  return (
    <HomepageContext.Provider value={{ settings, setSettings }}>
      {children}
    </HomepageContext.Provider>
  );
};

// 5. Create the custom hook for easy consumption
export const useHomepage = () => {
  const context = useContext(HomepageContext);
  if (context === undefined) {
    throw new Error('useHomepage must be used within a HomepageProvider');
  }
  return context;
};
