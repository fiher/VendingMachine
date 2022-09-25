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
  const totalChange = sumChange(currentChange);
  const updatedMoney: Money = {
    ...money,
    change: currentChange,
    totalChange,
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

export const addBuyingChange = async (change: Change) => {
  const money = (await collections.money.findOne()) as Money;
  const buyingChange = increaseChange(change, money.buyingChange);
  const buyingTotalChange = sumChange(buyingChange);
  const updatedMoney: Money = {
    ...money,
    buyingChange,
    buyingTotalChange,
  };

  const result = await collections.money.updateOne(
    { _id: money._id },
    { $set: updatedMoney }
  );

  if (result) {
    return updatedMoney;
  } else {
    throw new Error("Couldn't update buying change");
  }
};

export const getBuyingChange = async () => {
  const money = (await collections.money.findOne()) as Money;

  return money.buyingChange;
};

export const resetChange = async (change: Change) => {
  const money = (await collections.money.findOne()) as Money;

  const totalChange = sumChange(change);
  const newMoney = {
    change,
    totalChange,
    buyingChange: getEmptyChange(),
    buyingTotalChange: 0,
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

export const emptyBuyingChange = async () => {
  const money = (await collections.money.findOne()) as Money;
  const buyingChange = money.buyingChange;
  const newMoney = {
    ...money,
    buyingChange: getEmptyChange(),
    buyingTotalChange: 0,
  };

  const result = await collections.money.updateOne(
    { _id: money._id },
    { $set: newMoney }
  );

  if (result) {
    return buyingChange; // change to be returned to caller
  } else {
    throw new Error("Couldn't reset change");
  }
};
