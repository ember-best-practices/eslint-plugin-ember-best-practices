const rule = require('../../../lib/rules/no-send');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-send', rule, {
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
              someObj.send();
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
              this.send('myAction');
            }
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
            userInput() {
              this.send.apply(this, ['myAction']);
            }
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
            userInput() {
              this.send.call(this, 'myAction');
            }
          }
        });`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
