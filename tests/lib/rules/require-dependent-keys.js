const rule = require('../../../lib/rules/require-dependent-keys');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('require-dependent-keys', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          foo: Ember.computed('bar', function() {
            return this.get('bar') * 2;
          })
        });`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          foo: Ember.computed(function() {
            return this.get('bar') * 2;
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          foo: computed(function() {
            return this.get('bar') * 2;
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
