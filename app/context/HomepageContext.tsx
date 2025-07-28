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
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80',
        title: 'New Summer Collection',
        subtitle: 'Discover the latest trends in unstitched fabrics.',
        buttonText: 'Shop Now',
        link: '/products',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80',
        title: 'Exquisite Lawn Prints',
        subtitle: 'Perfect for every occasion, crafted with elegance.',
        buttonText: 'Explore Designs',
        link: '/products?category=lawn',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80',
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
