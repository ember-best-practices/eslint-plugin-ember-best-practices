const rule = require('../../../lib/rules/no-global-jquery');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

ruleTester.run('no-global-jquery', rule, {
  valid: [
    {
      code: `
        export default Component.extend({
          focusWithJQuery() {
            const find = Ember.$;
            find('.class').focus();
          }
        })`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          valid1() {
            this.v1 = Ember.$('.v1');
          },
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          valid2() {
            this.v2 = this.$();
          },
        });`,
      parserOptions
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
      parserOptions
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
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;

        export default Ember.Component({
          init() {
            this.el = $('.test');
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;

        export default Ember.Component({
          actions: {
            valid() {
              this.inv1 = $('.invalid1');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $: foo } = Ember;

        export default Ember.Component({
          init() {
            this.el = foo('.test');
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $: foo } = Ember;

        export default Ember.Component({
          actions: {
            valid() {
              this.inv1 = foo('.invalid1');
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
          init() {
            this.el = $('.test');
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
          actions: {
            invalid1() {
              this.inv1 = $('.invalid1');
            }
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
          init() {
            this.el = jQuery('.test');
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
          actions: {
            invalid1() {
              this.inv1 = jQuery('.invalid1');
            }
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const jayQuery = $;
        export default Ember.Component({
          badFun() {
            jayQuery('.class');
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const jayQuery = $;
        export default Ember.Component({
          badFun() {
            jayQuery.ajax();
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const jayQuery = jQuery;
        export default Ember.Component({
          badFun() {
            jayQuery('.class');
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const jayQuery = jQuery;
        export default Ember.Component({
          badFun() {
            jayQuery.ajax();
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
          func() {
            let a = jQuery;
            let b = 'notDollarSign';

            a('.find-me').click();
          }
        });`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Component.extend({
          doStuffWithJQuery() {
            let find = jQuery;
            find('.class').focus();
          },

          nonJQueryStuff() {
            let find = document.querySelector;
            find('.class').focus();
          }
        })`,
      parserOptions,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
