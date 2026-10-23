import { formatPrice } from '@ezpg/native-ui';

/** 420000 → '42만', 12345 → '1.2만', 9000 → '9,000' */
export function formatManwon(value: number): string {
  const abs = Math.abs(value);
  if (abs < 10000) return formatPrice(value, '');
  const man = value / 10000;
  const digits = Math.abs(man) >= 10 ? 0 : 1;
  return `${Number(man.toFixed(digits))}만`;
}

/** 전기 대비 증감률(%). 이전 값이 0이면 null */
export function changeRate(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/** 마감이 임박했을 때만 문구를 돌려준다. 0 → '오늘 마감', 1 → '내일 마감', 2 → '모레 마감', 그 밖 null */
export function formatDeadline(days: number): string | null {
  if (days < 0) return '기한 지남';
  return ['오늘 마감', '내일 마감', '모레 마감'][days] ?? null;
}
