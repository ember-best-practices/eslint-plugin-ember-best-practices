const rule = require('../../../lib/rules/no-jquery-methods');
const MESSAGE = rule.meta.message;
const BLACKLISTMETHOD = rule.meta.blacklist[0];
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-jquery-methods', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$('').notBlacklistedMethod();
          },
        });`
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$().notBlacklistedMethod();
          },
        });`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$('')[${BLACKLISTMETHOD}]();
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$('')[${BLACKLISTMETHOD}]();
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
