import { describe, it, expect } from 'vitest';
import canBeNumber from './canBeNumber';

describe('canBeNumber', () => {
  it('should return true for valid integer strings', () => {
    expect(canBeNumber('123')).toBe(true);
    expect(canBeNumber('-456')).toBe(true);
    expect(canBeNumber('0')).toBe(true);
  });

  it('should return true for valid floating-point strings', () => {
    expect(canBeNumber('123.45')).toBe(true);
    expect(canBeNumber('-456.78')).toBe(true);
  });
});
