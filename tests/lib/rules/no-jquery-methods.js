const rule = require('../../../lib/rules/no-jquery-methods');
const RuleTester = require('eslint').RuleTester;
const getMessage = rule.meta.message;
const BLACKLISTMETHOD = 'add';
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
            Ember.$().notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$().notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const myObj = {};
            myObj[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$.notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$.notBlacklistedMethod();
          }
        });`,
      options: [BLACKLISTMETHOD]
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            $()[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        export default Ember.Component({
          init() {
            jQuery[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        export default Ember.Component({
          init() {
            const _$ = jQuery;
            _$[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            const myJQueryObj = this.$();
            myJQueryObj[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        import jQuery from 'jquery';
        import fOO from 'foo';
        export default Ember.Component({
          init() {
            jQuery[${BLACKLISTMETHOD}]();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(BLACKLISTMETHOD)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.$.add();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(`$.${BLACKLISTMETHOD}()`)
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            Ember.$.add();
          }
        });`,
      options: [BLACKLISTMETHOD],
      errors: [{
        message: getMessage(`$.${BLACKLISTMETHOD}()`)
      }]
    }
  ]
});
