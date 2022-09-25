import express from "express";
import {
  addBuyingChangeHandler,
  addChangeHandler,
  emptyBuyingChangeHandler,
  getBuyingChangeHandler,
  removeChangeHandler,
  resetChangeHandler,
} from "../handlers/moneyHandler";

export const moneyRouter = express.Router();

moneyRouter.use(express.json());

moneyRouter.get("/buyingChange", getBuyingChangeHandler);
moneyRouter.post("/addChange", addChangeHandler);
moneyRouter.post("/removeChange", removeChangeHandler);
moneyRouter.post("/addBuyingChange", addBuyingChangeHandler);
moneyRouter.post("/resetChange", resetChangeHandler);
moneyRouter.post("/emptyBuyingChange", emptyBuyingChangeHandler);
