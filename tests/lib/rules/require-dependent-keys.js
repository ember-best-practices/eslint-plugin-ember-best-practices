const rule = require('../../../lib/rules/require-dependent-keys');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
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
    },
    {
      code: `
        export default Ember.Component({
          foo: computed('bar', function() {
            return this.get('bar') * 2;
          })
        });`
    },
    {
      code: `
        export default Ember.Component({
          foo: computed('bar', {
            get() {
              return this.get('bar') * 2;
            }
          })
        });`
    },
    {
      code: `
        export default class extends Ember.Object {
          @computed('bar')
          get foo() {
            return this.get('bar') * 2;
          }
        }`
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
    },
    {
      code: `
        export default Ember.Component({
          foo: computed({
            get() {
              return this.get('bar') * 2;
            }
          })
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
