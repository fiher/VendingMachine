import Change from "../models/Change";
import { Request, Response } from "express";
import {
  emptyInsertedChange,
  getInsertedChange,
  insertChange,
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

export const insertChangeHandler = async (req: Request, res: Response) => {
  try {
    const updatedMoney: Money = await insertChange(req.body as Change);

    updatedMoney
      ? res.status(200).send(updatedMoney)
      : res.status(304).send(`Failed to update amount.`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getInsertedChangeHandler = async (req: Request, res: Response) => {
  try {
    const insertedChange: Change = await getInsertedChange();
    if (!insertedChange) {
      res.status(400).send("Couldn't get inserted change");
      return;
    }
    const insertedTotal = sumChange(insertedChange);

    res.status(200).send({ insertedChange, insertedTotal });
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
          .send({newMoney})
      : res.status(400).send("Couldn't get inserted change");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const emptyInsertedChangeHandler = async (req: Request, res: Response) => {
  try {
    const insertedChange: Change = await emptyInsertedChange();
    if (!insertedChange) {
      res.status(400).send("Couldn't empty change");
      return;
    }
    const insertedTotal = sumChange(insertedChange);

    res.status(200).send({
          message: `Successfully withdrawn ${insertedTotal}`,
          change: insertedChange
        });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
