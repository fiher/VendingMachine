import { Request, Response } from "express";
import { buyProduct } from "../services/vendingService";
import Change from "../models/Change";
import {getProductByCode} from "../services/productService";
import Product from "../models/Product";
import {sumChange} from "../services/changeService";

export const buyProductHandler = async (req: Request, res: Response) => {
  try {
    const code = req.body.code as string;
    const product: Product = await getProductByCode(code);
    const change: Change = await buyProduct(code);

    if(!change) {
        res.status(400).send("Couldn't buy product");
        return;
    }

    const total = sumChange(change);

    res.status(200).send({
          message: `Successfully bought ${product.name} from ${[product.code]}`,
          change,
          total
        });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }

};
