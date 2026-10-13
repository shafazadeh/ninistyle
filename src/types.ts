import { Product } from './data/products';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface TryOnSession {
  id: string;
  childImage: string;
  clothingImage: string;
  clothingTitle: string;
  product: Product;
  resultImage: string;
  createdAt: string;
}
