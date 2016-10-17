if (Ember && Ember.Debug) {
  if (typeof Ember.Debug.registerDeprecationHandler === 'function') {
    Ember.Debug.registerDeprecationHandler((message, options, next) => {
      QUnit.ok(false, `DEPRECATION: ${message}`);
      next(message, options);
    });
  }

  if (typeof Ember.Debug.registerWarnHandler === 'function') {
    Ember.Debug.registerWarnHandler((message, options, next) => {
      QUnit.ok(false, `WARNING: ${message}`);
      next(message, options);
    });
  }
}
