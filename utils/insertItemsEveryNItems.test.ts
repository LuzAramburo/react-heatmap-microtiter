import { describe, it, expect } from 'vitest';
import insertItemsEveryNItems from './insertItemsEveryNItems';

type ArrayType = string | number | {[keys: string]: string}

describe('insertItemsFromListEveryNItems', () => {
  it('inserts items every N items and starts with the first item at the beginning', () => {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const itemsToInsert = ['a', 'b', 'c', 'd', 'e'];
    const N = 3;

    const result = insertItemsEveryNItems<ArrayType>(originalArray, itemsToInsert, N);

    // Expected output
    const expectedArray = ['a', 1, 2, 3, 'b', 4, 5, 6, 'c', 7, 8, 9, 'd', 10];

    // Check if the result matches the expected array
    expect(result).toEqual(expectedArray);
  });

  // Additional test cases for other scenarios
  it('handles empty originalArray correctly', () => {
    const originalArray: number[] = [];
    const itemsToInsert = ['a', 'b', 'c', 'd', 'e'];
    const N = 3;

    const result = insertItemsEveryNItems<ArrayType>(originalArray, itemsToInsert, N);

    // Expected output
    const expectedArray = ['a'];

    // Check if the result matches the expected array
    expect(result).toEqual(expectedArray);
  });

  it('handles empty itemsToInsert correctly', () => {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const itemsToInsert: string[] = [];
    const N = 3;

    const result = insertItemsEveryNItems<ArrayType>(originalArray, itemsToInsert, N);

    // Expected output (original array should be unchanged)
    const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Check if the result matches the expected array
    expect(result).toEqual(expectedArray);
  });

});
