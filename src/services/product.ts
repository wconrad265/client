import axios from "axios";
import { NewProduct, Product } from "../Types/Product";
import { z } from "zod";

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const productsArraySchema = z.array(productSchema);

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("/api/products");

  return productsArraySchema.parse(data);
};

export const addNewProduct = async (product: NewProduct): Promise<Product> => {
  const { data } = await axios.post("/api/products", product);

  return productSchema.parse(data);
};

export const editProduct = async (
  newProduct: Product,
  id: string
): Promise<Product> => {
  const { data } = await axios.put(`/api/products/${id}`, newProduct);

  return productSchema.parse(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`/api/products/${id}`);
};

export default {
  getAllProducts,
  addNewProduct,
  editProduct,
  deleteProduct,
};
