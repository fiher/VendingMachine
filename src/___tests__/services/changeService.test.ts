import { describe, expect, test } from "@jest/globals";
import Change from "../../models/Change";
import {
  arrayToChange,
  changeToArray,
  decreaseChange,
  increaseChange,
  sumChange,
} from "../../services/changeService";

describe("Test change utility functions", () => {
  const exampleChange = {
    onePenny: 5,
    twoPennies: 5,
    fivePennies: 20,
    tenPennies: 25,
    twentyPennies: 10,
    fiftyPennies: 15,
    onePound: 1,
    twoPounds: 1,
  } as Change;

  const subtractChange = {
    onePenny: 2,
    twoPennies: 3,
    fivePennies: 0,
    tenPennies: 5,
    twentyPennies: 2,
    fiftyPennies: 0,
    onePound: 1,
    twoPounds: 1,
  } as Change;

  test("Test increase change", () => {
    const result = increaseChange(exampleChange, exampleChange);
    expect(result.onePenny).toBe(exampleChange.onePenny * 2);
    expect(result.twoPennies).toBe(exampleChange.twoPennies * 2);
    expect(result.fivePennies).toBe(exampleChange.fivePennies * 2);
    expect(result.tenPennies).toBe(exampleChange.tenPennies * 2);
    expect(result.twentyPennies).toBe(exampleChange.twentyPennies * 2);
    expect(result.fiftyPennies).toBe(exampleChange.fiftyPennies * 2);
    expect(result.onePound).toBe(exampleChange.onePound * 2);
    expect(result.twoPounds).toBe(exampleChange.twoPounds * 2);
  });

  test("Test decrease change", () => {
    const result = decreaseChange(exampleChange, subtractChange);
    expect(result.onePenny).toBe(
      exampleChange.onePenny - subtractChange.onePenny
    );
    expect(result.twoPennies).toBe(
      exampleChange.twoPennies - subtractChange.twoPennies
    );
    expect(result.fivePennies).toBe(
      exampleChange.fivePennies - subtractChange.fivePennies
    );
    expect(result.tenPennies).toBe(
      exampleChange.tenPennies - subtractChange.tenPennies
    );
    expect(result.twentyPennies).toBe(
      exampleChange.twentyPennies - subtractChange.twentyPennies
    );
    expect(result.fiftyPennies).toBe(
      exampleChange.fiftyPennies - subtractChange.fiftyPennies
    );
    expect(result.onePound).toBe(
      exampleChange.onePound - subtractChange.onePound
    );
    expect(result.twoPounds).toBe(
      exampleChange.twoPounds - subtractChange.twoPounds
    );
  });

  test("Test sum change", () => {
    const result = sumChange(exampleChange);
    expect(result).toBe(1615);
  });

  test("Test array to change", () => {
    const arrToConvert = [2, 4, 5, 8, 10, 1, 1, 0];
    const result = arrayToChange(arrToConvert);

    expect(result.onePenny).toBe(arrToConvert[0]);
    expect(result.twoPennies).toBe(arrToConvert[1]);
    expect(result.fivePennies).toBe(arrToConvert[2]);
    expect(result.tenPennies).toBe(arrToConvert[3]);
    expect(result.twentyPennies).toBe(arrToConvert[4]);
    expect(result.fiftyPennies).toBe(arrToConvert[5]);
    expect(result.onePound).toBe(arrToConvert[6]);
    expect(result.twoPounds).toBe(arrToConvert[7]);
  });

  test("Test change to array", () => {
    const result = changeToArray(exampleChange);
    expect(result.toString()).toBe([5, 5, 20, 25, 10, 15, 1, 1].toString());
  });
});
