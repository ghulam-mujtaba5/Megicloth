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
    image: '/file.svg',
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
    image: '/globe.svg',
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
    image: '/window.svg',
    category: 'Kids',
    stock: 30,
    sku: 'MGS-003',
    rating: 4.2,
  },
];
