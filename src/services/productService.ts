import { DeleteResult, InsertOneResult, ObjectId } from "mongodb";
import { collections } from "../database/database";
import Product from "../models/Product";

export enum ModifyProductQuantityMode {
  ADD,
  SUBTRACT,
}

export const getProducts = async (): Promise<Product[]> =>
  (await collections.products.find().toArray()) as Product[];

export const getProductByCode = async (code: string): Promise<Product> =>
  (await collections.products.findOne({code})) as Product;

export const deleteProduct = async (code: string): Promise<DeleteResult> =>
  await collections.products.deleteOne({code});

export const addProduct = async (
  product: Product
): Promise<InsertOneResult> => {
  const matchingProductCode = (await collections.products.findOne({
    code: product.code,
  })) as Product;

  if (matchingProductCode) {
    throw new Error("Product with same code already exists");
  }
  return await collections.products.insertOne(product);
};

export const modifyProductQuantity = async (
  productId: string,
  quantity: number,
  mode: ModifyProductQuantityMode
): Promise<Product> => {
  const product = (await collections.products.findOne({
    _id: new ObjectId(productId),
  })) as Product;
  let newQuantity =
    mode === ModifyProductQuantityMode.ADD
      ? product.quantity + quantity
      : product.quantity - quantity;
  if (newQuantity < 0) newQuantity = 0;

  const result = await collections.products.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { quantity: newQuantity } }
  );

  if (result) {
    return { ...product, quantity: newQuantity };
  } else {
    throw new Error("Couldn't update product quantity");
  }
};

export const resetInventory = async (
  products: Product[]
): Promise<Product[]> => {
  const deleteResult = await collections.products.deleteMany({});
  if (!deleteResult) {
    throw new Error("Failed to reset inventory");
  }
  const insertResult = await collections.products.insertMany(products);

  if (!insertResult) {
    throw new Error("Failed to insert new inventory");
  }

  return await getProducts();
};
