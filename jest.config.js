module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/lib/'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-(svg|reanimated|worklets|gesture-handler|sortables))/)',
  ],
  moduleNameMapper: {
    '^react-native-sortables$': '<rootDir>/jest/react-native-sortables.js',
    '^@ezpg/native-ui$': '<rootDir>/packages/native-ui/src/index',
    '^@ezpg/native-ui/(charts|sortable)$':
      '<rootDir>/packages/native-ui/src/$1',
  },
};
