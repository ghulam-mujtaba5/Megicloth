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

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string; // Changed from comment to text
  createdAt: string;
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
