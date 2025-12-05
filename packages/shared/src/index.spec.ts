import { describe, it, expect } from 'vitest';
import { VERSION } from './index'; // Assuming you exported this earlier

describe('Shared Package', () => {
  it('should have a version', () => {
    expect(VERSION).toBeDefined();
  });
});
