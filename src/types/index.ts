export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  unit: string;
  rating: number;
  image: string;
  description: string;
  category: Category;
  tags: string[];
  stock: number;
  isPopular?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
}

export type Category = 
  | 'fruits-veggies'
  | 'dairy'
  | 'grocery'
  | 'spices'
  | 'snacks'
  | 'personal-care'
  | 'household';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number; // percentage
  code: string;
  validUntil: string; // ISO date string
  products?: string[]; // Product IDs
  categories?: Category[];
  minOrder?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string; // ISO date string
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}