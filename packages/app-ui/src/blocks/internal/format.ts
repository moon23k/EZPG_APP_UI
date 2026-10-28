import { formatPrice } from '../../components/price/price';

export function formatManwon(value: number): string {
  const abs = Math.abs(value);
  if (abs < 10000) return formatPrice(value, '');
  const man = value / 10000;
  const digits = Math.abs(man) >= 10 ? 0 : 1;
  return `${Number(man.toFixed(digits))}만`;
}

export function changeRate(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function deadlineTone(days: number): 'danger' | 'warning' | 'muted' {
  if (days < 0) return 'danger';
  return days === 0 ? 'warning' : 'muted';
}

export function formatDeadline(days: number): string | null {
  if (days < 0) return '기한 지남';
  return ['오늘 마감', '내일 마감', '모레 마감'][days] ?? null;
}
