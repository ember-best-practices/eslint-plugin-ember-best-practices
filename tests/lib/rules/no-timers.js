const rule = require('../../../lib/rules/no-timers');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

ruleTester.run('no-timers', rule, {
  valid: [
    {
      code: `
        export default Ember.Component.extend({
          actions: {
            foo() {
              setTimeout(() => {});
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component.extend({
          guarded() {
            if (environment.isBrowser()) {
              setTimeout(() => {});
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component.extend({
          guarded() {
            if (environment.isBrowser()) {
              setInterval(() => {});
            }
          }
        });`,
      parserOptions
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          bar() {
            setTimeout(() => {});
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          baz() {
            setInterval(() => {});
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          bar() {
            window.setTimeout(() => {});
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          baz() {
            window.setInterval(() => {});
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
