import { changeRate, formatDday, formatManwon } from '../internal/format';

describe('format', () => {
  it.each([
    [0, '0'],
    [9000, '9,000'],
    [12345, '1.2만'],
    [420000, '42만'],
    [-35000, '-3.5만'],
  ])('formatManwon(%p) → %s', (v, expected) => {
    expect(formatManwon(v)).toBe(expected);
  });

  it('formats D-day', () => {
    expect(formatDday(3)).toBe('D-3');
    expect(formatDday(0)).toBe('D-day');
    expect(formatDday(-2)).toBe('D+2');
  });

  it('computes change rate', () => {
    expect(changeRate(110, 100)).toBeCloseTo(10);
    expect(changeRate(5, 0)).toBeNull();
  });
});
