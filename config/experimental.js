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
    // Experimental rules
    'ember-best-practices/no-2.0.0-hooks': 2,
    'ember-best-practices/no-send-action': 2,
    'ember-best-practices/no-send': 2
  }
};
