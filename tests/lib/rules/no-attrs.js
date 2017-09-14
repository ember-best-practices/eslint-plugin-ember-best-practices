const rule = require('../../../lib/rules/no-attrs');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-attrs', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
          }
        });`
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
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
