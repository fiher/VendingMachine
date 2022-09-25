import { Request, Response } from "express";
import {
  addProduct,
  deleteProduct,
  getProductByCode,
  getProducts,
  modifyProductQuantity,
  ModifyProductQuantityMode,
  resetInventory,
} from "../services/productService";
import Product from "../models/Product";
import {DeleteResult, InsertOneResult} from "mongodb";

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getProductHandler = async (req: Request, res: Response) => {
  try {
    const code = req?.params?.code;
    const product = await getProductByCode(code);

    product
      ? res.status(200).send(product)
      : res.status(404).send("No such product exists");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const addProductQuantityHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const code = req.body.code;
    const quantity = parseInt(req.body.quantity);
    const updatedProduct: Product = await modifyProductQuantity(
      code,
      quantity,
      ModifyProductQuantityMode.ADD
    );

    updatedProduct
      ? res.status(201).send(updatedProduct)
      : res.status(500).send("Failed to update quantity");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const subtractProductQuantityHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const code = req.body.code;
    const quantity = parseInt(req.body.quantity);
    const updatedProduct: Product = await modifyProductQuantity(
      code,
      quantity,
      ModifyProductQuantityMode.SUBTRACT
    );

    updatedProduct
      ? res.status(201).send(updatedProduct)
      : res.status(500).send("Failed to update quantity");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const addProductHandler = async (req: Request, res: Response) => {
  try {
    const product = req.body as Product;
    const result: InsertOneResult = await addProduct(product);

    result
      ? res
          .status(201)
          .send({...product, _id: result.insertedId})
      : res.status(500).send("Failed to add new product");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const code = req?.params?.code;
    const result: DeleteResult = await deleteProduct(code);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed product with code ${code}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove product with code ${code}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Product with code ${code} does not exist`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const resetInventoryHandler = async (req: Request, res: Response) => {
  try {
    const newProducts = req.body as Product[];
    const newInventory: Product[] = await resetInventory(newProducts);

    if (newInventory) {
      res.status(200).send(newInventory);
    } else {
      res.status(400).send("Failed to reset inventory");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
