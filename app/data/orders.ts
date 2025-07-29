import type { Product } from '@/app/types';

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-07-15',
    status: 'Delivered',
    total: 4900,
    items: [
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
        category: 'Summer Collection',
        stock: 25,
        sku: 'MGS-101',
        createdAt: '2024-07-20T10:00:00Z',
        salePrice: 2000,
        rating: 4.7,
        quantity: 1,
        brand: 'MegiCloth',
        reviewsCount: 0,
        isNew: true,
        onSale: true,
        hasVariants: false,
        tags: ['lawn', 'mens-fashion', 'summer', 'unstitched'],
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
        category: 'Luxury Lawn',
        stock: 18,
        sku: 'MGS-102',
        createdAt: '2024-07-22T11:30:00Z',
        salePrice: 2900,
        rating: 4.9,
        quantity: 1,
        brand: 'MegiCloth',
        reviewsCount: 0,
        isNew: true,
        onSale: true,
        hasVariants: false,
        tags: ['lawn', 'womens-fashion', 'luxury', 'unstitched', '3-piece'],
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-07-22',
    status: 'Processing',
    total: 2600,
    items: [
      {
        id: '3',
        name: 'Obsidian Weave Wash & Wear',
        description: 'Soft, comfortable unstitched wash & wear fabric for men.',
        price: 2600,
        images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
        category: 'Formal Fabric',
        stock: 20,
        sku: 'MGS-103',
        createdAt: '2024-07-18T09:00:00Z',
        rating: 4.6,
        quantity: 1,
        brand: 'MegiCloth',
        reviewsCount: 0,
        isNew: false,
        onSale: false,
        hasVariants: false,
        tags: ['wash-and-wear', 'mens-fashion', 'formal', 'unstitched'],
      },
    ],
  },
];
