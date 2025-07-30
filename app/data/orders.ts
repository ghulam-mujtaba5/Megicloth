import type { OrderItem } from '@/app/types';

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
        id: 'OI-001',
        quantity: 1,
        price: 2000,
        product: {
          id: '1',
          name: 'Azure Bloom Lawn Suit',
          description: 'Premium quality unstitched lawn fabric for men. 3.5 meters.',
          price: 2200,
          images: [
            'https://picsum.photos/seed/orderA/800/600',
            'https://picsum.photos/seed/orderB/800/600',
          ],
          category: 'Summer Collection',
          stock: 25,
          slug: 'azure-bloom-lawn-suit',
          createdAt: '2024-07-20T10:00:00Z',
          brand: 'MegiCloth',
        },
      },
      {
        id: 'OI-002',
        quantity: 1,
        price: 2900,
        product: {
          id: '2',
          name: 'Crimson Garden Lawn Suit',
          description: 'Beautiful unstitched lawn fabric for women. 3-piece set.',
          price: 3200,
          images: [
            'https://picsum.photos/seed/orderE/800/600',
            'https://picsum.photos/seed/orderB/800/600',
          ],
          category: 'Luxury Lawn',
          stock: 18,
          slug: 'crimson-garden-lawn-suit',
          createdAt: '2024-07-22T11:30:00Z',
          brand: 'MegiCloth',
        },
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
        id: 'OI-003',
        quantity: 1,
        price: 2600,
        product: {
          id: '3',
          name: 'Obsidian Weave Wash & Wear',
          description: 'Soft, comfortable unstitched wash & wear fabric for men.',
          price: 2600,
          images: ['https://picsum.photos/seed/orderF/800/600'],
          category: 'Formal Fabric',
          stock: 20,
          slug: 'obsidian-weave-wash-and-wear',
          createdAt: '2024-07-18T09:00:00Z',
          brand: 'MegiCloth',
        },
      },
    ],
  },
];
