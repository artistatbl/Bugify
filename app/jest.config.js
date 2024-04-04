// jest.config.js
module.exports = {
  // jest.config.js
setupFiles: ['<rootDir>/app/jest.setup.js'],
setupFilesAfterEnv: ['<rootDir>/app/jest.setup.js'],
  preset: 'ts-jest',
  testEnvironmentOptions: {
    url: 'http://localhost',
    name: 'chrome',
    headless: true,
    devtools: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: 500,
    timeout: 10000,
    browser: 'chrome',
    setupFilesAfterEnv: ['<rootDir>/app/jest.setup.js'],
    setupFiles: ['<rootDir>/app/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/app/$1',
      '^@components/(.*)$': '<rootDir>/app/components/$1',
      '^@utils/(.*)$': '<rootDir>/app/utils/$1',
      '^@types/(.*)$': '<rootDir>/app/types/$1',
      '^@pages/(.*)$': '<rootDir>/app/pages/$1',
      '^@styles/(.*)$': '<rootDir>/app/styles/$1',
      '^@prisma/(.*)$': '<rootDir>/prisma/$1',
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
   
   

  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    // Handle module aliases (if you're using them)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
  },
  testMatch: ['<rootDir>/__tests__/**/*.[jt]s?(x)', '<rootDir>/**/?(*.)+(spec|test).[tj]s?(x)'],
};