import Change from "../models/Change";

export const increaseChange = (add: Change, current: Change): Change => ({
  onePenny: current.onePenny + add.onePenny,
  twoPennies: current.twoPennies + add.twoPennies,
  fivePennies: current.fivePennies + add.fivePennies,
  tenPennies: current.tenPennies + add.tenPennies,
  twentyPennies: current.twentyPennies + add.twentyPennies,
  fiftyPennies: current.fiftyPennies + add.fiftyPennies,
  onePound: current.onePound + add.onePound,
  twoPounds: current.twoPounds + add.twoPounds,
});

export const decreaseChange = (current: Change, remove: Change): Change => ({
  onePenny:
    current.onePenny > remove.onePenny ? current.onePenny - remove.onePenny : 0,
  twoPennies:
    current.twoPennies > remove.twoPennies
      ? current.twoPennies - remove.twoPennies
      : 0,
  fivePennies:
    current.fivePennies > remove.fivePennies
      ? current.fivePennies - remove.fivePennies
      : 0,
  tenPennies:
    current.tenPennies > remove.tenPennies
      ? current.tenPennies - remove.tenPennies
      : 0,
  twentyPennies:
    current.twentyPennies > remove.twentyPennies
      ? current.twentyPennies - remove.twentyPennies
      : 0,
  fiftyPennies:
    current.fiftyPennies > remove.fiftyPennies
      ? current.fiftyPennies - remove.fiftyPennies
      : 0,
  onePound:
    current.onePound > remove.onePound ? current.onePound - remove.onePound : 0,
  twoPounds:
    current.twoPounds > remove.twoPounds
      ? current.twoPounds - remove.twoPounds
      : 0,
});

export const sumChange = ({
  onePenny,
  twoPennies,
  fivePennies,
  tenPennies,
  twentyPennies,
  fiftyPennies,
  onePound,
  twoPounds,
}: Change) =>
  onePenny +
  twoPennies * 2 +
  fivePennies * 5 +
  tenPennies * 10 +
  twentyPennies * 20 +
  fiftyPennies * 50 +
  onePound * 100 +
  twoPounds * 200;

export const getEmptyChange = () => ({
  onePenny: 0,
  twoPennies: 0,
  fivePennies: 0,
  tenPennies: 0,
  twentyPennies: 0,
  fiftyPennies: 0,
  onePound: 0,
  twoPounds: 0,
});

export const arrayToChange = (denominations: Array<number>): Change => ({
  onePenny: denominations[0] ?? 0,
  twoPennies: denominations[1] ?? 0,
  fivePennies: denominations[2] ?? 0,
  tenPennies: denominations[3] ?? 0,
  twentyPennies: denominations[4] ?? 0,
  fiftyPennies: denominations[5] ?? 0,
  onePound: denominations[6] ?? 0,
  twoPounds: denominations[7] ?? 0,
});

export const changeToArray = (change: Change): Array<number> => [
  change.onePenny,
  change.twoPennies,
  change.fivePennies,
  change.tenPennies,
  change.twentyPennies,
  change.fiftyPennies,
  change.onePound,
  change.twoPounds,
];

export const getMultiplier = (): Array<number> => [
  1, 2, 5, 10, 20, 50, 100, 200,
];
