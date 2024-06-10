import axios from "axios";
import { Product } from "../Types/Product";
import { z } from "zod";

interface AddToShoppingCart {
  product: Product;
  item: Product;
}

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const getShoppingCartSchema = z.array(productSchema);

const addToShoppingCartSchema = z.object({
  product: productSchema,
  item: productSchema,
});

export const addToShoppingCart = async (
  productId: string
): Promise<AddToShoppingCart> => {
  const { data } = await axios.post("/api/add-to-cart", {
    productId: productId,
  });

  return addToShoppingCartSchema.parse(data);
};

export const getShoppingCart = async (): Promise<Product[]> => {
  const { data } = await axios.get("/api/cart");

  return getShoppingCartSchema.parse(data);
};

export const checkout = async (): Promise<void> => {
  await axios.post("/api/checkout");
};

export default {
  getShoppingCart,
  addToShoppingCart,
  checkout,
};
