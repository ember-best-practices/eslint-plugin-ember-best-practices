const rule = require('../../../lib/rules/no-send-action');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-send-action', rule, {
  valid: [
    {
      code: `
        function anotherFunction() {
        }

        export default Ember.Component({
          actions: {
            userInput() {
              anotherFunction();
              this.myAction();
            }
          }
        });`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          actions: {
            userInput() {
              this.sendAction('myAction');
            }
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
