const rule = require('../../../lib/rules/no-global-jquery');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('no-global-jquery', rule, {
  valid: [
    {
      code: `
        export default Ember.Component({
          valid1() {
            this.v1 = Ember.$('.v1');
          },
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        export default Ember.Component({
          valid2() {
            this.v2 = this.$();
          },
        });`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid3() {
              this.v3 = Ember.$('v3');
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
        export default Ember.Component({
          actions: {
            valid4() {
              this.v4 = this.$('v4');
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
          init() {
            this.el = $('.test');
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
            invalid1() {
              this.inv1 = $('.invalid1');
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
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.el = jQuery('.test');
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
            invalid1() {
              this.inv1 = jQuery('.invalid1');
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
