module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  roots: [
    '<rootDir>/src'
  ],
  // moduleNameMapper: {
  //   '^simply-animate$': getModule(TEST_ENV)
  // },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
    '!**/__tests__/util/*.+(ts|tsx|js)'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverage: true,
  coverageDirectory: './.coverage',
  verbose: true
}