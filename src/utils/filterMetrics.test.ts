import { describe, it, expect } from 'vitest';
import filterPropertiesByNumber from './filterMetrics.ts';

describe('filterAndConvertPropertiesToNumbers', () => {
  it('should filter and convert properties to numbers', () => {
    const inputObject = {
      prop1: '123',
      prop2: 'abc',
      prop3: '12.34',
      prop4: '',
      prop5: '56',
    };

    const expectedOutput = {
      prop1: 123,
      prop3: 12.34,
      prop5: 56,
    };

    const result = filterPropertiesByNumber(inputObject);

    // Check if the result matches the expected output
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty object when all values are invalid', () => {
    const inputObject = {
      prop1: 'abc',
      prop2: '',
      prop3: 'hello',
      prop4: ' ',
    };

    const expectedOutput = {};

    const result = filterPropertiesByNumber(inputObject);

    // Check if the result matches the expected output
    expect(result).toEqual(expectedOutput);
  });
});
