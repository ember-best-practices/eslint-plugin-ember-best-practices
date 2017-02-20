const rule = require('../../../lib/rules/no-send-action');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

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
          actions: {
            userInput() {
              this.sendAction('myAction');
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
