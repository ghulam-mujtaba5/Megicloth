export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isNew: boolean;
  onSale: boolean;
  hasVariants: boolean;
  variants?: any; 
  sku: string;
  tags: string[];
  stitchingCost?: number;
  fabric?: string;
  collection?: string;
  reviews?: Review[];
  quantity?: number; // for cart
  stitchingAvailable?: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  author: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work';
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  wishlist: string[];
  wishlistProducts?: Product[];
  createdAt?: string;
  lastLogin?: string;
  isEmailVerified?: boolean;
  addresses?: Address[];
  preferences?: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    pushNotifications?: boolean;
    newsletter?: boolean;
    marketing?: boolean;
  };
}

export type CartItem = Product & { quantity: number };
