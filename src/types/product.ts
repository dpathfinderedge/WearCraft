export type ProductCategory = 'mens' | 'womens' | 'unisex' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  images: string[];
  sizes: string[];
  colors: string[];
  material?: string;
  care?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  search?: string;
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';