import express from "express";
import {
  addChangeHandler,
  emptyInsertedChangeHandler,
  getInsertedChangeHandler,
  insertChangeHandler,
  removeChangeHandler,
  resetChangeHandler,
} from "../handlers/moneyHandler";

export const moneyRouter = express.Router();

moneyRouter.use(express.json());

moneyRouter.get("/insertedChange", getInsertedChangeHandler);
moneyRouter.post("/addChange", addChangeHandler);
moneyRouter.post("/removeChange", removeChangeHandler);
moneyRouter.post("/insertChange", insertChangeHandler);
moneyRouter.post("/resetChange", resetChangeHandler);
moneyRouter.post("/emptyInsertedChange", emptyInsertedChangeHandler);
