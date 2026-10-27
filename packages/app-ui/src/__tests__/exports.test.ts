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
