import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SortableList } from '../sortable';
import {
  areaPath,
  labelStep,
  linearScale,
  linePath,
  niceTicks,
} from '../charts/scale';
import { summarize } from '../charts/summary';
import { moveItem } from '../sortable/move';

describe('subpath entries', () => {
  it('load', () => {
    expect(require('../charts').LineChart).toBeDefined();
    expect(require('../sortable').SortableGrid).toBeDefined();
  });
});

describe('niceTicks', () => {
  it.each([
    [0, 420000, [0, 200000, 400000, 600000]],
    [0, 95, [0, 50, 100]],
    [-30, 70, [-50, 0, 50, 100]],
  ])('%p ~ %p', (min, max, expected) => {
    expect(niceTicks(min, max, 4)).toEqual(expected);
  });

  it('covers the data range', () => {
    const ticks = niceTicks(12, 987);
    expect(ticks[0]).toBeLessThanOrEqual(12);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(987);
  });

  it('handles equal, zero and non-finite values', () => {
    expect(niceTicks(0, 0).length).toBeGreaterThan(1);
    expect(niceTicks(5, 5)[0]).toBe(0);
    expect(niceTicks(-5, -5).at(-1)).toBe(0);
    expect(niceTicks(Infinity, -Infinity)).toEqual([0, 1]);
  });
});

describe('scale helpers', () => {
  it('maps linearly and centers a zero-width domain', () => {
    expect(linearScale([0, 10], [0, 100])(5)).toBe(50);
    expect(linearScale([3, 3], [0, 100])(3)).toBe(50);
  });

  it('builds paths', () => {
    const pts = [
      { x: 0, y: 10 },
      { x: 5, y: 0 },
    ];
    expect(linePath(pts)).toBe('M0,10 L5,0');
    expect(areaPath(pts, 20)).toBe('M0,10 L5,0 L5,20 L0,20 Z');
    expect(areaPath([], 20)).toBe('');
  });

  it('thins labels', () => {
    expect(labelStep(30, 5)).toBe(6);
    expect(labelStep(3, 5)).toBe(1);
    expect(labelStep(10, 0)).toBe(10);
  });

  it('summarizes for screen readers', () => {
    expect(summarize([], String)).toBe('데이터 없음');
    expect(summarize([1, 3, 2], String)).toBe(
      '3개 구간, 최고 3, 최저 1, 마지막 2'
    );
  });
});

describe('moveItem', () => {
  it.each([
    [0, 2, ['b', 'c', 'a', 'd']],
    [3, 0, ['d', 'a', 'b', 'c']],
    [1, 1, ['a', 'b', 'c', 'd']],
    [0, 9, ['a', 'b', 'c', 'd']],
  ])('%p → %p', (from, to, expected) => {
    expect(moveItem(['a', 'b', 'c', 'd'], from, to)).toEqual(expected);
  });
});

describe('SortableList accessibility actions', () => {
  it('moves an item down', async () => {
    const onDataChange = jest.fn();
    await render(
      <SortableList
        data={['a', 'b', 'c']}
        keyExtractor={(v) => v}
        itemLabel={(v) => `옵션 ${v}`}
        onDataChange={onDataChange}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    );
    await fireEvent(screen.getByLabelText('옵션 a'), 'accessibilityAction', {
      nativeEvent: { actionName: 'increment' },
    });
    expect(onDataChange).toHaveBeenCalledWith(['b', 'a', 'c'], {
      from: 0,
      to: 1,
    });
  });
});
