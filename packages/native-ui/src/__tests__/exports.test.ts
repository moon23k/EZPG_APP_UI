// 메인 엔트리는 optional peer(svg · gesture-handler · reanimated · worklets · sortables)를
// 설치하지 않은 앱에서도 import되어야 한다. 서브패스(charts · sortable)만 의존할 수 있다.
const OPTIONAL_PEERS = [
  'react-native-svg',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-sortables',
];

describe('main entry', () => {
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
});

export {};
