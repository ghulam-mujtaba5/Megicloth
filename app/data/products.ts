export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
  stock: number;
  rating?: number;
  reviews?: Review[];
  reviewsCount?: number;
  createdAt: string;
  sku?: string;
  fabric?: string;
  collection?: string;
  stitchingAvailable?: boolean;
  stitchingCost?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Azure Bloom Lawn Suit',
    description: 'Premium quality unstitched lawn fabric for men. 3.5 meters.',
    price: 2200,
    images: [
        'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516762689621-3e4822615d2a?auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1578939658264-3c3b7a5a8a6d?auto=format&fit=crop&w=800&q=60',
    ], 
    collection: 'Men’s Unstitched',
    category: 'Summer Collection',
    stock: 25,
    sku: 'MGS-101',
    createdAt: '2024-07-20T10:00:00Z',
    salePrice: 2000,
    rating: 4.7,
    reviews: [],
    stitchingAvailable: true,
    stitchingCost: 800,
    fabric: 'Lawn',
  },
  {
    id: '2',
    name: 'Crimson Garden Lawn Suit',
    description: 'Beautiful unstitched lawn fabric for women. 3-piece set.',
    price: 3200,
    images: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516762689621-3e4822615d2a?auto=format&fit=crop&w=800&q=60',
    ],
    collection: 'Women’s Unstitched',
    category: 'Luxury Lawn',
    stock: 18,
    sku: 'MGS-102',
    createdAt: '2024-07-22T11:30:00Z',
    salePrice: 2900,
    rating: 4.9,
    reviews: [],
    stitchingAvailable: true,
    stitchingCost: 1200,
    fabric: 'Lawn',
  },
  {
    id: '3',
    name: 'Obsidian Weave Wash & Wear',
    description: 'Soft, comfortable unstitched wash & wear fabric for men.',
    price: 2600,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
    collection: 'Men’s Unstitched',
    category: 'Formal Fabric',
    stock: 20,
    sku: 'MGS-103',
    createdAt: '2024-07-18T09:00:00Z',
    rating: 4.6,
    reviews: [],
    stitchingAvailable: true,
    stitchingCost: 800,
    fabric: 'Wash & Wear',
  },
  {
    id: '4',
    name: 'Emerald Bloom Embroidered Lawn',
    description: 'Elegant unstitched embroidered lawn for women. 3-piece set.',
    price: 4000,
    images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'],
    collection: 'Women’s Unstitched',
    category: 'Embroidered / Plain',
    stock: 10,
    sku: 'MGS-104',
    createdAt: '2024-07-25T14:00:00Z',
    salePrice: 3700,
    rating: 4.8,
    reviews: [],
    stitchingAvailable: true,
    stitchingCost: 1500,
    fabric: 'Embroidered Lawn',
  },
];
