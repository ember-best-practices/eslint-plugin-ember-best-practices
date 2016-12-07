const rule = require('../../../../lib/rules/linkedin/no-unguarded-document');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-timers', rule, {
  valid: [
    {
      code: `
        export default Ember.Component.extend({
          actions: {
            foo() {
              if (environment.isBrowser()) {
                const node = document.querySelector('blah');
              }
            }
          }
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        export default Ember.Component.extend({
          guarded() {
            if (environment.isBrowser()) {
                const node = document.querySelector('blah');
              }
          }
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
          baz() {
            const node = document.querySelector('blah');
          }
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
