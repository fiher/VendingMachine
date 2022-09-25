import {
  getProductByCode,
  modifyProductQuantity,
  ModifyProductQuantityMode,
} from "./productService";
import { collections } from "../database/database";
import Money from "../models/Money";
import {
  arrayToChange,
  changeToArray,
  decreaseChange,
  getMultiplier,
  increaseChange,
} from "./changeService";
import Change from "../models/Change";
import { resetChange } from "./moneyService";

export const calculateChange = (
  changeToReturn: number,
  availableChange: Change
): Change => {
  const availableDenominations = changeToArray(availableChange);
  const change = new Array(availableDenominations.length).fill(0); // return variable
  // value of each index in denominations array
  const multiplier = getMultiplier();

  let leftChange = changeToReturn;
  // Start from higher denominations as lowest ones are more valuable to us.
  // We can always substitute higher for lower, but not the other way around
  for (let i = availableDenominations.length - 1; i >= 0; i--) {
    if (!availableDenominations[i]) {
      continue;
    }
    const value = multiplier[i];
    if (value > leftChange) {
      continue;
    } else if (leftChange - value < 0) {
      continue;
    }

    leftChange -= value;
    availableDenominations[i]--;
    change[i]++;
    if (leftChange === 0) {
      break;
    }

    if (availableDenominations[i] > 0) {
      i++;
    }
  }

  if (leftChange > 0) {
    throw new Error("Cant give back exact change");
  }

  return arrayToChange(change);
};

export const buyProduct = async (productCode: string): Promise<Change> => {
  const product = await getProductByCode(productCode);
  const money = (await collections.money.findOne()) as Money;

  if (product.quantity < 1) {
    throw new Error("Product is out of stock");
  }
  const changeToReturn = money.insertedTotal - product.price;
  if (changeToReturn < 0) {
    throw new Error(
      `Not enough money. You need extra ${changeToReturn.toFixed(2)}.`
    );
  }
  // To calculate return we take all available currency first
  const availableChange = increaseChange(money.change, money.insertedChange);
  const returnChange = calculateChange(changeToReturn, availableChange);
  if (!returnChange) {
    throw new Error("Cannot give back change");
  }
  const changeLeft = decreaseChange(availableChange, returnChange);
  //TODO: Usually there should be some logic to ensure db consistency.
  await resetChange(changeLeft);
  await modifyProductQuantity(
    productCode,
    1,
    ModifyProductQuantityMode.SUBTRACT
  );

  return returnChange;
};
