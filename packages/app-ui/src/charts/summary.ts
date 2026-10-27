export function summarize(
  values: number[],
  format: (v: number) => string
): string {
  if (values.length === 0) return '데이터 없음';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const last = values[values.length - 1]!;
  return `${values.length}개 구간, 최고 ${format(max)}, 최저 ${format(min)}, 마지막 ${format(last)}`;
}
