export interface Product {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewProduct
  extends Omit<Product, "_id" | "createdAt" | "updatedAt"> {}
