module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    'browser': true
  },
  plugins: [
    'ember-best-practices'
  ],
  extends: require.resolve('./recommended.js'),
  rules: {
    // Custom rules
    'ember-best-practices/no-jquery-methods': 2
  }
};
