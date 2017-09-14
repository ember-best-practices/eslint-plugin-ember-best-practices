const rule = require('../../../lib/rules/no-global-jquery');
const MESSAGE = rule.meta.message;
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-global-jquery', rule, {
  valid: [
    {
      code: `
        export default Component.extend({
          focusWithJQuery() {
            const $ = Ember.$;
            $('.class').focus();
          }
        })`
    },
    {
      code: `
        export default Component.extend({
          focusWithJQuery() {
            const Jquery = Ember.$;
            Jquery('.class').focus();
          }
        })`
    },
    {
      code: `
        export default Component.extend({
          focusWithJQuery() {
            const find = Ember.$;
            find('.class').focus();
          }
        })`
    },
    {
      code: `
        const $ = Ember.$;
        export default Component.extend({
          focusWithJQuery() {
            $('.class').focus();
          }
        })`
    },
    {
      code: `
        const jQuery = Ember.$;
        export default Component.extend({
          focusWithJQuery() {
            jQuery('.class').focus();
          }
        })`
    },
    {
      code: `
        export default Ember.Component({
          valid1() {
            this.v1 = Ember.$('.v1');
          },
        });`
    },
    {
      code: `
        export default Ember.Component({
          valid2() {
            this.v2 = this.$();
          },
        });`
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid3() {
              this.v3 = Ember.$('v3');
            }
          }
        });`
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid4() {
              this.v4 = this.$('v4');
            }
          }
        });`
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid4() {
              const elem = this.$();
            }
          }
        });`
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid4() {
              const classElem = this.$('.class');
            }
          }
        });`
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;

        export default Ember.Component({
          init() {
            this.el = $('.test');
          }
        });`
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
        });`
    },
    {
      code: `
        import Ember from 'ember';

        const { $: foo } = Ember;

        export default Ember.Component({
          init() {
            this.el = foo('.test');
          }
        });`
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
        });`
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
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Component.extend({
          nonJQueryStuff() {
            let find = document.querySelector;
            find('.class').focus();

          },

          doStuffWithJQuery() {
            let find = jQuery;
            find('.class').focus();
          }
        })`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        let find = Ember.$;
        export default Component.extend({
          nonJQueryStuff() {
            let find = document.querySelector;
            find('.class').focus();

          },

          doStuffWithJQuery() {
            let find = jQuery;
            find('.class').focus();
          }
        })`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        let find = $;
        export default Component.extend({
          nonJQueryStuff() {
            let find = document.querySelector;
            find('.class').focus();

          },

          doStuffWithJQuery() {
            find('.class').focus();
          }
        })`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const $ = jQuery;
        export default Component.extend({
          focusWithJQuery() {
            let $ = Ember.$;
            $('.class').focus();
          }
        })`,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        const $ = Ember.$;
        export default Component.extend({
          focusWithJQuery() {
            let $ = $;
            $('.class').focus();
          }
        })`,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});
