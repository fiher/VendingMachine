import express from "express";
import { buyProductHandler } from "../handlers/vendingHandler";

export const vendingRouter = express.Router();

vendingRouter.post("/buy", buyProductHandler);
