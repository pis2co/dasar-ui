import { fieldIconSize } from './icon-size';

describe('fieldIconSize', () => {
  it('scales down for small controls', () => {
    expect(fieldIconSize('xs')).toBe(12);
    expect(fieldIconSize('sm')).toBe(14);
  });

  it('uses the field friendly default for md', () => {
    expect(fieldIconSize('md')).toBe(16);
    expect(fieldIconSize(undefined)).toBe(16);
    expect(fieldIconSize(null)).toBe(16);
  });

  it('scales up for large controls', () => {
    expect(fieldIconSize('lg')).toBe(20);
    expect(fieldIconSize('xl')).toBe(24);
  });

  it('passes a numeric size through', () => {
    expect(fieldIconSize(18)).toBe(18);
  });
});
