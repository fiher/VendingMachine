import { Express } from "express";
import { moneyRouter } from "./moneyRouter";
import { productRouter } from "./productRouter";
import { vendingRouter } from "./vendingRouter";

export const router = (app: Express) => {
  app.use("/money", moneyRouter);
  app.use("/products", productRouter);
  app.use("/vending", vendingRouter);
};
