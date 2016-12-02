const rule = require('../../../lib/rules/require-dependent-keys');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-observers', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          foo: Ember.computed('bar', function() {
            return this.get('bar') * 2;
          })
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
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
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
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
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
