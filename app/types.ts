export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating?: number | null;
  isPublished?: boolean;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  stock: number;
  images: string[];
  reviews?: Review[];
  isPublished?: boolean;
  brand: string; // made required for type safety
  sku?: string;
  tags?: string[];
  isNew?: boolean;
  onSale?: boolean;
  hasVariants?: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt?: string;
  stitchingCost?: number;
  stitchingAvailable?: boolean;
  fabric?: string;
  color?: string;
  collection?: string;
  quantity?: number; // For cart context
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags?: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
  addresses?: Address[];
  wishlist?: string[];
  createdAt?: string;
  updatedAt?: string;
  [key:string]: any; // For any other profile fields
}

export interface OrderItem extends Product {
  quantity: number;
}



export type CartItem = Product & {
  quantity: number;
};

export interface Address {
  id: string;
  type: 'home' | 'work';
  userId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  [key: string]: any;
}

export interface Review {
  id: string;
  productId?: string;
  userId?: string;
  author?: string;
  rating: number;
  content?: string;
  text?: string; // Alias for content, to be consolidated
  isApproved?: boolean;
  createdAt?: string;
  product?: Partial<Product>; // For nested product data
  user?: Partial<User>; // For nested user data
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  users?: Partial<User>;
  shippingName?: string; // maps to shipping_name in DB
  shippingEmail?: string; // maps to shipping_email in DB
  shippingAddress?: any;
  items?: CartItem[];
}

export interface StyleGuide {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  description?: string;
  isPublished?: boolean;
  startDate?: string;
  endDate?: string;
  heroImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}
