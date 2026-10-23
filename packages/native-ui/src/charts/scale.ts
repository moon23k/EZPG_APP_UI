export type Point = { x: number; y: number };

const STEPS = [1, 2, 2.5, 5, 10];

/** 보기 좋은 눈금. 값이 하나뿐이거나 모두 같아도 범위를 만든다 */
export function niceTicks(min: number, max: number, count = 4): number[] {
  let lo = Math.min(min, max);
  let hi = Math.max(min, max);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return [0, 1];
  if (lo === hi) {
    if (hi === 0) hi = 1;
    else if (hi > 0) lo = 0;
    else hi = 0;
  }
  const raw = (hi - lo) / Math.max(1, count - 1);
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = (STEPS.find((s) => s * magnitude >= raw) ?? 10) * magnitude;
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) {
    ticks.push(Math.round(v / step) * step);
  }
  return ticks;
}

/** [d0, d1] → [r0, r1] 선형 변환. 범위 폭이 0이면 가운데로 */
export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return (v: number) =>
    d1 === d0 ? (r0 + r1) / 2 : r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

export function linePath(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
}

export function areaPath(points: Point[], baseline: number): string {
  if (points.length === 0) return '';
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return `${linePath(points)} L${last.x},${baseline} L${first.x},${baseline} Z`;
}

/** 라벨이 겹치지 않게 최대 maxLabels개만 남길 간격 */
export function labelStep(count: number, maxLabels: number): number {
  return Math.max(1, Math.ceil(count / Math.max(1, maxLabels)));
}
