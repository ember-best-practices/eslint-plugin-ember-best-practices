const rule = require('../../../lib/rules/no-broken-super-chain');
const RuleTester = require('eslint').RuleTester;

const { noSuper, tooManySupers } = rule.meta.messages;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

ruleTester.run('no-broken-super-chain', rule, {
  valid: [
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
          },
          somethingNotInit() {
            this.alias = this.concrete;
          }
        });`
    },
    {
      code: `
        export default Ember.Route.extend({
          init() {
            this._super(...arguments);
            this.get('foo');
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            function foo () {
              return true;
            }
            this._super(...arguments);
            this.alias = this.concrete;
          },
          somethingNotInit() {
            this.alias = this.concrete;
          }
        });`
    },
    {
      code: `
        export default Ember.Service.extend({
          init() {
            this.alias = this.concrete;
          }
        });`
    },
    {
      code: `
        export default Ember.Component.extend({
          didInsertElement() {
            this.updateBlurHandler(true);
          }
        });`
    },
    {
      code: `
        export default MyComponent.extend({
          didInsertElement() {
            this._super(...arguments);
            this.updateBlurHandler(true);
          }
        });`
    },
    {
      code: `
        const foo = Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
          }
        });

        export default foo;`
    }
  ],
  invalid: [
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this.alias = this.concrete;
          }
        });`,
      errors: [{
        message: noSuper
      }]
    },
    {
      code: `
        export default Ember.Route.extend({
          init() {
            this.get('foo');
          }
        });`,
      errors: [{
        message: noSuper
      }]
    },
    // TODO
    // {
    //   code: `
    //     export default Ember.Component.extend({
    //       init() {
    //         this._super(); // missing '...arguments'
    //         this.alias = this.concrete;
    //       }
    //     });`,
    // },
    // TODO
    // {
    //   code: `
    //     export default Ember.Component.extend({
    //       init() {
    //         this.alias = this.concrete;
    //         this._super(...arguments);
    //       }
    //     });`,
    //   errors: [{
    //     message: noThisBeforeSuper
    //   }]
    // },
    {
      code: `
        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.alias = this.concrete;
            this._super(...arguments);
          }
        });`,
      errors: [{
        message: tooManySupers
      }]
    }
    // TODO
    // {
    //   code: `
    //     export default MyComponent.extend({
    //       didInsertElement() {
    //         this.updateBlurHandler(true);
    //       }
    //     });`,
    //   errors: [{
    //     message: noSuper
    //   }]
    // }
  ]
});