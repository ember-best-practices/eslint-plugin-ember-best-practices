const rule = require('../../../lib/rules/no-attrs');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-observers', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
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
          init() {
            this._super(...arguments);
            this.alias = this.attrs.concrete;
          }
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
          actions: {
            someLocalAction() {
              this.attrs.somePassedAction();
            }
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
