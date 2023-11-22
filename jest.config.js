module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  maxWorkers: '50%',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/jest-setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^@fexd/mobile$': '<rootDir>/packages/mobile/src/index.ts',
  },
}
