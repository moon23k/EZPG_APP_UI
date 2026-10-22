module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/lib/'],
  moduleNameMapper: {
    '^@ezpg/native-ui$': '<rootDir>/packages/native-ui/src/index',
    '^@ezpg/native-ui/(charts|sortable)$':
      '<rootDir>/packages/native-ui/src/$1',
    '^@ezpg/native-blocks$': '<rootDir>/packages/native-blocks/src/index',
  },
};
