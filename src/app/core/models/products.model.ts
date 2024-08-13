export interface Products {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
}
