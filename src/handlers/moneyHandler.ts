import Change from "../models/Change";
import { Request, Response } from "express";
import {
  addBuyingChange,
  emptyBuyingChange,
  getBuyingChange,
  modifyChange,
  MoneyChangeMode,
  resetChange,
} from "../services/moneyService";
import Money from "../models/Money";
import {sumChange} from "../services/changeService";

export const addChangeHandler = async (req: Request, res: Response) => {
  try {
    const updatedMoney: Money = await modifyChange(req.body as Change, MoneyChangeMode.ADD);

    updatedMoney
      ? res.status(200).send(updatedMoney)
      : res.status(304).send(`Failed to update amount.`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const removeChangeHandler = async (req: Request, res: Response) => {
  try {
    const updatedMoney: Money = await modifyChange(
      req.body as Change,
      MoneyChangeMode.SUBTRACT
    );

    updatedMoney
      ? res.status(200).send(updatedMoney)
      : res.status(304).send(`Failed to update amount.`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const addBuyingChangeHandler = async (req: Request, res: Response) => {
  try {
    const updatedMoney: Money = await addBuyingChange(req.body as Change);

    updatedMoney
      ? res.status(200).send(updatedMoney)
      : res.status(304).send(`Failed to update amount.`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getBuyingChangeHandler = async (req: Request, res: Response) => {
  try {
    const buyingChange: Change = await getBuyingChange();

    buyingChange
      ? res.status(200).send({ buyingChange })
      : res.status(400).send("Couldn't get buying change");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const resetChangeHandler = async (req: Request, res: Response) => {
  try {
    const newChange = req.body as Change;
    const newMoney = await resetChange(newChange);

    newMoney
      ? res
          .status(200)
          .send({ change: newMoney.change, totalChange: newMoney.totalChange })
      : res.status(400).send("Couldn't get buying change");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const emptyBuyingChangeHandler = async (req: Request, res: Response) => {
  try {
    const buyingChange: Change = await emptyBuyingChange();
    const totalBuyingChange = sumChange(buyingChange);

    buyingChange
      ? res.status(200).send({
          message: `Successfully withdrawn ${totalBuyingChange}`,
          change: buyingChange
        })
      : res.status(400).send("Couldn't empty change");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
