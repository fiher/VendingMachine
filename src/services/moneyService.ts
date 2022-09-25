import Change from "../models/Change";
import Money from "../models/Money";
import { collections } from "../database/database";
import {
  increaseChange,
  decreaseChange,
  sumChange,
  getEmptyChange,
} from "./changeService";

export enum MoneyChangeMode {
  ADD,
  SUBTRACT,
}

export const modifyChange = async (
  change: Change,
  mode: MoneyChangeMode
): Promise<Money> => {
  const money = (await collections.money.findOne()) as Money;
  const currentChange =
    mode === MoneyChangeMode.ADD
      ? increaseChange(change, money.change)
      : decreaseChange(money.change, change);
  const total = sumChange(currentChange);
  const updatedMoney: Money = {
    ...money,
    change: currentChange,
    total,
  };
  const result = await collections.money.updateOne(
    { _id: money._id },
    { $set: updatedMoney }
  );

  if (result) {
    return updatedMoney;
  } else {
    throw new Error("Couldn't update money");
  }
};

export const insertChange = async (change: Change) => {
  const money = (await collections.money.findOne()) as Money;
  const insertedChange = increaseChange(change, money.insertedChange);
  const insertedTotal = sumChange(insertedChange);
  const updatedMoney: Money = {
    ...money,
    insertedChange,
    insertedTotal,
  } as Money;

  const result = await collections.money.updateOne(
    { _id: money._id },
    { $set: updatedMoney }
  );

  if (result) {
    return updatedMoney;
  } else {
    throw new Error("Couldn't update inserted change");
  }
};

export const getInsertedChange = async () => {
  const money = (await collections.money.findOne()) as Money;

  return money.insertedChange;
};

export const resetChange = async (change: Change) => {
  const money = (await collections.money.findOne()) as Money;

  const total = sumChange(change);
  const newMoney = {
    change,
    total,
    insertedChange: getEmptyChange(),
    insertedTotal: 0,
  } as Money;

  if (!money) {
    const result = await collections.money.insertOne(newMoney);
    if (!result) {
      throw new Error("Couldn't reset change");
    }
    newMoney._id = result.insertedId;
  } else {
    const result = await collections.money.updateOne(
        { _id: money._id },
        { $set: newMoney }
    );

    if (!result) {
      throw new Error("Couldn't reset change");
    }
  }

  return newMoney;
};

export const emptyInsertedChange = async () => {
  const money = (await collections.money.findOne()) as Money;
  const insertedChange = money.insertedChange;
  const newMoney = {
    ...money,
    insertedChange: getEmptyChange(),
    insertedTotal: 0,
  } as Money;

  const result = await collections.money.updateOne(
    { _id: money._id },
    { $set: newMoney }
  );

  if (result) {
    return insertedChange; // change to be returned to caller
  } else {
    throw new Error("Couldn't reset change");
  }
};
