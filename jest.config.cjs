module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.cjs'],
  testEnvironment: 'jsdom'
};