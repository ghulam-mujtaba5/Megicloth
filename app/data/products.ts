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
    name: 'Classic White Shirt',
    description: 'A timeless white shirt for all occasions.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Men',
    stock: 20,
    sku: 'MGS-001',
    salePrice: 2000,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Embroidered Kurti',
    description: 'Beautifully embroidered kurti for women.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
    category: 'Women',
    stock: 15,
    sku: 'MGS-002',
    salePrice: 3200,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Kids Denim Jeans',
    description: 'Comfortable and stylish jeans for kids.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Kids',
    stock: 30,
    sku: 'MGS-003',
    rating: 4.2,
  },
];
