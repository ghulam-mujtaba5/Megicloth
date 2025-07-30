import { z } from 'zod';

// Base Schemas (non-recursive parts)
const AddressSchemaBase = z.object({
  id: z.string(),
  type: z.enum(['home', 'work']),
  userId: z.string().optional(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  isDefault: z.boolean().optional(),
}).catchall(z.any());

const UserSchemaBase = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  role: z.enum(['admin', 'user']).optional(),
  wishlist: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
}).catchall(z.any());

const ProductSchemaBase = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    salePrice: z.number().optional(),
    category: z.string(),
    stock: z.number(),
    images: z.array(z.string().url()),
    isPublished: z.boolean().optional(),
    brand: z.string(), // made required for type safety
    sku: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isNew: z.boolean().optional(),
    onSale: z.boolean().optional(),
    hasVariants: z.boolean().optional(),
    rating: z.number().optional(),
    reviewsCount: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    stitchingCost: z.number().optional(),
    stitchingAvailable: z.boolean().optional(),
    fabric: z.string().optional(),
    color: z.string().optional(),
    collection: z.string().optional(),
    quantity: z.number().optional(),
});

const ReviewSchemaBase = z.object({
    id: z.string(),
    productId: z.string().optional(),
    userId: z.string().optional(),
    author: z.string().optional(),
    rating: z.number().min(1).max(5),
    content: z.string().optional(),
    text: z.string().optional(),
    isApproved: z.boolean().optional(),
    createdAt: z.string().optional(),
});

// Recursive Type Definitions
type User = z.infer<typeof UserSchemaBase> & {
  addresses?: Address[];
};

type Address = z.infer<typeof AddressSchemaBase> & {
  user?: User;
};

type Product = z.infer<typeof ProductSchemaBase> & {
  reviews?: Review[];
};

type Review = z.infer<typeof ReviewSchemaBase> & {
  product?: Product;
  user?: User;
};

// Final Schemas (with recursive parts)
export const UserSchema: z.ZodType<User> = UserSchemaBase.extend({
    addresses: z.lazy(() => z.array(z.lazy(() => AddressSchema))).optional(),
});

export const AddressSchema: z.ZodType<Address> = AddressSchemaBase.extend({
    user: z.lazy(() => UserSchema).optional(),
});

export const ProductSchema: z.ZodType<Product> = ProductSchemaBase.extend({
    reviews: z.lazy(() => z.array(z.lazy(() => ReviewSchema))).optional(),
});

export const ReviewSchema: z.ZodType<Review> = ReviewSchemaBase.extend({
    product: z.lazy(() => ProductSchema).optional(),
    user: z.lazy(() => UserSchema).optional(),
});


export const registerFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('A valid email is required'),
    phone: z.string().optional(),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

