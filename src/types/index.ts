export type Role = "admin" | "manager" | "artisan" | "customer" | "vip";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  history: string;
  craftStory: string;
  image: string;
  banner: string;
  products: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  craftStory: string;
  materials: string[];
  construction: string[];
  specifications: Record<string, string>;
  reviews: Review[];
}

export interface ProductionStage {
  name: string;
  completed: boolean;
  media?: string[];
  notes?: string;
  estimated?: string;
}

export interface Commission {
  id: string;
  customerId: string;
  customerName: string;
  productName: string;
  status: "pending" | "approved" | "in-production" | "ready" | "delivered";
  stages: ProductionStage[];
  deposit: number;
  total: number;
  createdAt: string;
  estimatedCompletion: string;
  notes: string;
  customization: Record<string, string>;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: { name: string; price: number }[];
  total: number;
  status: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: "standard" | "vip" | "lead";
  lifetimeValue: number;
  lastOrder: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  tags: string[];
  content: string;
}

export interface Film {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  price: number;
  level: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar?: string;
}
