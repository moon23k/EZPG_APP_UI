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
    '^@ezpg/app-ui$': '<rootDir>/packages/app-ui/src/index',
    '^@ezpg/app-ui/(charts|sortable)$': '<rootDir>/packages/app-ui/src/$1',
  },
};
