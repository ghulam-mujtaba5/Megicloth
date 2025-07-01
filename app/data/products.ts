export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sku: string;
  salePrice?: number;
  rating?: number;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Unstitched Men’s Lawn Suit',
    description: 'Premium quality unstitched lawn fabric for men. 3.5 meters.',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
    category: 'Men',
    stock: 25,
    sku: 'MGS-101',
    salePrice: 2000,
    rating: 4.7,
  },
  {
    id: '2',
    name: 'Unstitched Women’s Lawn Suit',
    description: 'Beautiful unstitched lawn fabric for women. 3-piece set.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    category: 'Women',
    stock: 18,
    sku: 'MGS-102',
    salePrice: 2900,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Unstitched Men’s Wash & Wear',
    description: 'Soft, comfortable unstitched wash & wear fabric for men.',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Men',
    stock: 20,
    sku: 'MGS-103',
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Unstitched Women’s Embroidered Lawn',
    description: 'Elegant unstitched embroidered lawn for women. 3-piece set.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Women',
    stock: 10,
    sku: 'MGS-104',
    salePrice: 3700,
    rating: 4.8,
  },
];
