import { changeRate, formatDeadline, formatManwon } from '../internal/format';

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

  it('formats an imminent deadline only', () => {
    expect(formatDeadline(0)).toBe('오늘 마감');
    expect(formatDeadline(1)).toBe('내일 마감');
    expect(formatDeadline(2)).toBe('모레 마감');
    expect(formatDeadline(3)).toBeNull();
    expect(formatDeadline(-1)).toBe('기한 지남');
  });

  it('computes change rate', () => {
    expect(changeRate(110, 100)).toBeCloseTo(10);
    expect(changeRate(5, 0)).toBeNull();
  });
});
