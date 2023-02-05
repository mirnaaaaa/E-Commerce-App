export type ProductType = {
    id: number;
    title: string;
    images: string[];
    price: number;
    brand: string;
    description: string;
    category: string;
    discountPercentage: number;
    thumbnail: string | number;
    stock: number;
    rating: number;
    quantity: number;
  }