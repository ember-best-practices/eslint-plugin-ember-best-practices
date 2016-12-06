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
    // Expiremental rules
    'ember-best-practices/no-2.0.0-hooks': 2
  }
};
