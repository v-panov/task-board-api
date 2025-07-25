module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: [
    '**/tests/*.(js)',
  ],
};
