import { describe, it, expect } from 'vitest';
import getColorHeatmap, { findIndexWhereNumberFits, splitNumberIntoRanges } from './getColorHeatmap.ts';

describe('splitNumberIntoRanges', () => {
  it('should split bigNumber into 5 equal ranges when bigNumber is 100, Without overlaping', () => {
    const bigNumber = 100;
    const numRanges = 5;

    const result = splitNumberIntoRanges(bigNumber, numRanges);

    const expectedRanges = [[0, 19], [20, 39], [40, 59], [60, 79], [80, 100]];

    expect(result).toEqual(expectedRanges);
  });

});

describe('findIndexWhereNumberFits', () => {
  it('should return the index of the range where numberValue fits', () => {
    const numberValue = 15;
    const arrayOfArrays = [
      [0, 10],
      [11, 20],
      [21, 30],
    ];

    const result = findIndexWhereNumberFits(numberValue, arrayOfArrays);

    // Since 15 fits in the range [11, 20], it should return index 1
    expect(result).toEqual(1);
  });

  it('should return -1 when numberValue does not fit in any range', () => {
    const numberValue = 50;
    const arrayOfArrays = [
      [0, 10],
      [11, 20],
      [21, 30],
    ];

    const result = findIndexWhereNumberFits(numberValue, arrayOfArrays);

    expect(result).toEqual(-1);
  });

  it('should throw an error when a range does not have exactly two elements', () => {
    const numberValue = 15;
    const arrayOfArrays = [
      [0, 10],
      [11], // This range only has one element
      [21, 30],
    ];

    expect(() => findIndexWhereNumberFits(numberValue, arrayOfArrays)).toThrowError(
      'Each array must contain 2 elements for the start and end of a range. Error at index 1',
    );
  });
});

describe('getColorHeatmap', () => {
  it('should return the correct color for a given numberValue', () => {
    const highestValue = 100;
    const numberValue = 75;

    const expectedColor = '#f68838'; // Based on the default colors

    const result = getColorHeatmap(highestValue, numberValue);

    expect(result).toEqual(expectedColor);
  });
});
