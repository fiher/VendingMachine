import { describe, expect, test } from "@jest/globals";
import { calculateChange } from "../../services/vendingService";
import Change from "../../models/Change";

describe("Test Calculate Change functionality", () => {
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

  test("Get simple change", () => {
    const result = calculateChange(200, exampleChange);
    expect(result.onePenny).toBe(0);
    expect(result.twoPennies).toBe(0);
    expect(result.fivePennies).toBe(0);
    expect(result.tenPennies).toBe(0);
    expect(result.twentyPennies).toBe(0);
    expect(result.fiftyPennies).toBe(0);
    expect(result.onePound).toBe(0);
    expect(result.twoPounds).toBe(1);
  });

  test("Get complex change", () => {
    const result = calculateChange(1369, exampleChange);
    expect(result.onePenny).toBe(0);
    expect(result.twoPennies).toBe(2);
    expect(result.fivePennies).toBe(1);
    expect(result.tenPennies).toBe(11);
    expect(result.twentyPennies).toBe(10);
    expect(result.fiftyPennies).toBe(15);
    expect(result.onePound).toBe(1);
    expect(result.twoPounds).toBe(1);
  });
});
