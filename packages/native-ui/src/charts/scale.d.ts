export type Point = {
  x: number;
  y: number;
};
/** 보기 좋은 눈금. 값이 하나뿐이거나 모두 같아도 범위를 만든다 */
export declare function niceTicks(
  min: number,
  max: number,
  count?: number
): number[];
/** [d0, d1] → [r0, r1] 선형 변환. 범위 폭이 0이면 가운데로 */
export declare function linearScale(
  domain: [number, number],
  range: [number, number]
): (v: number) => number;
export declare function linePath(points: Point[]): string;
export declare function areaPath(points: Point[], baseline: number): string;
/** 라벨이 겹치지 않게 최대 maxLabels개만 남길 간격 */
export declare function labelStep(count: number, maxLabels: number): number;
