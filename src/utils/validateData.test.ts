import { describe, it, expect } from 'vitest';
import { isMissingCol } from '@/utils/validateData.ts';

describe('getMissingStringsFromArrayA', () => {
  it('should return an empty array if all strings in ArrayB are in ArrayA', () => {
    const ArrayA = ['apple', 'banana', 'cherry'];
    const ArrayB = ['cherry', 'banana', 'apple'];

    const result = isMissingCol(ArrayA, ArrayB);

    expect(result).toEqual([]);
  });

  it('should return the missing strings from ArrayB', () => {
    const ArrayA = ['apple', 'banana', 'cherry'];
    const ArrayB = ['cherry', 'banana', 'apple', 'pineapple'];

    const expectedMissingStrings = ['date', 'fig'];

    const result = isMissingCol(ArrayA, ArrayB);

    expect(result).toEqual(expectedMissingStrings);
  });
});
