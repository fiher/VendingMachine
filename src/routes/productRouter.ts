import express from "express";
import {
  addProductHandler,
  addProductQuantityHandler,
  getProductHandler,
  getProductsHandler,
  deleteProductHandler,
  resetInventoryHandler,
  subtractProductQuantityHandler,
} from "../handlers/productHandler";

export const productRouter = express.Router();

productRouter.get("/", getProductsHandler);
productRouter.get("/:code", getProductHandler);
productRouter.post("/addQuantity", addProductQuantityHandler);
productRouter.post("/subtractQuantity", subtractProductQuantityHandler);
productRouter.post("/addProduct", addProductHandler);
productRouter.post("/resetInventory", resetInventoryHandler);
productRouter.delete("/:code", deleteProductHandler);
