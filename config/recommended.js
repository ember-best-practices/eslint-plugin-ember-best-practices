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
  rules: {
    // Custom rules
    'ember-best-practices/no-side-effect-cp': 2,
    'ember-best-practices/no-attrs': 2,
    'ember-best-practices/no-observers': 2,
    'ember-best-practices/require-dependent-keys': 2,
    'ember-best-practices/no-lifecycle-events': 2,
    'ember-best-practices/no-attrs-snapshot': 2,
    'ember-best-practices/no-global-jquery': 2,
    'ember-best-practices/no-broken-super-chain': 2
  }
};
