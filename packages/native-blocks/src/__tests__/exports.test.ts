// 메인 엔트리는 optional peer 없이 import되어야 한다. 차트 · 정렬 블록은 서브패스로만 나간다.
const OPTIONAL_PEERS = [
  'react-native-svg',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-sortables',
];

describe('blocks main entry', () => {
  beforeEach(() => {
    jest.resetModules();
    for (const name of OPTIONAL_PEERS) {
      jest.doMock(
        name,
        () => {
          throw new Error(`${name} must not be imported from the main entry`);
        },
        { virtual: true }
      );
    }
  });

  it('loads without optional peers', () => {
    expect(() => require('../index')).not.toThrow();
  });

  it('exposes subpaths', () => {
    jest.resetModules();
    jest.dontMock('react-native-svg');
    jest.dontMock('react-native-gesture-handler');
    jest.dontMock('react-native-sortables');
    expect(require('../charts').SalesChart).toBeDefined();
    expect(require('../sortable').ImageGrid).toBeDefined();
  });
});

export {};
